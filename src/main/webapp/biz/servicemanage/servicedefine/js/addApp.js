(function(angular) {
	function addAppList($scope, $uibModalInstance, serviceDefine,
			serviceCategory, param,SweetAlertX) {
		$scope.selectedList = param.appList;//选中列表	
		var type=param.type;
		$scope.condition = {};
		$scope.dtInstance={};
		// 获取全部服务列表
		serviceDefine.getAppList(function(data) {
			$scope.selectingList = data.AppList;
			$scope.dtOption.selectingList.data = $scope.selectingList;
		});
		$scope.dtOption = {
			id:'appCode',
			selectingList : {
				data : $scope.selectingList,
				columns : [ {
					prop:'appCode',
					title:'应用编号',
                    width: 80,
					ellipsis: true
				}, {
					prop:'appName',
					title:'应用名称',
					ellipsis: true
				} ]
			},
			selectedList : {
				data : $scope.selectedList,
				columns : [ {
					prop:'appCode',
					title:'应用编号',
                    width: 80,
                    ellipsis: true
				}, {
					prop:'appName',
					title:'应用名称',
					ellipsis: true
				}  ]
			}
		};
		$scope.query = function(){
			   $scope.dtInstance.search({},{
				   appCode: $scope.condition.name,  
				   appName: $scope.condition.name
			   });
		}

		$scope.ok = function() {
			//当分类类型为应用时，只能选择一个应用
			if(type==201&&$scope.dtInstance.getSelectedList().length>1){
				SweetAlertX.alert("请重新选择", "当分类为应用时,只允许关联一个应用", "warning");
			}else{
				$uibModalInstance.close($scope.dtInstance.getSelectedList());
			}
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	}

	angular.module('serviceManager').controller('addAppList', addAppList);

})(angular);
