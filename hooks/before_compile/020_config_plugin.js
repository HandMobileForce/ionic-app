#!/usr/bin/env node

//在平台编译之前加上参数

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

//正则表达式替换指定内容的配置信息
function replace_string_in_file(filename, to_replace, replace_with) {
  var data = fs.readFileSync(filename, 'utf8');

  var result = data.replace(data.match(to_replace)[0], replace_with);
  fs.writeFileSync(filename, result, 'utf8');
}

//获取应用名（因为在ios平台中plist配置文件在应用名文件夹目录下）
function get_data_in_configxmlfile(filename, to_replace) {
  var data = fs.readFileSync(filename, 'utf8');

  return data.match(to_replace)[1];
}

//替代ios中的plist文件内的配置信息
function replace_data_in_plistfile(filename, to_replace, replace_with) {
  var configPlist = fs.readFileSync(filename, 'utf8');

  var result = configPlist.replace(to_replace, replace_with);
  fs.writeFileSync(filename, result, 'utf8');
}

if (rootdir) {
  //遍历每个准备好的平台目录
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);
  var ourConfigFile = path.join(rootdir, "config/config.json");
  if (fs.existsSync(ourConfigFile)) {
    var configObj = JSON.parse(fs.readFileSync(ourConfigFile, 'utf8'));
  } else {
    console.log("config/config.json not exist!!!");
    return;
  }

  for (var x = 0; x < platforms.length; x += 1) {
    try {
      var platform = platforms[x].trim().toLowerCase();

      if (platform === 'android') {
        var fullfilename = path.join(rootdir, 'platforms/android/AndroidManifest.xml');
        replace_string_in_file(fullfilename, 'android:name="JPUSH_APPKEY"\.\*\/>',
          'android:name="JPUSH_APPKEY" android:value="' + configObj["baseConfig"]["JPUSH_APP_KEY"] + '" />');
      } else {
        //添加config.xml，读取文件内的应用名
        var ourIosConfigFile = path.join(rootdir, "config.xml");
        //获取应用名
        var appName = get_data_in_configxmlfile(ourIosConfigFile, "<name>(\.\*)<\/name>");
        //修改JPUSH插件配置信息
        var pushConfigFile = 'platforms/ios/' + appName + '/Resources/PushConfig.plist';
        if (fs.existsSync(pushConfigFile)) {
          replace_data_in_plistfile(pushConfigFile, /<key>Appkey<\/key>\s*<string>\s*\S*<\/string>/gi, '<key>Appkey</key>\n\t<string>' + configObj["baseConfig"]["JPUSH_APP_KEY"] + '<\/string>');
        }
      }
    } catch (e) {
      process.stdout.write(e);
    }
  }
}
