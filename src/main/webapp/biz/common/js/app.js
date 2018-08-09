/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function(angular) {
    angular.module('inspinia', [
        'ngSanitize',
        'ui.router', // Routing
        'oc.lazyLoad', // ocLazyLoad
        'ui.bootstrap', // Ui Bootstrap
        'constant', // 常量
        'commonService' // restful 接口
    ]);

})(angular);
