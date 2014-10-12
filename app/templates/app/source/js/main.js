require.config({
    baseUrl: "js/",
    urlArgs: "bust=" +new Date(),
    paths: {
        //bower libs
        'jsb': '../../../bower_components/jsb/jsb',
        'jquery': '../../../bower_components/jquery/dist/jquery'<% if(includeBackbone){ %>,
        'underscore': '../../../bower_components/underscore/underscore',
        'Backbone': '../../../bower_components/backbone/backbone'<% } %><% if(includeFoundation){ %>,
        'Foundation': '../../../bower_components/foundation/js/foundation'<% } %>
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jsb': {
            exports: 'jsb',
            deps: ['jquery', 'underscore']
        }<% if(includeBackbone){ %>,
        'Backbone': {
            deps: ['underscore', 'jquery']
        }<% } %><% if(includeFoundation){ %>,
        'Foundation': {
            deps: ['jquery']
        }<% } %>
    }
});

require(['jquery', 'Backbone'<% if(includeFoundation){ %>, 'Foundation' <% } %>], function($, Backbone<% if(includeFoundation){ %>, Foundation <% } %>){
    console.log('Hello, Welcome.');
    $(document).foundation();
});
