/* global angular */
// 公共接口
(function(angular) {
    angular
        .module('commonService', ['ngResource', 'ui.router', 'constant'])
        .factory('commonResource', ['$resource', function($resource) {
            return $resource('', null, {
            	getLoginUser:{ url: 'CommonController/getLoginUser.action', method: 'GET' },
            	getDeviceIds:{ url: 'CommonController/getDeviceIds.action', method: 'GET' }
                
            });
        
        }])
        .service('common', ['$filter', function($filter) {
            this.filter = function(source, filter, isMulti) {
                var result;

                if (source instanceof Array) {
                    result = $filter('filter')(source, filter);
                    result = isMulti ? result : result[0];
                } else {
                    var len = filter.length, key;
                    result = {};
                    while (len--){
                        key = filter[len];
                        angular.isUndefined(source[key]) || (result[key] = source[key]);
                    }
                }

                return result;
            };
            this.safeApply = function(fn, scope) {
                var phase = scope.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    scope.$apply(fn);
                }
            };
        }])
        .provider('routeConfig', ['$stateProvider', 'PLUGINS', function($stateProvider, PLUGINS) {
            var routeList = [];
            var q;

            var getPlugins = function(nameList) {
                var pluginList = [];

                angular.forEach(nameList, function(item) {
                    pluginList.push(PLUGINS[item]);
                });

                return pluginList;
            };

            // 配置路由
            var addState = function(routes, parent) {
                var stateConfig, stateName;

                angular.forEach(routes, function(item) {
                    stateName = (parent ? (parent + '.') : '') + item.url;

                    if (item.children) {
                        stateConfig = {
                            abstract: true,
                            url: "/" + item.url
                        };

                        item.template && (stateConfig.template = item.template);
                        item.template || (stateConfig.templateUrl = (item.templateUrl || "biz/common/content.html"));

                        item.services && (stateConfig.resolve = {
                            loadService: function($ocLazyLoad) {
                                var loadServices = item.services;
                                if (typeof item.services[0] === 'string') {
                                    loadServices = [{
                                        name: item.url,
                                        files: item.services
                                    }];
                                }
                                return $ocLazyLoad.load(loadServices);
                            }
                        });
                    } else {
                        stateConfig = {
                            url: "/" + item.url,
                            controller: item.controller.name,
                            templateUrl: item.templateUrl,
                            data: {
                                pageTitle: item.pageTitle
                            },
                            resolve: {
                                loadPlugin: function($ocLazyLoad) {
                                    var pluginDef = q.defer();
                                    $ocLazyLoad.loadEx(getPlugins(item.plugins))
                                        .then(function() {
                                            var module = item.controller.module || parent;
                                            var ctrlDef = q.defer();
                                            // ctrlDef.resolve();
                                            watchDef(function() {
                                                return $ocLazyLoad.isLoaded(module) && !ctrlDef.resolve();
                                            });
                                            ctrlDef.promise.then(function() {
                                                $ocLazyLoad.load([{
                                                    name: module,
                                                    files: item.controller.files
                                                }]).then(function() {
                                                    pluginDef.resolve();
                                                });
                                            });
                                        });

                                    return pluginDef.promise;
                                }
                            }
                        };
                        item.controller.nameAs && (stateConfig.controllerAs = item.controller.nameAs);
                    }

                    $stateProvider.state(stateName, stateConfig);
                    item.children && addState(item.children, stateName);
                });
            };

            // 监听模块是否已经被注册
            function watchDef(callback) {
                callback() || setTimeout(function() {
                    watchDef(callback);
                }, 20);
            }

            // 过滤非不显示在menu的route
            var filterNonMenu = function(routes) {
                var item;
                for (var i = 0, l = routes.length; i < l; i++) {
                    item = routes[i];
                    if (item.nonMenu) {
                        routes.splice(i, 1);
                        i -= 1;
                        l -= 1;
                    } else {
                        item.children && filterNonMenu(item.children);
                    }
                }

                return routes;
            };

            var addMenu = function(routes) {
                var menuRoutes = filterNonMenu(routes);
                routeList = routeList.concat(menuRoutes);
            };

            return {
                addRoute: function(routes, parent) {
                    addState(routes, parent);
                    addMenu(routes);
                },
                $get: function($q) {
                    q = $q;
                    return {
                        menuList: routeList
                    };
                }
            };

        }])
        .service('fileService', function($window) {
            var helper = {
                support: !!($window.FileReader),
                isFile: function(item) {
                    return angular.isObject(item) && item instanceof $window.File;
                },
                isImage: function(file) {
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            };

            var reader = new FileReader();
            var resolutionCallback = angular.noop;
            reader.onload = onLoadFile;

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var resolution = {
                    width: this.width,
                    height: this.height
                };
                resolutionCallback(resolution);
            }
            this.parseResolution = function(file, callback) {
                if (!helper.support) return;
                if (!helper.isFile(file)) return;
                if (!helper.isImage(file)) return;

                reader.readAsDataURL(file);
                resolutionCallback = callback || angular.noop;
            };
        });
})(angular);
