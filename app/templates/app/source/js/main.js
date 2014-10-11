require.config({
    baseUrl: "js/",
    urlArgs: "cb={{now "%s"}}",
    paths: {
        //bower libs
        'jsb': '../../../bower_components/jsb/jsb',
        'jquery': '../../../bower_components/jquery/dist/jquery',
<% if(includeBackbone){ %>
        'underscore': '../../../bower_components/underscore/underscore',
        'Backbone': '../../../bower_components/backbone/backbone'
<% } %>
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jsb': {
            exports: 'jsb',
            deps: ['jquery', 'underscore']
        },
<% if(includeBackbone){ %>
        'Backbone': {
            deps: ['underscore', 'jquery']
        }
<% } %>
    }
});

require(['Backbone'], function(Backbone){
    console.log('Hello, Welcome.')
});
