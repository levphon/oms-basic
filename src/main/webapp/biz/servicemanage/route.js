(function() {
    function config(routeConfigProvider) {
        var routeList = [{
            // 服务管理
            url: 'serviceManager',
            menuTitle: '服务管理',
            services: [omsBasicHost+'biz/servicemanage/services.js'],
            children: [{
                    pageTitle: '服务分类',
                    url: 'serviceCategory',
                    controller: {
                        name: 'serviceCategoryCtrl',
                        nameAs: 'scCtrl',
                        files: [omsBasicHost+'biz/servicemanage/servicecategory/js/category.js']
                    },
                    templateUrl: omsBasicHost+'biz/servicemanage/servicecategory/category.html',
                    plugins: ['ngJsTree', 'jasny', 'sweet_alert', 'ui.select']
                },
                // 标签管理
                {
                    pageTitle: '标签列表',
                    url: 'labelList',
                    controller: {
                        name: 'labelList',
                        nameAs: 'scCtrl',
                        files: [omsBasicHost+'biz/servicemanage/label/js/list.js']
                    },
                    templateUrl: omsBasicHost+'biz/servicemanage/label/list.html',
                    plugins: ['ngDatatables', 'daterangepicker','sweet_alert',
                        'ui.select'
                    ]
                }, {
                    pageTitle: '服务列表',
                    url: 'serviceList',
                    controller: {
                        name: 'serviceDefineList',
                        files: [omsBasicHost+'biz/servicemanage/servicedefine/js/list.js',
                                omsBasicHost+'biz/servicemanage/servicedefine/js/query.js',
                                omsBasicHost+'biz/servicemanage/servicedefine/js/add.js',
                                omsBasicHost+'biz/servicemanage/servicedefine/js/addApp.js',
                                omsBasicHost+'biz/servicemanage/servicedefine/js/addDevice.js',
                                omsBasicHost+'biz/servicemanage/servicedefine/js/addFlowPackage.js'
                        ]
                    },
                    templateUrl: omsBasicHost+'biz/servicemanage/servicedefine/list.html',
                    plugins: ['ngDatatables', 'daterangepicker', 'ngJsTree',
                        'ui.select','sweet_alert','icheck'
                    ]
                }, {
                    pageTitle: '服务套餐',
                    url: 'servicePackage',
                    controller: {
                        name: 'servicePackageList',
                        files: [omsBasicHost+'biz/servicemanage/servicepackage/js/list.js',
                                omsBasicHost+'biz/servicemanage/servicepackage/js/query.js',
                                omsBasicHost+'biz/servicemanage/servicepackage/js/add.js',
                                omsBasicHost+'biz/servicemanage/servicepackage/js/addDevice.js',
                                omsBasicHost+'biz/servicemanage/servicepackage/js/addService.js',
                                omsBasicHost+'biz/servicemanage/servicepackage/js/addMerchant.js'
                                ]
                    },
                    templateUrl: omsBasicHost+'biz/servicemanage/servicepackage/list.html',
                    plugins: ['ngDatatables', 'daterangepicker','sweet_alert',
                        'ui.select','icheck'
                    ]
                }
            ]
        }];

        routeConfigProvider.addRoute(routeList);
    }
    angular
        .module('inspinia')
        .config(config);

})(angular)
