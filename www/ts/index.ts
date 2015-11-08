/// <reference path="./typings/systemjs/systemjs.d.ts"/>

// Sets the reference paths
System.config({
    packages: {'js': {defaultExtension: 'js'}},
    transpiler: 'traceur',
    traceurOptions: {
        annotations: true,
        types: true,
        memberVariables: true
    },
    paths: {
        'app': './js/app.js',
        'main': './js/main.js'
    }
});

// Loads ./js/app.js
// System calls inititalize when import has completed loading.
System.import('js/app-bootstrap');
System.import('js/router');
System.import('js/main').then(() => jahland.BabyMeal.Application.cleanup());
System.import('js/app').then(() => jahland.BabyMeal.Application.initialize());