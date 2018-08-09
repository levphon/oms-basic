<!--
* INSPINIA - Responsive Admin Theme
* Version 2.7
*
-->
<!DOCTYPE html>
<html>
<!-- <html ng-app="inspinia"> -->

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <link href="images/favicon.ico" rel="bookmark" />
    <link href="images/favicon.ico" rel="icon" type="image/x-icon" />
    <!-- Page title set in pageTitle directive -->
    <title page-title></title>
    <script>
        var cdnPath = "${cdnPath}";
        var inspiniaPath = cdnPath + 'inspinia/2.7/';
        var omsBasicHost = '';
    </script>
    <!-- 动态加载css & js 文件 -->
    <script src="biz/common/js/loadScripts.js"></script>
</head>
<!-- ControllerAs syntax -->
<!-- Main controller with serveral data used in Inspinia theme on diferent view -->

<body ng-controller="MainCtrl as main">
    <!-- Main view  -->
    <div ui-view></div>
</body>

</html>
