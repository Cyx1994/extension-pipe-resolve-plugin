"use strict";

const ResolverFactory = require("enhanced-resolve").ResolverFactory;
const ExtensionPipeResolvePlugin = require("./index");
const path = require("path");

describe("Simple matches", () => {
    it("fixtures/demo should match to fixtures/demo.pdd.js", resolveAndCheck(
        "./fixtures/demo",
        "./fixtures/demo.pdd.js",
        'pdd',
    ));

    it("fixtures/demo.js should match to fixtures/demo.pdd.js", resolveAndCheck(
        "./fixtures/demo.js",
        "./fixtures/demo.pdd.js",
        'pdd',
    ));
    it("fixtures/demo2 should match to fixtures/demo.pdd.ts", resolveAndCheck(
        "./fixtures/demo2",
        "./fixtures/demo2.pdd.ts",
        'pdd',
    ));
    it("fixtures/demo2.ts should match to fixtures/demo.pdd.ts", resolveAndCheck(
        "./fixtures/demo2.ts",
        "./fixtures/demo2.pdd.ts",
        'pdd',
    ));
    
});


function resolveAndCheck(pathToResolve, expectedPath, platform, includes) {
    return (done) => {
        const resolver = ResolverFactory.createResolver({
            fileSystem: require("fs"),
            extensions: ['.js','.ts'],
            plugins: [new ExtensionPipeResolvePlugin(platform, includes)]
        });
        resolver.resolve({}, __dirname, pathToResolve, {}, (err, result) => {
            if (err) { return done(err); }
            expect(result).toEqual(path.resolve(__dirname, expectedPath));
            done();
        });
    }
}