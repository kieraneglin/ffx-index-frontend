/**
 * @license Angulartics
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * License: MIT
 */
!function(a,b){"use strict";function c(){
// General buffering handler
function b(a){return function(){j.waitForVendorCount&&(k[a]||(k[a]=[]),k[a].push(arguments))}}
// As handlers are installed by plugins, they get pushed into a list and invoked in order.
function c(b,c,d){return l[b]||(l[b]=[]),l[b].push(c),m[c]=d,function(){var c=Array.prototype.slice.apply(arguments);return this.$inject(["$q",a.bind(this,function(d){return d.all(l[b].map(function(b){var e=m[b]||{};if(e.async){var f=d.defer(),g=a.copy(c);return g.unshift(f.resolve),b.apply(this,g),f.promise}return d.when(b.apply(this,c))},this))})])}}
// Will run setTimeout if delay is > 0
// Runs immediately if no delay to make sure cache/buffer is flushed before anything else.
// Plugins should take care to register handlers by order of precedence.
function d(a,b){b?setTimeout(a,b):a()}
// General function to register plugin handlers. Flushes buffers immediately upon registration according to the specified delay.
function e(b,e,f){n[b]=c(b,e,f);var g=h[b],i=g?g.bufferFlushDelay:null,j=null!==i?i:h.bufferFlushDelay;a.forEach(k[b],function(a,b){d(function(){e.apply(this,a)},b*j)})}function f(a){return a.replace(/^./,function(a){return a.toUpperCase()})}
// Adds to the provider a 'register#{handlerName}' function that manages multiple plugins and buffer flushing.
function g(a){var d="register"+f(a);o[d]=function(b,c){e(a,b,c)},n[a]=c(a,b(a))}var h={pageTracking:{autoTrackFirstPage:!0,autoTrackVirtualPages:!0,trackRelativePath:!1,autoBasePath:!1,basePath:"",excludedRoutes:[]},eventTracking:{},bufferFlushDelay:1e3,// Support only one configuration for buffer flush delay to simplify buffering
developerMode:!1},i=["pageTrack","eventTrack","exceptionTrack","setAlias","setUsername","setUserProperties","setUserPropertiesOnce","setSuperProperties","setSuperPropertiesOnce","userTimings"],k={},l={},m={},n={settings:h},o={$get:["$injector",function(a){return p(a)}],api:n,settings:h,virtualPageviews:function(a){this.settings.pageTracking.autoTrackVirtualPages=a},excludeRoutes:function(a){this.settings.pageTracking.excludedRoutes=a},firstPageview:function(a){this.settings.pageTracking.autoTrackFirstPage=a},withBase:function(b){this.settings.pageTracking.basePath=b?a.element(document).find("base").attr("href"):""},withAutoBase:function(a){this.settings.pageTracking.autoBasePath=a},developerMode:function(a){this.settings.developerMode=a}},p=function(b){return a.extend(n,{$inject:b.invoke})};
// Set up register functions for each known handler
a.forEach(i,g);for(var q in o)this[q]=o[q]}function d(b,c,d,e){function f(a){for(var b=0;b<d.settings.pageTracking.excludedRoutes.length;b++){var c=d.settings.pageTracking.excludedRoutes[b];if(c instanceof RegExp&&c.test(a)||a.indexOf(c)>-1)return!0}return!1}function g(a,b){f(a)||d.pageTrack(a,b)}d.settings.pageTracking.autoTrackFirstPage&&e.invoke(["$location",function(a){/* Only track the 'first page' if there are no routes or states on the page */
var b=!0;if(e.has("$route")){var f=e.get("$route");if(f)for(var h in f.routes){b=!1;break}else null===f&&(b=!1)}else if(e.has("$state")){var i=e.get("$state");for(var j in i.get()){b=!1;break}}if(b)if(d.settings.pageTracking.autoBasePath&&(d.settings.pageTracking.basePath=c.location.pathname),d.settings.pageTracking.trackRelativePath){var k=d.settings.pageTracking.basePath+a.url();g(k,a)}else g(a.absUrl(),a)}]),d.settings.pageTracking.autoTrackVirtualPages&&e.invoke(["$location",function(a){d.settings.pageTracking.autoBasePath&&(/* Add the full route to the base. */
d.settings.pageTracking.basePath=c.location.pathname+"#");var f=!0;if(e.has("$route")){var h=e.get("$route");if(h)for(var i in h.routes){f=!1;break}else null===h&&(f=!1);b.$on("$routeChangeSuccess",function(b,c){if(!c||!(c.$$route||c).redirectTo){var e=d.settings.pageTracking.basePath+a.url();g(e,a)}})}e.has("$state")&&!e.has("$transitions")&&(f=!1,b.$on("$stateChangeSuccess",function(b,c){var e=d.settings.pageTracking.basePath+a.url();g(e,a)})),e.has("$state")&&e.has("$transitions")&&(f=!1,e.invoke(["$transitions",function(b){b.onSuccess({},function(b){var c=b.options();if(c.notify){var e=d.settings.pageTracking.basePath+a.url();g(e,a)}})}])),f&&b.$on("$locationChangeSuccess",function(b,c){if(!c||!(c.$$route||c).redirectTo)if(d.settings.pageTracking.trackRelativePath){var e=d.settings.pageTracking.basePath+a.url();g(e,a)}else g(a.absUrl(),a)})}]),d.settings.developerMode&&a.forEach(d,function(a,b){"function"==typeof a&&(d[b]=function(){})})}function e(b){return{restrict:"A",link:function(c,d,e){var f=e.analyticsOn||"click",j={};a.forEach(e.$attr,function(a,b){h(b)&&(j[i(b)]=e[b],e.$observe(b,function(a){j[i(b)]=a}))}),a.element(d[0]).bind(f,function(f){var h=e.analyticsEvent||g(d[0]);j.eventType=f.type,e.analyticsIf&&!c.$eval(e.analyticsIf)||(
// Allow components to pass through an expression that gets merged on to the event properties
// eg. analytics-properites='myComponentScope.someConfigExpression.$analyticsProperties'
e.analyticsProperties&&a.extend(j,c.$eval(e.analyticsProperties)),b.eventTrack(h,j))})}}}function f(a){return["a:","button:","button:button","button:submit","input:button","input:submit"].indexOf(a.tagName.toLowerCase()+":"+(a.type||""))>=0}function g(a){return f(a)?a.innerText||a.value:a.id||a.name||a.tagName}function h(a){return"analytics"===a.substr(0,9)&&-1===["On","Event","If","Properties","EventType"].indexOf(a.substr(9))}function i(a){var b=a.slice(9);// slice off the 'analytics' prefix
// slice off the 'analytics' prefix
return"undefined"!=typeof b&&null!==b&&b.length>0?b.substring(0,1).toLowerCase()+b.substring(1):b}var j=window.angulartics||(window.angulartics={});j.waitForVendorCount=0,j.waitForVendorApi=function(a,b,c,d,e){e||j.waitForVendorCount++,d||(d=c,c=void 0),!Object.prototype.hasOwnProperty.call(window,a)||void 0!==c&&void 0===window[a][c]?setTimeout(function(){j.waitForVendorApi(a,b,c,d,!0)},b):(j.waitForVendorCount--,d(window[a]))},/**
 * @ngdoc overview
 * @name angulartics
 */
a.module("angulartics",[]).provider("$analytics",c).run(["$rootScope","$window","$analytics","$injector",d]).directive("analyticsOn",["$analytics",e])}(angular);
