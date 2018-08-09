/**
 * 定义常量
 */
/* global cdnPath, angular */
(function(angular) {
    angular
        .module('constant', [])
        .constant('CDN', {
            path: cdnPath
        })
        .constant('PLUGINS', {
            // 表格
            'ngDatatables': [{
                serie: true,
                insertBefore: '#resetBefore',
                files: [
                    inspiniaPath + 'js/plugins/dataTables/0.5.6/datatables.min.js',
                    inspiniaPath + 'css/plugins/dataTables/0.5.6/datatables.min.css'
                ]
            }, {
                serie: true,
                name: 'datatables',
                files: [inspiniaPath + 'js/plugins/dataTables/0.5.6/angular-datatables.min.js']
            }, {
                serie: true,
                name: 'datatables.buttons',
                files: [inspiniaPath + 'js/plugins/dataTables/0.5.6/angular-datatables.buttons.min.js']
            }, {
                serie: true,
                name: 'datatables.scroller',
                files: [
                    'static/js/plugins/dataTables/dataTables.scroller.js',
                    'static/js/plugins/dataTables/angular-datatables.scroller.min.js',
                    'static/css/plugins/dataTables/dataTables.scroller.css'
                ]
            }, {
                serie: true,
                name: 'datatables.fixedcolumns',
                files: [
                    'static/js/plugins/dataTables/dataTables.fixedColumns.min.js',
                    'static/js/plugins/dataTables/angular-datatables.fixedcolumns.min.js',
                    'static/css/plugins/dataTables/fixedColumns.dataTables.css'
                ]
            }, {
                serie: true,
                files: ['static/js/plugins/dataTables/fnStandingRedraw.js']
            }, {
                serie: true,
                name: 'datatables.config',
                files: ['static/js/plugins/dataTables/angular-datatables-configs.js']
            }],
            // 日期范围选择
            'daterangepicker': [{
                serie: true,
                files: [inspiniaPath + 'js/plugins/moment/moment.min.js']
            }, {
                serie: true,
                files: [inspiniaPath + 'js/plugins/daterangepicker/daterangepicker.js',
                    inspiniaPath + 'css/plugins/daterangepicker/daterangepicker-bs3.css'
                ]
            }, {
                serie: true,
                name: 'daterangepicker',
                files: [inspiniaPath + 'js/plugins/daterangepicker/angular-daterangepicker.js',
                    'static/js/plugins/daterangepicker/angular-daterangepicker-config.js'
                ]
            }],
            // 树列表
            'ngJsTree': [{
                files: [inspiniaPath + 'css/plugins/jsTree/style.min.css',
                    inspiniaPath + 'js/plugins/jsTree/jstree.min.js'
                ]
            }, {
                name: 'ngJsTree',
                files: [inspiniaPath + 'js/plugins/jsTree/ngJsTree.min.js']
            }],
            // 下拉框
            'ui.select': [{
                serie: true,
                name: 'ui.select',
                files: [inspiniaPath + 'js/plugins/ui-select/select.min.js',
                    inspiniaPath + 'css/plugins/ui-select/select.min.css'
                ]
            }],
            //再次弹出框
            'sweet_alert': [{
                serie: true,
                name: 'oitozero.ngSweetAlert',
                files: [inspiniaPath + 'js/plugins/sweetalert/sweetalert.min.js',
                    inspiniaPath + 'css/plugins/sweetalert/sweetalert.css',
                    inspiniaPath + 'js/plugins/sweetalert/angular-sweetalert.min.js',
                    'static/js/plugins/sweetalert/angular-sweetalert-config.js'
                ]
            }],
            // 上传文件依赖
            'fileupload': [{
                name: 'angularFileUpload',
                files: [
                    // inspiniaPath + 'css/plugins/fileupload/angular-file-upload.min.css',
                    inspiniaPath + 'js/plugins/fileupload/angular-file-upload.min.js'
                ]
            }],
            //文本编辑器
            'text_editor': [{
                serie: true,
                name: 'summernote',
                files: [
                    'static/css/plugins/summernote/summernote.css',
                    // inspiniaPath + 'css/plugins/summernote/summernote-bs3.css',
                    'static/js/plugins/summernote/summernote.min.js',
                    'static/js/plugins/summernote/summernote-toolbar-fixed.js',
                    'static/js/plugins/summernote/angular-summernote.min.js'
                ]
            }],
            //checkbox
            'icheck': [{
                files: [
                    inspiniaPath + 'css/plugins/iCheck/custom.css',
                    inspiniaPath + 'js/plugins/iCheck/icheck.min.js'
                ]
            }],
            //Loading
            'loading_buttons': [{
                serie: true,
                name: 'angular-ladda',
                files: [inspiniaPath + '/js/plugins/ladda/spin.min.js', inspiniaPath + '/js/plugins/ladda/ladda.min.js', inspiniaPath + '/css/plugins/ladda/ladda-themeless.min.css', inspiniaPath + '/js/plugins/ladda/angular-ladda.min.js']
            }],
            'loading_image': [{
                serie: true,
                name: 'me-lazyload',
                files: ['static/js/plugins/image/me-lazyload.js']
            }]
        });
    cdnPath = undefined;
})(angular);
