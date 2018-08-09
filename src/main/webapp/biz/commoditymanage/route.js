(function() {
    function config(routeConfigProvider) {
        var routeList = [{
            // 商品管理
            url: 'commoditymanage',
            menuTitle: '商品管理',
            services: [omsBasicHost+'biz/commoditymanage/services.js'],
            children: [{
                    // 商品服务分类
                    pageTitle: '商品分类',
                    url: 'goodsCategory',
                    controller: {
                        name: 'goodsCategoryCtrl',
                        nameAs: 'scCtrl',
                        files: [omsBasicHost+'biz/commoditymanage/goodscategory/js/goodscategory.js']
                    },
                    templateUrl: omsBasicHost+'biz/commoditymanage/goodscategory/goodscategory.html',
                    plugins: ['ngJsTree','ui.select','fileupload','sweet_alert']
                }, {
                    pageTitle: '商品列表',
                    url: 'goodsList',
                    controller: {
                        name: 'goodsListCtrl',
                        nameAs: 'scCtrl',
                        files: [omsBasicHost+'biz/commoditymanage/goodslist/js/goodslist.js',omsBasicHost+'biz/commoditymanage/goodslist/js/editgoods.js']
                    },
                    templateUrl: omsBasicHost+'biz/commoditymanage/goodslist/goodslist.html',
                    plugins: ['ngJsTree', 'ngDatatables', 'daterangepicker', 'ui.select','sweet_alert','fileupload','text_editor','loading_buttons','loading_image']
                }, {
                    pageTitle: '商品审核列表',
                    url: 'auditList',
                    controller: {
                        name: 'auditListCtrl',
                        nameAs: 'scCtrl',
                        files: [omsBasicHost+'biz/commoditymanage/goodslist/js/auditlist.js']
                    },
                    templateUrl: omsBasicHost+'biz/commoditymanage/goodslist/auditlist.html',
                    plugins: ['ngJsTree', 'ngDatatables', 'daterangepicker', 'ui.select','sweet_alert','fileupload','text_editor','loading_image']
                }
            ]
        }];

        routeConfigProvider.addRoute(routeList);
    }
    angular
        .module('inspinia')
        .config(config);
})(angular)
