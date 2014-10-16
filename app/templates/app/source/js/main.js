require.config({
    baseUrl: "js/",
    urlArgs: "bust=" +new Date(),
    paths: {
        //bower libs
        'jsb': '../../../bower_components/jsb/jsb',
        'jquery': '../../../bower_components/jquery/dist/jquery'<% if(config.get('features').indexOf('backbone') >= 0){ %>,
        'underscore': '../../../bower_components/underscore/underscore',
        'Backbone': '../../../bower_components/backbone/backbone'<% } %><% if(config.get('features').indexOf('foundation') >= 0){ %>,
        'Foundation': '../../../bower_components/foundation/js/foundation'<% } %>
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jsb': {
            exports: 'jsb',
            deps: ['jquery', 'underscore']
        }<% if(config.get('features').indexOf('backbone') >= 0){ %>,
        'Backbone': {
            deps: ['underscore', 'jquery']
        }<% } %><% if(config.get('features').indexOf('foundation') >= 0){ %>,
        'Foundation': {
            deps: ['jquery']
        }<% } %>
    }
});

require(['jquery'
    <% if(config.get('features').indexOf('backbone') >= 0){ %>, 'Backbone'<% } %>
    <% if(config.get('features').indexOf('foundation') >= 0){ %>, 'Foundation' <% } %>
    ], function($
        <% if(config.get('features').indexOf('backbone') >= 0){ %>, Backbone <% } %>
        <% if(config.get('features').indexOf('foundation') >= 0){ %>, Foundation <% } %>
    ){
    console.log('Hello, Welcome.');<% if(config.get('features').indexOf('foundation') >= 0){ %>
    $(document).foundation();
    <% } %>
});
