/**
 * 动态加载css & js 文件
 */

(function(cdnPath) {

    document.addEventListener('DOMContentLoaded', function() {
        loadScript(jsFiles);
        document.removeEventListener('DOMContentLoaded', arguments.callee, false);
        // callback();
    }, false);

    var jsFiles = [
        // cdn 服务器
        // jQuery and Bootstrap 
        inspiniaPath + "js/jquery/jquery-3.1.1.min.js",
        inspiniaPath + "js/plugins/jquery-ui/jquery-ui.min.js",
        inspiniaPath + "js/bootstrap/bootstrap.min.js",
        // MetsiMenu
        inspiniaPath + "js/plugins/metisMenu/jquery.metisMenu.js",
        // SlimScroll
        inspiniaPath + "js/plugins/slimscroll/jquery.slimscroll.min.js",
        // Peace JS
        inspiniaPath + "js/plugins/pace/pace.min.js",
        // Custom and plugin javascript 
        inspiniaPath + "js/inspinia.js",
        // Main Angular script
        inspiniaPath + "js/angular/angular.min.js",
        inspiniaPath + "js/angular/angular-route.min.js",
        inspiniaPath + "js/angular/angular-sanitize.min.js",
        inspiniaPath + "js/angular/angular-resource.min.js",
        inspiniaPath + "js/plugins/oclazyload/dist/ocLazyLoad.min.js",
        inspiniaPath + "js/ui-router/angular-ui-router.min.js",
        inspiniaPath + "js/bootstrap/ui-bootstrap-tpls-1.1.2.min.js",
        // local 服务器
        // Anglar App Script
        "biz/common/js/app.js",
        "biz/common/js/constant.js",
        "biz/common/js/config.js",
        "biz/common/js/services.js",
        "biz/common/js/directives.js",
        "biz/common/js/controllers.js",
        // route menu 配置
        "biz/servicemanage/route.js",
        "biz/commoditymanage/route.js"
    ];

    var styleFiles = [
        // cdn 服务器
        // Bootstrap and Fonts
        inspiniaPath + "css/bootstrap.min.css",
        // Font awesome
        inspiniaPath + "font-awesome/css/font-awesome.css",
        // Main Inspinia CSS files
        inspiniaPath + "css/animate.css", {
            id: 'loadBefore',
            url: "static/css/style.css"
        },
        // local 服务器 
        {
            id: 'resetBefore',
            url: "static/css/reset.css"
        },
        "static/css/common.css"
    ];


    function onload(dom, callback) {
        dom.onload = dom.onreadystatechange = function() {
            if (!this.readyState ||
                'loaded' === this.readyState ||
                'complete' === this.readyState) {
                this.onload = this.onreadystatechange = null;
                callback();
            }
        };
    }

    // 动态顺序加载js文件
    function loadScript(files) {
        var url = files.shift();
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;

        onload(script, function() {
            if (files.length > 0) {
                loadScript(files);
            } else {
                // 启动APP
                angular.element(document).ready(function() {
                    angular.bootstrap(document, ['inspinia']);
                });
            }
        });

        document.body.appendChild(script);
    }


    // 创建样式文件
    function loadStyles(files) {
        var url = files.shift();
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url.url || url;
        url.id && (link.id = url.id);

        onload(link, function() {
            if (files.length > 0) {
                loadStyles(files);
            }
        });

        document.getElementsByTagName("head")[0].appendChild(link);
    }
    loadStyles(styleFiles);

})(cdnPath);
