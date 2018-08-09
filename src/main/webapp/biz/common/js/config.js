/* global angular */

function config($provide, $urlRouterProvider, $ocLazyLoadProvider, $uibModalProvider) {
    // reset $uibmoal windowTemplateUrl (提升z-index)
    $uibModalProvider.options.windowTemplateUrl = 'static/js/bootstrap/uibmodal-window.html';

    // $ocLazyLoad.load 方法扩展
    $provide.decorator('$ocLazyLoad', ['$delegate', function($delegate) {
        $delegate.loadEx = function() {
            var args = Array.prototype.slice.call(arguments);
            var result = [];

            if (args.length > 1 && args[0] instanceof Array) {
                args = [args.reduce(function(a, b) {
                    return a.concat(b);
                }, [])];
            }

            angular.copy(args, result);
            return Function.prototype.apply.call(this.load, this, result);
        };

        return $delegate;
    }]);

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    // 配置路由
    $urlRouterProvider.otherwise("serviceManager/serviceList");
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
