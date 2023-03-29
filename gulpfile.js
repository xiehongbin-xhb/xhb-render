var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var watchify = require("watchify");
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var Transform = require('stream').Transform;
var rs = require('replacestream');
var istextorbinary = require('istextorbinary');


var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/index.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

const date = new Date();

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('mini3d.js'))
        .on('error', function (err) {
            console.error(err.message);
        })
        .on('error', log.error)
        .pipe(gulp.dest("dist"));
}


gulp.task("default", bundle);

gulp.task('min', function () {
    return browserify({

        basedir: '.',

        entries: ['src/index.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .on('error', function (err) {
            console.error(err.message);
        })
        .pipe(source('mini3d.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("dist/"))
});

watchedBrowserify.on("update", function (url) {
    console.log((new Date()).toTimeString() + ' updated: ' + url[0]);
    bundle();
});
watchedBrowserify.on("log", gutil.log);


const defaultOptions = {
    skipBinary: true
}

const replace = function (search, _replacement, options = {}) {

    options = {
        ...defaultOptions,
        ...options
    }

    return new Transform({
        objectMode: true,
        transform(file, enc, callback) {
            if (file.isNull()) {
                return callback(null, file);
            }

            let replacement = _replacement;
            if (typeof _replacement === 'function') {

                replacement = _replacement.bind({ file: file });
            }

            function doReplace() {
                if (file.isStream()) {
                    file.contents = file.contents.pipe(rs(search, replacement));
                    return callback(null, file);
                }

                if (file.isBuffer()) {
                    if (search instanceof RegExp) {
                        file.contents = Buffer.from(String(file.contents).replace(search, replacement));
                    } else {
                        const chunks = String(file.contents).split(search);

                        let result;
                        if (typeof replacement === 'function') {

                            result = [chunks[0]];


                            for (let i = 1; i < chunks.length; i++) {

                                result.push(replacement(search));


                                result.push(chunks[i]);
                            }

                            result = result.join('');
                        } else {
                            result = chunks.join(replacement);
                        }

                        file.contents = Buffer.from(result);
                    }
                    return callback(null, file);
                }

                callback(null, file);
            }

            if (options.skipBinary) {
                if (!istextorbinary.isText(file.path, file.contents)) {
                    callback(null, file);
                } else {
                    doReplace();
                }
                return;
            }

            doReplace();
        }
    });
};

function formatDate(date, formatStr) {
    let str = formatStr;
    let Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, date.getFullYear().toString());
    str = str.replace(/yy|YY/, (date.getFullYear() % 100) > 9 ? (date.getFullYear() % 100).toString() : '0' + (date.getFullYear() % 100));
    let month = date.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month.toString());

    str = str.replace(/[wW]/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/[dD]/g, date.getDate().toString());

    let hour = date.getHours();
    str = str.replace(/HH/, hour > 9 ? hour.toString() : '0' + hour);
    str = str.replace(/H/g, hour.toString());

    str = str.replace(/A/g, hour >= 12 ? 'PM' : 'AM');
    str = str.replace(/Aa/g, hour >= 12 ? 'pm' : 'am');

    hour = hour > 12 ? hour % 12 : hour;
    str = str.replace(/hh/, hour > 9 ? hour.toString() : '0' + hour);
    str = str.replace(/h/g, hour.toString());

    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes().toString());
    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/[sS]/g, date.getSeconds().toString());

    return str;
}