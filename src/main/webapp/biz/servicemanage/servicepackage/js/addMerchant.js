(function(angular) {
	

	function addMerchantList($scope, $uibModalInstance, servicePackage,
			param) {
		$scope.selectedList = param;//选中列表		
		// 获取全部定制商列表
		servicePackage.getMerchantList(function(data) {
			$scope.selectingList = data.merchantList;
			$scope.dtOption.selectingList.data = $scope.selectingList;
		});
		$scope.condition = {};
		$scope.dtInstance={};
		$scope.dtOption = {
			id:'merchantId',
			selectingList : {
				data : $scope.selectingList,
				columns : [ {
					prop:'merchantId',
					title:'商户号',
                    width: 45
				}, {
					prop:'merchantName',
					title:'定制商名称',
					ellipsis: true
				} ]
			},
			selectedList : {
				data : $scope.selectedList,
				columns : [ {
					prop:'merchantId',
					title:'商户号',
                    width: 45
				}, {
					prop:'merchantName',
					title:'定制商名称',
					ellipsis: true
				} ]
			}
		};
		
		$scope.query = function(){
			   $scope.dtInstance.search({},{
				   merchantId: $scope.condition.name,  
				   merchantName: $scope.condition.name
			   });
		}
		$scope.ok = function() {
			$uibModalInstance.close($scope.dtInstance.getSelectedList());
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	}

	angular.module('serviceManager').controller('addMerchantList', addMerchantList);

})(angular);
