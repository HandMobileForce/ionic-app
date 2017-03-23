/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
//Include Plugins
var del = require('del');
var jshint = require('gulp-jshint');
var useref = require('gulp-useref');
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nano = require('gulp-cssnano');
var runSequence = require('gulp-run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var notify = require('gulp-notify');//提示信息
var gulpNgConfig = require('gulp-ng-config');//提示信息
var tinylr = require('tiny-lr');
var fs = require('fs');
var path = require('path');
var server = tinylr();
var port = 8000;

var jsFilePath = [
  'src/scripts/*.js',
  'src/scripts/*/*.js',
  'src/app.js',
  'src/pages/**/*.js',
  'src/pages/**/**/*.js',
  'src/pages/**/**/**/*.js'];

var cssFilePath = [
  'src/theme/src.core.scss',
  'src/pages/**/*.scss',
  'src/pages/**/**/*.scss',
  'src/pages/**/**/**/*.scss'];

var htmlFilePath = [
  'src/pages/**/*.html',
  'src/pages/**/**/*.html',
  'src/pages/**/**/**/*.html',
  'src/pages/**/**/**/**/*.html'];

var libDevFilePath = [
  'src/lib/**/*.*',
  'src/lib/**/**/*.*',
  'src/lib/**/**/**/*.*'];

var libDevCommonFilePath = [
  'src/common/**/*.*',
  'src/common/**/**/*.*',
  'src/common/**/**/**/*.*'
];

var libPublishFilePath = [
  'src/lib/**/css/ionic.min.css',
  'src/lib/**/fonts/*.*',
  'src/lib/**/js/ionic.bundle.js',
  'src/lib/**/rollups/md5.js',
  'src/lib/**/dist/jquery.min.js',
  'src/lib/**/dist/ng-cordova.js',
  'src/lib/**/angular-translate.js',
  'src/lib/**/angular-translate-loader-static-files.js',
  'src/lib/**/dist/ionic-datepicker.bundle.min.js',
  'src/lib/**/dist/pouchdb.min.js'
];

var imgFilePath = [
  'src/assets/img/**/*.png',
  'src/assets/img/**/**/*.*',
  'src/assets/img/**/**/**/*.png',
  'src/assets/img/*.gif'];

var configDEVPath = [
  'publish/TEST/config.xml'];

var configPRODPath = [
  'publish/PROD/config.xml'];

var configiOSAppStorePath = [
  'publish/IOSAPPSTORE/config.xml'
]

var pluginDEVPath = [
  'publish/TEST/plugins/*.*',
  'publish/TEST/plugins/**/*.*',
  'publish/TEST/plugins/**/**/*.*',
  'publish/TEST/plugins/**/**/**/*.*',
  'publish/TEST/plugins/**/**/**/**/*.*',
  'publish/TEST/plugins/**/**/**/**/**/*.*'];
var pluginPRODPath = [
  'publish/PROD/plugins/*.*',
  'publish/PROD/plugins/**/*.*',
  'publish/PROD/plugins/**/**/*.*',
  'publish/PROD/plugins/**/**/**/*.*',
  'publish/PROD/plugins/**/**/**/**/*.*',
  'publish/PROD/plugins/**/**/**/**/**/*.*'];

//清除自动生成的目录文件
gulp.task('clean', function () {
  return gulp.src(['www/build/*', 'src/scripts/baseConfig.js', 'config.xml'
    /*,'plugins/com.handmobile.cordovaplugin.hotpatch/*', 'plugins/hand-im-plugin-device/*'*/]).pipe(clean());
});

gulp.task('clean-code', function () {
  return gulp.src(['www/build/css/*', 'www/build/img/*', 'www/build/pages/*', 'www/build/src.bundle.js']).pipe(clean());
});

gulp.task('clean-bundle-js', function () {
  return gulp.src(['www/build/src.bundle.js']).pipe(clean());
});


//动态配置android 即时通讯的
gulp.task('clean-android-im-config', function () {
  return gulp.src(['plugins/hand-im-plugin-device/plugin.xml']).pipe(clean());
});

gulp.task('copy-prod-android-im-config', function () {
  return gulp.src('publish/PROD/hand-im-plugin-device/plugin.xml')
    .pipe(gulp.dest('plugins/hand-im-plugin-device'));
});

gulp.task('config-prod-android-im-config', function (callback) {
  runSequence('clean-android-im-config', 'copy-prod-android-im-config', callback);
});


//语法检查
gulp.task('lint', function () {
  return gulp.src(jsFilePath)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//复制页面到运行目录
gulp.task('pagesHtml', function () {
  return gulp.src(htmlFilePath)
    .pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/pages'));
});

//
gulp.task('rootHtml', function () {
  return gulp.src('src/*.html')
    .pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www'));
});

//新建复制页面任务
gulp.task('html', [/*'rootHtml',*/ 'pagesHtml']);

//复制开发环境的依赖库文件
gulp.task('copy-dev-libs', function () {
  return gulp.src(libDevFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

//复制发布环境的依赖库文件
gulp.task('copy-publish-libs', function () {
  return gulp.src(libPublishFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/lib'));
});

//复制图片文件
gulp.task('copy-img', function () {
  return gulp.src(imgFilePath)
    .pipe(gulp.dest('www/build/assets/img'));
});

//复制开发环境 config.xml
gulp.task('copy-dev-config', function () {
  //return gulp.src(configDEVPath).pipe(gulp.dest(''));
});

//复制发布环境 config.xml
gulp.task('copy-prod-config', function () {
  return gulp.src(configPRODPath)
    .pipe(gulp.dest(''));
});

//复制发布环境 config.xml
gulp.task('copy-ios-appStore-config', function () {
  return gulp.src(configiOSAppStorePath)
    .pipe(gulp.dest(''));
});

/*
 gulp.task('copy-dev-plugin', function () {
 return gulp.src(pluginDEVPath)
 .pipe(gulp.dest('plugins'));
 });
 gulp.task('copy-prod-plugin', function () {
 return gulp.src(pluginPRODPath)
 .pipe(gulp.dest('plugins'));
 });
 */


gulp.task('copy-common-js-libs', function () {
  return gulp.src(libDevCommonFilePath)
    //.pipe(useref({noAssets: true}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/common'));
});

//定义开发环境的依赖库文件任务
gulp.task('copy-dev-lib', function (callback) {
  runSequence('copy-dev-libs', 'copy-img', 'copy-common-js-libs', callback);
});

//定义发布环境的依赖库文件任务
gulp.task('copy-publish-lib', function (callback) {
  runSequence('copy-publish-libs', 'copy-img', 'copy-common-js-libs', callback);
});

//合并压缩css文件
gulp.task('sass', function () {
  return gulp.src(['src/theme/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('www/build/css'));
});


//生成开发环境环境配置文件
gulp.task('config-dev', function () {
  gulp.src('src/config/devConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('src/scripts'))
});

//生成发布环境环境配置文件
gulp.task('config-prod', function () {
  gulp.src('src/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('src/scripts'))
});

//生成iOS商店发布环境环境配置文件
gulp.task('config-ios-appStore-prod', function () {
  gulp.src('src/config/iOSAppStoreConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('src/scripts'))
});

//生成iOS发布环境环境配置文件
gulp.task('config-prod', function () {
  gulp.src('src/config/prodConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe(rename("baseConfig.js"))
    .pipe(gulp.dest('src/scripts'))
});

//复制开发环境 config.xml
gulp.task('copy-iosAppStore-config', function () {
  //return gulp.src(configIosAppStorePath).pipe(gulp.dest(''));
});

//压缩css
gulp.task('css', function () {
  return gulp.src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('www/css'))  // write source file for debug
    .pipe(nano({reduceIdents: false}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '.'}))
    .pipe(gulp.dest('www/css'));
});

//合并压缩丑化Js
gulp.task('scripts', function () {
  return gulp.src(jsFilePath)
    .pipe(concat('app.bundle.js'))
    .pipe(gulp.dest('www/build')) // write source file for debug
    .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(uglify())    //压缩
    .pipe(gulp.dest('www/build'));  //输出
});

//
gulp.task('copy-prod', function () {
  return gulp.src([
      'src/**/*',
      '!src/index.html',
      '!src/**/*.ts',
      '!src/**/*.less',
      '!src/**/*.sass',
      '!src/**/*.styl',
      '!src/css/*',
      '!src/**/*.md',
      '!src/scripts/*'])
    .pipe(gulp.dest('www'));
});

// 创建多层目录
function mkdirs(dirname, mode, callback) {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback();
    } else {
      //console.log(path.dirname(dirname));
      mkdirs(path.dirname(dirname), mode, function () {
        fs.mkdir(dirname, mode, callback);
      });
    }
  });
}

//拷贝文件
function copyfile(oldPath, newPath) {
  //console.log('复制' + oldPath + ' -> ' + newPath);

  var stat = fs.lstatSync(oldPath);
  if (stat.isDirectory()) {
    console.log(oldPath + '是目录');
    return false;
  }

  var readStream = fs.createReadStream(oldPath);
  var writeStream = fs.createWriteStream(newPath);
  readStream.pipe(writeStream);
  readStream.on('end', function () {
    console.log('copy end');
  });
  readStream.on('error', function () {
    console.log('copy error');
  });
}


function copyPages(e) {
  var oldPath = e.path;
  var newPath = oldPath.replace('/src/', '/www/build/');
  var newDirPathTemp = newPath.split("/");
  var currentPath = fs.realpathSync('.');
  var newDirPath = [];
  for (var i = 0; i < newDirPathTemp.length - 1; i++) {
    newDirPath[i] = newDirPathTemp[i];
  }
  newDirPath = newDirPath.join("/");
  newDirPath = newDirPath.replace(currentPath, '');
  newDirPath = newDirPath.replace(/\\/g, "/");
  newDirPath = newDirPath.replace("/", "./");

  // 修改或增加时
  if ('added' == e.type || 'changed' == e.type || 'renamed' == e.type) {
    // 判断目录是否存在，不存在则创建
    fs.exists(newDirPath, function (exists) {
      if (exists) {
        console.log("文件夹存在");
        copyfile(oldPath, newPath);
      } else {
        console.log("文件夹不存在，则创建目录");
        mkdirs(newDirPath);
        //延时，等待目录创建完成
        setTimeout(function () {
          copyfile(oldPath, newPath);
        }, 200);
      }
    });
  } else if ('deleted' == e.type) { //删除
    fs.unlink(newPath, function (err) {
      console.log('删除 newPath ' + newPath + err);
    });
  }
}

// 监听任务 运行语句 gulp watch
gulp.task('watch', function () {
  server.listen(port, function (err) {
    if (err) {
      return console.log(err);
    }

    //拷贝修改过的文件
    gulp.watch(htmlFilePath, function (e) {
      console.log('有变动的文件为 oldPath ' + e.path);
      copyPages(e);
    });

    gulp.watch('src/img/**/**/**/**', function (e) {
      console.log('有变动的文件为 oldPath ' + e.path);
      copyPages(e);
    });

    // 监听sass
    gulp.watch(cssFilePath, function (e) {
      console.log('有变动的文件为 oldPath ' + e.path);
      gulp.run('sass');
    });

    // 监听js
    gulp.watch(jsFilePath, function (e) {
      console.log('有变动的文件为 oldPath ' + e.path);
      gulp.run('scripts');
    });
  });

});

//手动更新www/build代码
gulp.task('rebuild', function (callback) {
  runSequence('clean-code', ['copy-img', 'sass', 'scripts', 'html'], callback);
});

//生成开发环境代码目录
gulp.task('run-dev', function (callback) {
  runSequence('clean', 'config-dev', /*'lint',*/ 'copy-dev-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

//生成发布环境代码目录
gulp.task('run-prod', function (callback) {
  runSequence('clean', 'config-prod', /*'lint',*/ 'copy-prod-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});

//生成发布环境代码目录
gulp.task('run-ios-prod', function (callback) {
  runSequence('clean', 'config-ios-appStore-prod', /*'lint',*/ 'copy-ios-appStore-config', 'copy-publish-lib', ['sass', 'scripts', 'html'], callback);
});


//默认任务
gulp.task('default', ['run-dev']);
