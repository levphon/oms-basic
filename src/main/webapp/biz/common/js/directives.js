/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'INSPINIA | Responsive Admin Theme';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = '广联运营平台 | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function() {
                element.metisMenu();

            });

            // Colapse menu in mobile mode after click on element
            var menuElement = $('#side-menu a:not([href$="\\#"])');
            menuElement.click(function() {
                if ($(window).width() < 769) {
                    $("body").toggleClass("mini-navbar");
                }
            });

            // Enable initial fixed sidebar
            if ($("body").hasClass('fixed-sidebar')) {
                var sidebar = element.parent();
                sidebar.slimScroll({
                    height: '100%',
                    railOpacity: 0.9,
                });
            }
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: omsBasicHost+'biz/common/ibox_tools.html',
        controller: function($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function() {
                    var ibox = $element.closest('div.ibox');
                    var icon = $element.find('i:first');
                    var content = ibox.children('.ibox-content');
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    ibox.toggleClass('').toggleClass('border-bottom');
                    $timeout(function() {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                },
                // Function for close ibox
                $scope.closebox = function() {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: omsBasicHost+'biz/common/ibox_tools_full_screen.html',
        controller: function($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function() {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.children('.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function() {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function() {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function() {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function($scope, $element) {
            $scope.minimalize = function() {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function() {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')) {
                    $('#side-menu').hide();
                    setTimeout(
                        function() {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue) {
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
}

/**
 * 树形下拉选择框
 * @required：ngJstree
 * @param {[Array]} [ts-option] [选项数组]
 * @param {[Object]} [ng-model] [选中项对象]
 * @param {[String]} [placeholder] [placeholder]
 * @param {[Function]} [ts-selected] [选中时的回调]
 * @param {[boolean]} [only-leaf] [是否只有叶子节点可选]
 * 
 * 例子： 
 *       <tree-select ts-option="treeDatalist" placeholder="请选择" only-leaf="true"
 *              ts-selected="selectCallback(e,node)" ng-model="tsnode">
 *       </tree-select>
 *
 *       selectCallback: 
 *       $scope.selectCallback = function(e, node) {
 *           // do something
 *       }
 */
function treeSelect(common) {
    return {
        restrict: 'AE',
        scope: {
            tsOption: '=', // tree dataList
            placeholder: '@', // placeholder
            selectListener: '&tsSelected', // 选择事件的监听回调
            selectedNode: '=ngModel', // 绑定选择项
            onlyLeaf: '=' // 是否只有叶子节点可选
        },
        replace: true,
        controllerAs: 'vm',
        bindToController: true,
        template: ' <div class="tree-select relative" ng-class="{open:vm.ts.isExpand}">' +
            '     <input type="text" class="form-control" ng-keyup="vm.ts.search()" ng-required="" ng-blur="vm.ts.toggleExpand(vm.ts.isFocusOnJstree($event))" ng-focus="vm.ts.toggleExpand(true)" ng-model="vm.selectedText" placeholder="{{vm.placeholder}}" /> ' +
            '     <span ng-hide="vm.ts.isExpand" class="caret"></span>' +
            '     <div ng-if="vm.tsOption" tabindex="-1" ng-show="vm.ts.isExpand" js-tree="vm.tree.config" ng-model="vm.tsOption" should-apply="vm.tree.ignoreModelChanges()" tree="vm.treeInstance" tree-events="select_node:vm.tree.selectListener;ready:vm.tree.loadListener"></div> ' +
            ' </div>',
        controller: function($scope) {
            var vm = this;
            var inst;

            vm.ts = {
                isExpand: false,
                toggleExpand: function(flag, node) {
                    if (this.isExpand == flag) {
                        return;
                    }
                    this.isExpand = flag;

                    if (this.isExpand) {
                        inst.clear_search();
                    } else {
                        vm.selectedNode = vm.selectedNode || {}; // for default
                        if (vm.selectedText && (vm.selectedText !== vm.selectedNode.text)) {
                            node = vm.selectedNode; // for rollback
                        }
                        node && (vm.selectedText = node.text); // for change
                        vm.selectedText || (vm.selectedNode = null); // for validate
                    }
                },
                isFocusOnJstree: function(event) {
                    var $target = $(event.relatedTarget);
                    var flag = $target.hasClass('jstree') || $target.parents('.jstree').length > 0;
                    flag && $scope.input.focus();
                    return flag;
                },
                // 过滤输入值
                search: function() {
                    inst.search(vm.selectedText);
                }
            };
            vm.placeholder = vm.placeholder || '';
            vm.selectListener = vm.selectListener || angular.noop;

            vm.tree = {
                config: {
                    'plugins': ['types', 'dnd', "search", "wholerow"],
                    'types': {
                        'default': {
                            'icon': 'fa fa-folder'
                        },
                        'html': {
                            'icon': 'fa fa-file-code-o'
                        },
                        'svg': {
                            'icon': 'fa fa-file-picture-o'
                        },
                        'css': {
                            'icon': 'fa fa-file-code-o'
                        },
                        'img': {
                            'icon': 'fa fa-file-image-o'
                        },
                        'js': {
                            'icon': 'fa fa-file-text-o'
                        }
                    },
                    search: {
                        ajax: false,
                        fuzzy: false,
                        show_only_matches: true
                    },
                    version: 1
                },
                ignoreModelChanges: function() {
                    return true;
                },
                // tree选择回调
                selectListener: function(e, selected) {
                    vm.selectedNode = selected.node;
                    vm.selectListener({ e: e, node: selected });
                    vm.ts.toggleExpand(false, vm.selectedNode);

                    $scope.input.blur();
                },
                // tree加载完成时回调
                loadListener: function() {
                    inst = vm.treeInstance.jstree(true);

                    // 只可选择叶子节点
                    vm.onlyLeaf && vm.tsOption.forEach(function(item) {
                        if (!inst.is_leaf(item)) {
                            inst.disable_node(item);
                        }
                    });

                    // 设置默认选中项
                    if (vm.selectedNode) {
                        setDefault();
                    } else {
                        watchDefault();
                    }
                    // 展开所有节点
                    inst.open_all();
                }
            };

            function setDefault() {
                common.safeApply(function() {
                    var obj = inst.get_node(vm.selectedNode);
                    inst.select_node(obj);
                    vm.selectedText = obj.text;
                }, $scope);
            }

            function watchDefault() {
                var watch = $scope.$watch("vm.selectedNode", function(newValue) {
                    newValue && (setDefault(), watch());
                });
            }
        },
        link: function(scope, element) {
            scope.input = element.find('.form-control');
        }
    };
}


/**
 * dual tablebox
 * 依赖：angular-datatables
 * 例子： 
 *       <dual-tablebox dt-option="dtOption" dt-instance="dtInstance">
 *           <!-- 自定义查询表单 -->
 *           <form role="form" class="form-horizontal" name="add_service_form">
 *               <div class="form-group m-b-none">
 *                   <div class="col-lg-9">
 *                       <input name="conditon" class="form-control" type="text" ng-model="conditon.name" />
 *                   </div>
 *                   <div class="col-lg-3">
 *                       <button type="button" class="btn btn-primary" ng-click="query()">查询</button>
 *                   </div>
 *               </div>
 *           </form>
 *       </dual-tablebox>
 *
 *       $scope.dtInstance = {};
 *       $scope.dtOption = {
 *           selectingList: {
 *               data: selectingList,
 *               columns: [{
 *                   name: '名称'
 *               }]
 *           },
 *           selectedList: {
 *               data: selectedList,
 *               columns: [{
 *                   name: '名称'
 *               }]
 *           }
 *       };
 *
 *       获取已选数据
 *       $scope.dtInstance.getSelectedList();
 *
 *       查询数据
 *       $scope.conditon = {};
 *       $scope.query = function () {
 *          && 条件 和 || 条件
 *          $scope.dtInstance.search(andCondition, orCondition)
 *       };
 */
function dualTablebox(DTOptionsBuilder, DTColumnBuilder, $compile, $filter, $q) {
    return {
        restrict: 'E',
        scope: {
            dtOption: '=',
            dtInstance: '='
        },
        replace: true,
        transclude: true,
        templateUrl: omsBasicHost+'biz/common/dualTablebox.html',
        controller: function($scope) {
            var originalData = [],
                selectingList = [],
                selectedList = [],
                filterResult; // 已选 + 未选 全部数据
            var id = $scope.dtOption.id || 'id'; // 数据唯一标识

            init($scope.dtOption);

            // 对外API
            $scope.dtInstance.getSelectedList = function() {
                var list = [];
                selectedList.forEach(function(item) {
                    list.push(item.data);
                });

                return list;
            };
            // 过滤已选项
            $scope.dtInstance.search = function(andCondition, orCondition) {
                andCondition = andCondition || {};
                orCondition = orCondition || {};
                var andList = $filter('filter')(originalData, { data: andCondition });

                selectingList = filterResult = $filter('orFilter')(andList, { data: orCondition });
                $scope.selecting_dtInstance.changeData(fromFnPromise(selectingList));
            };

            function init(dtOption) {
                // table dataList
                var obj, searchIndex,
                    selectedListCopy = [].concat(dtOption.selectedList.data);
                $scope.selecting_dtInstance = {};
                dtOption.selectingList.data.forEach(function(item, index) {
                    searchIndex = inArray(item, selectedListCopy);
                    obj = {
                        selected: searchIndex !== -1,
                        index: index,
                        data: item
                    };
                    if (obj.selected) {
                        selectedListCopy.splice(searchIndex, 1);
                        selectedList.push(obj);
                    }
                    originalData.push(obj);
                });
                selectingList = filterResult = originalData;

                // table colunms 配置
                $scope.selecting_dtColumns = parseTable(dtOption.selectingList); // 待选                
                $scope.selected_dtColumns = parseTable(dtOption.selectedList); // 已选

                // datatables 配置项
                $scope.selecting_dtOptions = DTOptionsBuilder
                    .fromFnPromise(fromFnPromise(selectingList))
                    .withLanguage({'sInfo': "共 _TOTAL_ 条"})
                    .withDisplayLength(-1) // 默认一页展示全部数据
                    .withOption('lengthChange', false) // 禁用动态显示行数
                    .withOption('ordering', false) // 禁用排序 
                    .withOption('info', true) // 禁用翻页
                    .withOption('paging', false) // 禁用翻页
                    .withOption('scrollX', true) // tbody width
                    .withOption('scrollY', "400px") // tbody height
                    .withOption('scrollCollapse', true) // tbody 添加滚动条
                    .withOption('createdRow', function(row, data, dataIndex) {
                        var rowScope = $scope.$parent.$new();
                        rowScope.item = data;
                        rowScope.refresh = refresh;
                        $compile(angular.element(row).contents())(rowScope);
                    });
                $scope.selected_dtOptions = angular.merge({}, $scope.selecting_dtOptions, {
                    scrollY: '400px',
                    fnPromise: fromFnPromise(selectedList)
                });
            }

            function inArray(obj, array) {
                for (var i = 0, l = array.length; i < l; i++) {
                    if (obj[id] === array[i][id]) {
                        return i;
                    }
                }
                return -1;
            }

            function fromFnPromise(data) {
                return function() {
                    var def = $q.defer();
                    def.resolve(data);
                    return def.promise;
                };
            }

            // 解析 table colunms 配置
            function parseTable(data) {
                var dtColumns = [DTColumnBuilder.newColumn('').withClass('text-center').withOption('width', '30px').renderWith(function(data, type, full, oSettings) {
                        return '<input type="checkbox" ng-model="item.selected" ng-change="refresh(item)" />';
                    })
                    /*, DTColumnBuilder.newColumn('').withTitle('序号').withClass('text-center').renderWith(function(data, type, full, oSettings) {
                                        return oSettings.settings._iDisplayStart + oSettings.row + 1;
                                    })*/
                ];
                var dtColumn;

                data.columns.forEach(function(item) {
                    dtColumn = DTColumnBuilder
                        .newColumn(item.prop)
                        .withTitle(item.title)
                        .renderWith(function(data, type, full, oSettings) {
                            if (item.renderWith) {
                                return item.renderWith(data, type, full.data, oSettings);
                            }
                            return full.data[item.prop];
                        });
                    /*item.renderWith  && dtColumn.renderWith(function(data, type, full, oSettings) {
                        return item.renderWith(data, type, full.data, oSettings);
                    });*/
                    item.width && dtColumn.withOption('width', item.width);
                    item.ellipsis && dtColumn.renderWith(function(data, type, full) {
                        return '<div title="' + full.data[item.prop] + '" class="text-ellipsis">' + full.data[item.prop] + '<div>';
                    });
                    dtColumns.push(dtColumn);
                });

                return dtColumns;
            }
            // 同步两侧数据
            $scope.selected_dtInstance = {};
            var refresh = function(target) {
                if (target.selected) {
                    selectedList.push(target);
                    selectedList.sort(function(a, b) {
                        return a.index > b.index;
                    })
                } else {
                    var index = selectedList.indexOf(target);
                    selectedList.splice(index, 1);

                }
                $scope.selected_dtInstance.reloadData();
            };
        }
    };
}

/**
 * 异步验证
 * 异步返回值：data: {result: boolean}，true: 通过，false：不通过
 * 例子：<input type="text" v-async="asyncCallback(value)" />
 */
function vAsync($q, $parse) {
    // 若返回值为非defer对象，则包装一个
    function wrapPromise(result) {
        var def = $q.defer();
        def.resolve(result);
        return def.promise;
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, iElement, attr, ctrl) {

            var getter = $parse(attr.vAsync);

            ctrl.$asyncValidators.vAsync = function(modelValue) {
                // 非空不验证
                if (ctrl.$isEmpty(modelValue)) {
                    return $q.when();
                }

                var def = $q.defer();

                var result = getter($scope, { value: modelValue });
                /**
                 * $promise: $resource 返回值
                 * promise： $q 返回值
                 */
                (result.$promise || result.promise || wrapPromise(result)).then(function(data) {
                    if (data.result) {
                        // 验证通过
                        def.resolve();
                    } else {
                        // 验证不通过
                        def.reject();
                    }
                }, function() {
                    // 验证出错，请稍后再试
                    def.reject();
                });

                return def.promise;
            };
        }
    };
}

/**
 * [vLimit 数字大小范围限制]
 */
function vLimit() {
    return {
        restrict: 'AE',
        scope: {
            vLimit: '='
        },
        require: 'ngModel',
        link: function($scope, iElement, iAttrs, ctrl) {
            ctrl.$validators.vLimit = function(modelValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                // 非空不验证
                if (angular.isNumber(+$scope.vLimit.max) && +modelValue > +$scope.vLimit.max) {
                    return false;
                }
                if (angular.isNumber(+$scope.vLimit.min) && +modelValue < +$scope.vLimit.min) {
                    return false;
                }

                return true;
            };
        }
    };
}

/**
 * [floatFix 补全小数]
 */
function floatFix(common,$parse) {
    var fixLen = 2;
    return {
        restrict: 'AE',
        require: '?ngModel',
        link: function(scope, element, attr) {
            fixLen = attr.floatFix || fixLen;
            var setter = attr.ngModel ? $parse(attr.ngModel).assign : angular.noop;
            element.on('blur', function(){
                var arr = this.value.split('.');
                if (this.value ==="" || isNaN(this.value) || (arr[1] && arr[1].length >= 2)) {
                    return;
                }
                var self = this;
                common.safeApply(function(){
                    setter(scope, (+self.value).toFixed(fixLen));
                }, scope);

            });
        }
    };
}

/**
 * 失去焦点时开始验证
 */
function vOnblur($compile) {
    return {
        restrict: 'A',
        priority: 100, // ngModel has priority 1
        terminal: true,
        link: function(scope, element, attrs) {
            attrs.$set('vOnblur', null); // To stop infinite compile loop
            attrs.$set('ngModelOptions', "{ updateOn: 'blur' }");
            $compile(element)(scope); // Double compilation
        }
    };
}

/**
 * 验证出错时，信息展示
 */
function vMessage($compile) {
    return {
        link: function(scope, element, attrs) {
            var template = '<div class="m-t-xs v-message"></div>';
            var errorDom = angular.element(template);
            var formName = element.parents('form')[0].name;
            var leftpx = element.outerWidth() + element.position().left + 15 + 'px';

            function genTemplate() {
                var htmlArr = [];
                var ngShow, small;
                var elementName = element[0].name;
                var vMsgs = scope.$eval(attrs.vMessage);

                for (var vname in vMsgs) {
                    ngShow = formName + '.' + elementName + '.' + '$error.' + vname;
                    small = '<small class="text-danger" ng-show="' + ngShow + '">' + vMsgs[vname] + '</small>';
                    htmlArr.push(small);
                }

                return htmlArr.join('');
            }

            errorDom.attr('ng-show', formName + '.$invalid && ' + formName + '.$submitted').css('left', leftpx).html(genTemplate());
            element.parent().addClass('relative').append(errorDom);
            $compile(errorDom)(scope);
        }
    };
}

/**
 * 或(||) 过滤器
 */
function orFilter() {
    function compareObj(act, exc) {
        var actItem, excItem;
        var strnum = 'stringnumber';
        exc = exc || {};
        act = act || {};
        if (Object.keys(exc).length === 0) {
            return true;
        }
        if (Object.keys(act).length === 0) {
            return false;
        }
        for (var key in exc) {
            actItem = act[key];
            excItem = exc[key];

            // condition == undefined
            if (excItem === undefined) {
                return true;
            }

            // same type, not string or number
            if (typeof actItem === typeof excItem && strnum.indexOf(typeof actItem) === -1) {
                // object, not array
                if (typeof actItem === 'object' &&
                    !(actItem instanceof Array) && !(excItem instanceof Array) &&
                    compareObj(actItem, excItem)) {
                    return true;
                }
                // other（boolean,undefined)
                if (actItem === excItem) {
                    return true;
                }
                continue;
            }

            // string or number
            if (strnum.indexOf(typeof actItem) !== -1 && strnum.indexOf(typeof excItem) !== -1 &&
                (actItem + '').indexOf(excItem) !== -1) {
                return true;
            }
        }

        return false;
    }

    return function(inputArray, condition) {
        var outArray = [];

        if (Object.keys(condition).length === 0) {
            angular.copy(inputArray, outArray);
        } else {
            inputArray.forEach(function(item) {
                compareObj(item, condition) && outArray.push(item);
            });
        }

        return outArray;
    };
}

function ngThumb($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}

/* modal dialog 高度控制 */
function modalDialog() {
    function fix_height(element) {
        $(element).find('.modal-body').css('max-height', $(window).height() - 200 + "px");
    }
    return {
        restrict: 'C',
        link: function(scope, element) {
            fix_height(element);
            $(window).bind("resize.modalDialog", function() {
                fix_height(element);
            });
            scope.$on('$destory', function() {
                $(window).unbind('resize.modalDialog');
            });
        }
    };
}

// 服务端分页表格
function processDatatable(DTOptionsBuilder, DTColumnBuilder, $compile, common) {
    var defaultOption = {
        dom: 'Tfgt<"limixin"li>p',
        num: false,
        id: 'id',
        select: false,
        selectAllTitle: '<div class="inline" style="width:30px;"><input type="checkbox" class="selectAll"></div>',
        renderWith: function(data, type, full, oSettings) {
            var columnName = oSettings.settings.aoColumns[oSettings.col].mData;
            return full[columnName];
        }
    };


    function merge(defaultOpts, dtOptions) {
        var opts = angular.merge({}, defaultOpts, common.filter(dtOptions, ['num', 'id', 'select']));

        delete dtOptions.select;
        delete dtOptions.id;
        delete dtOptions.num;

        return opts;
    }

    function selectReset() {
        var self = this;
        this.selected = {};
        this.selectAll = false;
        setTimeout(function() {
            $(self.dom).find('.selectAll').prop('checked', false);
        }, 0);
    }

    function toggleAll(selectAll, selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                selectedItems[id] = selectAll;
            }
        }
    }

    function toggleOne(selectedItems, selectInstance) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                if (!selectedItems[id]) {
                    selectInstance.selectAll = false;
                    return;
                }
            }
        }
        selectInstance.selectAll = true;
    }

    function selectBind() {
        var $selectAll;
        var domSelectTable = $(this.dom);
        var self = this;

        if (domSelectTable.length === 0) {
            setTimeout(function() {
                self.bind();
            }, 200);
            return;
        }

        domSelectTable.on('change', '.selectAll', function() {
            $selectAll = $selectAll || $(this);
            self.selectAll = !!$(this).prop('checked');
            self.toggleAll(self.selectAll, self.selected);

            domSelectTable.find('.selectOne').prop('checked', self.selectAll);
        }).on('change', '.selectOne', function() {
            var id = $(this).data('id');

            if (self.type === 'radio') {
                toggleAll(false, self.selected);
            }

            self.selected[id] = !!$(this).prop('checked');
            self.toggleOne(self.selected, self);

            $selectAll = $selectAll || domSelectTable.find('.selectAll');
            $selectAll.prop('checked', self.selectAll);
        });
    }

    // text-ellipsis
    function ellipsisRender(value) {
        return '<div class="text-ellipsis" title="' + $('<div>' + value + '</div>').text().trim() + '">' + value + '</div>';
    }

    // ordering
    function parseOrder(data) {
        var orderInfo = data[2].value[0],
            columns = data[1].value,
            order = {};

        if (orderInfo) {
            order = {
                column: columns[orderInfo.column].data || null,
                sort: orderInfo.dir
            };
        }

        return order;
    }

    return {
        restrict: 'A',
        scope: {
            dtOptions: '=', // 
            dtInstance: '=', // 
            dtColumns: '=' // 
        },
        replace: true,
        template: '<div>' +
            '     <table datatable="" dt-options="dtOptions" dt-instance="pdtInstance" dt-columns="dtColumns"' +
            '         ng-class="{\'table-scrollX\':!!dtOptions.scrollX}" class="table table-bordered table-hover"></table>' +
            '</div>',
        controller: function($scope) {
            var pageData = [];
            var opts = merge(defaultOption, $scope.dtOptions);

            // 序号
            if (opts.num) {
                $scope.dtColumns.unshift(
                    DTColumnBuilder.newColumn('').withTitle('序号').notSortable().withOption('width', '30px').withClass('text-center').renderWith(function(data, type, full, oSettings) {
                        return oSettings.settings._iDisplayStart + oSettings.row + 1;
                    })
                );
            }

            // select
            if (opts.select) {
                var selectInstance = {
                    dom: '.DTFC_LeftWrapper',
                    selected: {},
                    selectAll: false,
                    toggleAll: toggleAll,
                    toggleOne: toggleOne,
                    reset: selectReset,
                    bind: selectBind,
                    type: 'checkbox',
                    head: opts.selectAllTitle
                };

                if (!$scope.dtOptions.fixedColumns || $scope.dtOptions.fixedColumns.leftColumns === 0) {
                    selectInstance.dom = '.dataTables_scroll';
                }

                // 默认多选
                if (opts.select.type == 'single') {
                    selectInstance.type = 'radio';
                    selectInstance.head = '';
                }

                $scope.dtColumns.unshift(
                    DTColumnBuilder.newColumn('').withTitle(selectInstance.head).withOption('width', 30).withClass('text-center').notSortable().renderWith(function(data, type, full, oSettings) {
                        if (!opts.select.filter || opts.select.filter(full, oSettings.row)) {
                            var status = selectInstance.selected[full[opts.id]];
                            var checked = 'checked';
                            if (!status) {
                                selectInstance.selected[full[opts.id]] = false;
                                checked = '';
                            }
                            return '<label role="button" class="btn-block"><input type="' + selectInstance.type + '"' + checked + ' name="datatableselect" data-id="' + full[opts.id] + '" class="selectOne"></label>';
                        } else {
                            return '';
                        }
                    })
                );

                $scope.dtInstance.getSelectItems = function() {
                    var selectList = [];
                    pageData.forEach(function(item) {
                        selectInstance.selected[item[opts.id]] && selectList.push(item);
                    });
                    return selectList;
                };
            }

            // 查询
            $scope.dtInstance.query = function(condition) {
                $scope.autoCount = 0;
                $scope.condition = condition || {};
                $scope.pdtInstance.dataTable.fnDraw();
            };

            // 添加 button ClassName
            if ($scope.dtOptions.buttons) {
                opts.dom = '<"html5buttons"B>' + opts.dom;
                // 删除自带的 dom
                delete $scope.dtOptions.dom;

                $scope.dtOptions.buttons.forEach(function(button) {
                    button.className = 'btn-outline btn-primary';
                });

                var configButton = function(oSettings) {
                    $scope.dtInstance.button = $scope.dtInstance.button || function(selector) {
                        return oSettings._buttons[0].inst.s.dt.button(selector);
                    };
                };
            }

            // text-ellipsis
            $scope.dtColumns.forEach(function(column) {
                if (column.ellipsis) {
                    var mRender = column.mRender || opts.renderWith;
                    column.renderWith(function(data, type, full, oSettings) {
                        return ellipsisRender(mRender(data, type, full, oSettings));
                    });
                    delete column.ellipsis;
                }
            });

            // 放一隐藏的空列在首位，序号、select的排序符号就不会显示出来
            $scope.dtColumns.unshift(
                DTColumnBuilder.newColumn('').notVisible().renderWith(function() {
                    return '';
                })
            );
            if ($scope.dtOptions.fixedColumns && $scope.dtOptions.fixedColumns.leftColumns > 0) {
                $scope.dtOptions.fixedColumns.leftColumns += 1;
            }

            // 配置datatable
            $scope.pdtInstance = {};

            function createdRow(row, data, dataIndex) {
                var rowScope = $scope.$parent.$new();
                rowScope.item = data;
                rowScope.index = dataIndex;
                $compile(angular.element(row).contents())(rowScope);
            }

            function serverData(sSource, aoData, fnCallback, oSettings) {
                (configButton || angular.noop)(oSettings);

                var order = parseOrder(aoData);

                var param = {
                    pageSize: oSettings._iDisplayLength,
                    pageStart: oSettings._iDisplayStart,
                    currentPage: (oSettings._iDisplayLength === -1 ? 0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength)) + 1
                };

                angular.extend(param, $scope.condition, order);
                oSettings.jqXHR = $scope.dtInstance.serverData(param);
                oSettings.jqXHR.$promise.then(function(response) {
                    response.draw = oSettings.iDraw + 1;
                    pageData = response.data || [];
                    // response.recordsTotal = 1100;
                    // response.recordsFiltered = 1100;
                    
                    // 重置checkbox
                    opts.select && !$scope.autoCount && selectInstance.reset();
                    $scope.autoCount && $scope.autoCount--;

                    fnCallback(response);
                    $(window).trigger('resize');
                });
            }

            function headerCallback(header) {
                if (!$scope.headerCompiled) {
                    $scope.headerCompiled = true;
                    $compile(angular.element(header).contents())($scope);
                }
            }

            var default_dtOptions = DTOptionsBuilder
                .newOptions()
                .withLanguage({ 'sInfo': ",&nbsp; 共 _TOTAL_ 条" })
                .withLanguage({ 'sInfoEmpty': ",&nbsp; 共 0 条" })
                .withScroller()
                .withOption('deferRender', true)
                .withOption('scrollX', "100%")
                .withOption('ordering', false)
                .withOption('info', true)
                .withOption('autoWidth', false)
                .withDOM(opts.dom)
                .withOption('headerCallback', headerCallback)
                .withOption('createdRow', createdRow)
                .withFnServerData(serverData)
                .withDataProp('data')
                .withOption('processing', true)
                .withOption('serverSide', true)
                .withOption('initComplete', function() {
                    opts.select && selectInstance.bind();
                });

            angular.extend($scope.dtOptions, angular.extend(default_dtOptions, $scope.dtOptions));
        },
        link: function(scope, element) {

            // 当table容器width改变时，重绘
            window.requestAnimFrame = (function(){
              return  window.requestAnimationFrame       ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame    ||
                      function( callback ){
                        return window.setTimeout(callback, 1000 / 60);
                      };
            })();
            window.cancelAnimationFrame  = (function(){
              return  window.CancelAnimationFrame       ||
                      window.webkitCancelAnimationFrame ||
                      window.mozCancelAnimationFrame    ||
                      function( id ){
                        return window.clearTimeout(id);
                      };
            })();

            var lastWidth =0, curWidth = 0, newWidth, AnimID;
            scope.autoCount = 0;
            var listenWidth = function(){
                newWidth = element.width();
                if (lastWidth !== curWidth && newWidth === curWidth) {
                    // scope.dtInstance && scope.dtInstance.query(scope.condition);
                    scope.autoCount++;
                    scope.dtInstance && scope.pdtInstance.dataTable.fnStandingRedraw();
                    // scope.pdtInstance && scope.pdtInstance.DataTable.columns.adjust().draw();
                    // scope.pdtInstance && scope.pdtInstance.rerender();
                }
                lastWidth = curWidth;
                curWidth = newWidth;
                AnimID = window.requestAnimFrame(listenWidth);
            };
            listenWidth();

            scope.$on("$destroy", function() {
                window.cancelAnimationFrame(AnimID);
            });
        }
    };
}

/* costom form attribute */
function form() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            attrs.$set('autocomplete', 'off'); 
        }
    };
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('icheck', icheck)
    .directive('treeSelect', treeSelect)
    .directive('dualTablebox', dualTablebox)
    .directive('vAsync', vAsync)
    .directive('vOnblur', vOnblur)
    .directive('vLimit', vLimit)
    .directive('vMessage', vMessage)
    .filter('orFilter', orFilter)
    .directive('ngThumb', ngThumb)
    .directive('modalDialog', modalDialog)
    .directive('processDatatable', processDatatable)
    .directive('form', form)
    .directive('floatFix', floatFix);
