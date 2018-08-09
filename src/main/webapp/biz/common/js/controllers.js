/* global angular */
(function(angular) {

    /**
     * MainCtrl - controller
     */
    function MainCtrl($scope,commonResource,routeConfig, $stateParams) {
    	var _this=this;
    	commonResource.getLoginUser(function(data){
    		_this.userName=data.loginUser;
    	});
        $scope.routeParams = $stateParams;
        //this.helloText = '欢迎访问广联运营平台';
        //this.descriptionText = '系统功能描述';
        $scope.menuList = routeConfig.menuList;
    }


    angular
        .module('inspinia')
        .controller('MainCtrl', MainCtrl);

})(angular);
