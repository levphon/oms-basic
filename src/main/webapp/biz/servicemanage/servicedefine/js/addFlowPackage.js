(function(angular) {
	function addFlowPackageList($scope, $uibModalInstance, serviceDefine,
			param,SweetAlertX) {
		$scope.selectedList = param;//选中列表	
		$scope.condition = {};
		$scope.dtInstance={};
		// 获取全部流量套餐列表
		serviceDefine.getFlowPackageList(function(data) {
			$scope.selectingList = data.flowPackageList;
			$scope.dtOption.selectingList.data = $scope.selectingList;
		});
		$scope.packageCategory = [{
			number : '',
			text : '全部'
		},{
			number : '0',
			text : '流量套餐'
		}, {
			number : '1',
			text : '流量包'
		} ];
		$scope.dtOption = {
			id:'flowPackageId',
			selectingList : {
				data : $scope.selectingList,
				columns : [ {
					prop:'flowPackageId',
					title:'套餐编号',
                    width: 125
				}, {
					prop:'packageName',
					title:'套餐名称',
                    width: 125,
					ellipsis: true
				},{
					prop:'packageCategory',
					title:'套餐类别',
                    width: 125
				},{
					prop:'billingMethods',
					title:'计费方式',
                    width: 125
				},{
					prop:'addedFlowType',
					title:'增值流量类型',
					renderWith:function(data,type,full,oSettings){						
						if(full.addedFlowType != null){
							return full.addedFlowType;
						}else {
							return '--';
						}
					},
                    width: 125
				},{
					prop:'totalAddedFlow',
					title:'增值总流量（M）',
					renderWith:function(data,type,full,oSettings){
						if(full.totalAddedFlow != null){
							return full.totalAddedFlow;
						}else if(full.addedIsUnlimitFlow != null && full.addedIsUnlimitFlow != '--'){
							return full.addedIsUnlimitFlow;
						}else if(full.addedMonthTotalflow != null){
							return full.addedMonthTotalflow+"M/月*"+full.addedPeriods+"月";
						}else{
							return '--';
						}
					},
                    width: 125
				},{
					prop:'basicFlowType',
					title:'基础流量类型',
					renderWith:function(data,type,full,oSettings){
						if(full.basicFlowType != null){
							return full.basicFlowType;
						}else {
							return '--';
						}
					},
                    width: 125
				},{
					prop:'totalBasicFlow',
					title:'基础总流量（M）',
					renderWith:function(data,type,full,oSettings){
						if(full.totalBasicFlow != null){
							return full.totalBasicFlow;
						}else if(full.basicIsUnlimitFlow != null && full.basicIsUnlimitFlow != '--'){
							return full.basicIsUnlimitFlow;
						}else if(full.basicMonthTotalflow != null){
							return full.basicMonthTotalflow+"M/月*"+full.basicPeriods+"月";
						}else {
							return '--';
						}
					},
                    width: 125
				},{
					prop:'validityPeriod',
					title:'有效期',
					renderWith:function(data,type,full,oSettings){
						return full.validityPeriod+full.validityPeriodUnit;
					},
                    width: 125
				}]
			},
			selectedList : {
				data : $scope.selectedList,
				columns : [  {
					prop:'flowPackageId',
					title:'套餐编号',
                    width: 125
				}, {
					prop:'packageName',
					title:'套餐名称',
                    width: 125,
					ellipsis: true
				},{
					prop:'packageCategory',
					title:'套餐类别',
                    width: 125
				},{
					prop:'billingMethods',
					title:'计费方式',
                    width: 125
				},{
					prop:'addedFlowType',
					title:'增值流量类型',
					renderWith:function(data,type,full,oSettings){
						if(full.addedFlowType != null){
							return full.addedFlowType;
						}else {
							return '--';
						}
					},
                    width: 125
				},{
					prop:'totalAddedFlow',
					title:'增值总流量',
					renderWith:function(data,type,full,oSettings){
						if(full.totalAddedFlow != null){
							return full.totalAddedFlow;
						}else if(full.addedIsUnlimitFlow != null && full.addedIsUnlimitFlow != '--'){
							return full.addedIsUnlimitFlow;
						}else if(full.addedMonthTotalflow != null){
							return full.addedMonthTotalflow+"M/月*"+full.addedPeriods+"月";
						}else{
							return '--';
						}
					},
                    width: 125
				},{
					prop:'basicFlowType',
					title:'基础流量类型',
					renderWith:function(data,type,full,oSettings){
						if(full.basicFlowType != null){
							return full.basicFlowType;
						}else {
							return '--';
						}
					},
                    width: 125
				},{
					prop:'totalBasicFlow',
					title:'基础总流量（M）',
					renderWith:function(data,type,full,oSettings){
						if(full.totalBasicFlow != null){
							return full.totalBasicFlow;
						}else if(full.basicIsUnlimitFlow != null && full.basicIsUnlimitFlow != '--'){
							return full.basicIsUnlimitFlow;
						}else if(full.basicMonthTotalflow != null){
							return full.basicMonthTotalflow+"M/月*"+full.basicPeriods+"月";
						}else {
							return '--';
						}
					},
                    width: 125
				},{
					prop:'validityPeriod',
					title:'有效期',
					renderWith:function(data,type,full,oSettings){
						return full.validityPeriod+full.validityPeriodUnit;
					},
                    width: 125
				}]
			}
		};
		$scope.query = function() {
			var and = {};
			if ($scope.condition.packageCategory
					&& $scope.condition.packageCategory.number != '') {
				and = {
						packageCategory : $scope.condition.packageCategory.text
				}
			}
			$scope.dtInstance.search(and, {
				flowPackageId : $scope.condition.name,
				packageName : $scope.condition.name
			});
		}

		$scope.ok = function() {
			//当分类类型为流量时，只能选择一个套餐
			if($scope.dtInstance.getSelectedList().length>1){
				SweetAlertX.alert("请重新选择", "当分类为流量时,只允许关联一个流量套餐", "warning");
			}else{
				$uibModalInstance.close($scope.dtInstance.getSelectedList());
			}
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	}

	angular.module('serviceManager').controller('addFlowPackageList', addFlowPackageList);

})(angular);
