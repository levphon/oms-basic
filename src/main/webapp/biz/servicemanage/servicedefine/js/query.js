(function(angular) {

	// 查看弹窗controller
	function queryServiceDefine($scope, $uibModalInstance, serviceDefine,
			serviceCommon, SweetAlertX, serviceCategory, label, param,
			DTOptionsBuilder, $uibModal, $q) {

		$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(-1)
				.withOption('bFilter', false)
				.withButtons([])
				.withOption('lengthChange', false)
				.withOption('ordering', false)
				.withOption('paging', false)
				.withOption('scrollY', "170px")
                .withOption('scrollX', true)
				.withOption('scrollCollapse', true);

		$scope.serviceData = param.ServiceDefine;

		//展示绑定的应用列表
		if(param.appList&&param.appList.length>0){
			$scope.showApp=true;
			$scope.appList = param.appList;
		}
		//展示绑定的设备列表
		if(param.deviceList&&param.deviceList.length>0){
			$scope.showDevice=true;
			$scope.deviceList = param.deviceList;
		}
		//展示绑定的流量套餐列表
	    if(param.flowPackageList&&param.flowPackageList.length>0){
	    	$scope.showFlowPackage=true;
	    	$scope.flowPackageList = param.flowPackageList;
	    }
		//展示绑定的卡
		param.cardList.forEach(function(val,index,arr){
			$scope.showCard=true;
			if(val==3){//重庆联通卡
				$scope.showCqltCard=true;
			}else if(val==2){//广联繁睿卡
				$scope.showGlfrCard=true;
			}         
		})
			
		if (!$scope.serviceData.quantity) {// 按时间
			$scope.serviceData.billing = '按时间';
		} else {// 按数量
			$scope.serviceData.billing = '按数量';
		}
		if($scope.serviceData.validityPeriodUnit=='forever'){
			$scope.serviceData.validityPeriodUnit='永久';
		}else if($scope.serviceData.validityPeriodUnit=='year'){
			$scope.serviceData.validityPeriodUnit='年';
		}else if($scope.serviceData.validityPeriodUnit=='month'){
			$scope.serviceData.validityPeriodUnit='月';
		}

		// 当计费方式为按时间时，展示有效期下拉框，隐藏数量下拉框+数量输入框+隐藏有效期输入框
		if (!$scope.serviceData.quantityUnit) {
			$scope.showQuantityUnit = false;
			$scope.showQuantity = false;
			$scope.showValidityPeriodUnit = true;
			if ($scope.serviceData.validityPeriod
					&& $scope.serviceData.validityPeriod != 0) {
				$scope.showValidityPeriod = true;
			}
		} else { // 当计费方式为按数量时，展示数量下拉框+数量输入框+有效期下拉框框,隐藏有效期输入框
			$scope.showQuantityUnit = true;
			$scope.showQuantity = true;
			$scope.showValidityPeriodUnit = true;
			if ($scope.serviceData.validityPeriod) {
				$scope.showValidityPeriod = true;
			}
		}

		//取消
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		//给添加流量表格赋totalAddedFlow、totalBasicFlow值
		$scope.totalAddedFlow=function(item){
			if(item.totalAddedFlow != null){
				return item.totalAddedFlow;
			}else if(item.addedIsUnlimitFlow != null && item.addedIsUnlimitFlow != '--'){
				return item.addedIsUnlimitFlow;
			}else if(item.addedMonthTotalflow != null){
				return item.addedMonthTotalflow+"M/月*"+item.addedPeriods+"月";
			}else{
				return '--';
			}
		}
		
		$scope.totalBasicFlow=function(item){
			if(item.totalBasicFlow != null){
				return item.totalBasicFlow;
			}else if(item.basicIsUnlimitFlow != null && item.basicIsUnlimitFlow != '--'){
				return item.basicIsUnlimitFlow;
			}else if(item.basicMonthTotalflow != null){
				return item.basicMonthTotalflow+"M/月*"+item.basicPeriods+"月";
			}else {
				return '--';
			}
		}
		
		
		//增值流量类型addedFlowType 基础流量类型basicFlowType 设值问题
		$scope.addedFlowType=function(item){
			if(item.addedFlowType != null){
				return item.addedFlowType;
			}else {
				return '--';
			}
		}
		
		$scope.basicFlowType=function(item){
			if(item.basicFlowType != null){
				return item.basicFlowType;
			}else {
				return '--';
			}
		}
	}

	angular.module('serviceManager').controller('queryServiceDefine',
			queryServiceDefine);

})(angular);
