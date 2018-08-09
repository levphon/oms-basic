
(function(angular) {
	function addServiceList($scope, $uibModalInstance, serviceDefine,
			param) {
		$scope.selectedList = param.selectedServiceList;//选中列表
		$scope.selectingList = param.selectingServiceList;//可选列表
		$scope.condition = {};		
		$scope.dtInstance={};
		$scope.dtOption = {
				id:'id',
				selectingList : {
					data : $scope.selectingList,
					columns : [ {
						prop:'id',
						title:'服务编号',
                    	width: 60
					}, {
						prop:'name',
						title:'服务名称',
	                    width: 100,
						ellipsis: true
					},{
						prop:'quantityUnit',
						title:'计费方式',
						renderWith: function(data, type, full, oSettings){
							return full.quantityUnit!=null?"按数量":"按时间";
						},
                    	width: 60			
					} ]
				},
				selectedList : {
					data : $scope.selectedList,
					columns : [ {
						prop:'id',
						title:'服务编号',
                    	width: 60	
					}, {
						prop:'name',
						title:'服务名称',
	                    width: 100,
						ellipsis: true
					},{
						prop:'quantityUnit',
						title:'计费方式',
						renderWith: function(data, type, full, oSettings){
							return full.quantityUnit!=null?"按数量":"按时间";
						},
                    	width: 60							
					} ]
				}
			};
		
		$scope.dtOption.selectingList.data = $scope.selectingList;
		
		$scope.query = function(){
			   $scope.dtInstance.search({},{
				   id: $scope.condition.name,  
				   name: $scope.condition.name
			   });
		}
		$scope.ok = function() {
			$uibModalInstance.close($scope.dtInstance.getSelectedList()); 
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

	}

	angular.module('serviceManager').controller('addServiceList', addServiceList);

})(angular);
