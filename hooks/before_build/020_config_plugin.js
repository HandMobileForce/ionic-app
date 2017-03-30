#!/usr/bin/env node

//考虑到android在prepare中会添加到AndroidManifest.xml中，所以把JPUSH_APPKEY配置信息干掉

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

//正则表达式替换指定内容的配置信息
function replace_string_in_file(filename, to_replace, replace_with) {
  var data = fs.readFileSync(filename, 'utf8');

  var result = data.replace(data.match(to_replace)[0], replace_with);
  fs.writeFileSync(filename, result, 'utf8');
}

if (rootdir) {
  //遍历每个准备好的平台目录
  var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

  for (var x = 0; x < platforms.length; x += 1) {
    try {
      var platform = platforms[x].trim().toLowerCase();

      if (platform === 'android') {
        //替换AndroidManifest.xml文件内容，删除JPUSH_APPKEY
        var fullfilename = path.join(rootdir, 'platforms/android/AndroidManifest.xml');
        replace_string_in_file(fullfilename, '<meta-data\.\*android:name="JPUSH_APPKEY"\.\*\/>', '');
      }
    } catch (e) {
      process.stdout.write(e);
    }
  }
}
