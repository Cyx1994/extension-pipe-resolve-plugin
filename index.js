"use strict";
const fs = require('fs');
const getPaths = require('enhanced-resolve/lib/getPaths')

module.exports = class ExtensionPipeResolvePlugin {
    constructor(extension, includes) {
        this.extension = extension;
        this.includes = includes || ['ts', 'js', 'jsx', 'tsx', 'json'];
    }
    apply(resolver) {
        if (this.extension) {
            const target = resolver.ensureHook('existing-file');
            const extension = this.extension;
            const includes = this.includes;
            // 在判断file是否存在之前
            resolver.getHook('after-file').tapAsync("ExtensionPipeResolvePlugin", (request, resolveContext, callback) => {
                const fileExt = request.path.replace(/.+\./, '');
                // includes 可自定义，即适配扩展的类型范围
                if (request.path.indexOf('node_modules') > -1 || !includes.includes(fileExt)) {
                    return callback();
                }
                const fileName = `${request.path.replace(/(.*\/)*([^.]+).*/ig, "$2")}.${extension}.${fileExt}`;
                const getDirectory = (path) => path.substring(0, path.lastIndexOf("/") + 1)
                const path = resolver.join(getDirectory(request.path), fileName);

                // 预检查
                fs.stat(path, (err, stat) => {
                    if (err || !stat || !stat.isFile()) {
                        // 如果没有扩展,按原流程进行,错误由原流程处理 
                        return callback();
                    }
                    const res = Object.assign({}, request, {
                        path,
                        relativePath: request.relativePath && resolver.join(getDirectory(request.relativePath), fileName),
                    })
                    resolver.doResolve(target, res, 'extension-pipe file: ' + path, resolveContext, callback)
                });
            })
        }
    }
};