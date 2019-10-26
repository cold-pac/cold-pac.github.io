(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var proxify = require('proxify-url');


var myUrl = proxify('https://www.goodreads.com/search.xml?key=pka4aF6uHmWLzzmIlTPdw&q=Ender%27s+Game', {inputFormat: 'xml'});
console.log(myUrl);

$(document).ready(function() {
    $.ajax(myUrl, {
        type: "GET",
        url: myUrl,
        success: function (data) {
            console.log(data);
        },
        error: function (errorMessage) {
            alert("failed");
            alert(errorMessage);
        }
    });
});
},{"proxify-url":2}],2:[function(require,module,exports){
/**
 * //////////////////////////////////////
 * //////// Proxify URL module  /////////
 * //////////////////////////////////////
 *
 * An YQL wrapper used to generate a proxy URL
 * to a given resource.
 */

/**
 * Exporting the module appropriately given the
 * environment (AMD, Node.js and the browser).
 */
(function (name, definition) {
    if (typeof define === 'function' && define.amd) {
        // Defining the module in an AMD fashion.
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        // Exporting the module for Node.js/io.js.
        module.exports = definition();
    } else {
        var instance = definition();
        var old      = this[name];

        /**
         * Allowing to scope the module
         * avoiding global namespace pollution.
         */
        instance.noConflict = function () {
            this[name] = old;
            return instance;
        };
        // Exporting the module in the global
        // namespace in a browser context.
        this[name] = instance;
    }
})('proxify', function () {

    var baseUrl = 'https://query.yahooapis.com/v1/public/yql';

    /**
     * @param object the key/value parameters pair
     * @returns {string} a properly encoded query string
     */
    var encodeParameters = function (object) {
        var params = [];

        for (var p in object) {
            if (object.hasOwnProperty(p)) {
                params.push(encodeURIComponent(p) + '=' + encodeURIComponent(object[p]));
            }
        }
        return params.join('&');
    };

    /**
     * @param url the URL to proxify
     * @param options the options indicating how to build
     * the URL.
     * @returns the YQL endpoint URL query string.
     */
    var createParameters = function (url, options) {
        var input  = options.inputFormat || 'json';
        var output = options.outputFormat || 'json';
        var params = {
            q: 'SELECT * FROM ' + input + ' WHERE url="' + url + '"',
            format: output,
            jsonCompat: 'new'
        };
        if (options.callback) {
            params.callback = options.callback;
        }
        if (options.jsonCompat === false) {
            delete params.jsonCompat;
        }
        return params;
    };

    /**
     * A function returning the proxy URL.
     */
    return function (url, options) {
        options = options || {};
        if (typeof url !== 'string') {
            throw new Error('An URL was expected');
        }
        return baseUrl + '?' + encodeParameters(createParameters(url, options));
    };
});
},{}]},{},[1]);
