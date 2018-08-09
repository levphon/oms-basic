(function(angular) {

	// 添加或编辑弹窗controller
	function queryServicePackage($scope, $uibModalInstance, servicePackage,serviceCommon,label,
			param, DTOptionsBuilder, $uibModal,$q,SweetAlertX) {

		$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(-1)
				.withOption('bFilter', false).withButtons([]).withOption(
						'lengthChange', false).withOption('ordering', false)
				.withOption('paging', false).withOption('scrollY', "70px")
				.withOption('scrollCollapse', true);

		$scope.servicePackageData = param.servicePackage;

	
		// 展示绑定的设备列表
		$scope.deviceList = param.deviceList;
		// 展示套餐绑定的服务列表
		$scope.serviceList = param.serviceDefineList;
		// 展示套餐绑定的服务列表
		$scope.merchantList = param.merchantList;
		//编辑服务时绑定选中的卡
		param.cardList.forEach(function(val,index,arr){
			$scope.showCard=true;
			if(val==0){//外部卡
				$scope.showWbCard=true;
			}else if(val==1){//广联3G卡
				$scope.showGl3GCard=true;
			}else if(val==2){//广联繁睿卡
				$scope.showGlfrCard=true; 
			}else if(val==3){//重庆联通卡
				$scope.showCqltCard=true;				
			}			      
		})
		//显示绑定的渠道
		param.configurationsList.forEach(function(val,index,arr){
			if(val.conf_id==param.servicePackage.labelId){
				$scope.labelName=val.conf_value;				
			}
		})
		
		if($scope.servicePackageData.validityPeriodUnit=='forever'){
			$scope.servicePackageData.validityPeriodUnit='永久';
		}else if($scope.servicePackageData.validityPeriodUnit=='year'){
			$scope.servicePackageData.validityPeriodUnit='年';
		}else if($scope.servicePackageData.validityPeriodUnit=='month'){
			$scope.servicePackageData.validityPeriodUnit='月';
		}
		
		if($scope.servicePackageData.validityPeriod && $scope.servicePackageData.validityPeriod != 0){
			$scope.showValidityPeriod = true;
		}
		// 取消
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
        	
	}

	angular.module('serviceManager').controller('queryServicePackage',
			queryServicePackage);

})(angular);
