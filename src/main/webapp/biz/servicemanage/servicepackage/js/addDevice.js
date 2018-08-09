(function(angular) {

	function addDeviceList($scope, $uibModalInstance, serviceDefine,
			param,serviceCommon) {
		$scope.selectedList = param;//选中列表	
		$scope.condition = {};
		$scope.dtInstance={};
		// 获取全部设备列表
		serviceDefine.getDeviceList(function(data) {
			$scope.selectingList = data.deviceList;
			$scope.dtOption.selectingList.data = $scope.selectingList;
			// 展示条件查询中的供应商选项
            var supplierList=serviceCommon.getAllSelect();
			for (var i = 0; i < data.supplierList.length; i++) {
				supplierList.push({
					number : i+1,
					text : data.supplierList[i]
				});
			}
			$scope.supplierList = supplierList;
		});
		$scope.dtOption = {
			id:'deviceId',
			selectingList : {
				data : $scope.selectingList,
				columns : [ {
					prop:'deviceId',
					title:'设备编号',
                    width: 60
				}, {
					prop:'deviceName',
					title:'设备名称',
                    width: 100,
					ellipsis: true
				}, {
					prop:'supplierName',
					title:'供应商名称',
                    width: 100,
					ellipsis: true
				} ]
			},
			selectedList : {
				data : $scope.selectedList,
				columns : [ {
					prop:'deviceId',
					title:'设备编号',
                    width: 60
				}, {
					prop:'deviceName',
					title:'设备名称',
                    width: 100,
					ellipsis: true
				}, {
					prop:'supplierName',
					title:'供应商名称',
                    width: 100,
					ellipsis: true
				} ]
			}
		};
		$scope.query = function() {
			var and = {};
			if($scope.condition.supplierName && $scope.condition.supplierName.number!=0){
				and = {
						supplierName : $scope.condition.supplierName.text
				}
			}
			$scope.dtInstance.search(and, {
				deviceId : $scope.condition.name,
				deviceName : $scope.condition.name
			});
		}
		$scope.ok = function() {
			$uibModalInstance.close($scope.dtInstance.getSelectedList());
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	}

	angular.module('serviceManager').controller('addDeviceList', addDeviceList);

})(angular);
