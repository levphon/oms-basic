(function(angular) {

	function labelList($scope, DTOptionsBuilder, label, DTColumnBuilder,SweetAlertX,
			$compile, $filter, $uibModal) {

		var obj = {};

		$scope.conditions = {
			daterange : '',
			conditionQuery : '支持按标签编号、标签名称模糊摸索'
		};

		$scope.dtInstance = {
            serverData: label.getServiceList
        };

		$scope.dtOptions = DTOptionsBuilder.newOptions()
				.withButtons([ {
					text : '添加标签',
					action : function(e, dt, node, config) {
						$scope.editService();
					}
				} ])
	            .withFixedColumns({
	                leftColumns: 0,
	                rightColumns: 1
	            });

		$scope.dtColumns = [
				DTColumnBuilder.newColumn('id').withOption('width',100).withTitle('标签编号'),
				DTColumnBuilder.newColumn('name').withOption('width',80).withOption('ellipsis',true).withTitle('标签名称'),
				DTColumnBuilder.newColumn('type').withOption('width',80).withTitle('标签类型').renderWith(checkType),
				DTColumnBuilder.newColumn('description').withOption('ellipsis',true).withTitle('描述').renderWith(showDes),
				DTColumnBuilder.newColumn('createBy').withOption('width',56).withTitle('创建人'),
				DTColumnBuilder.newColumn('createTime').withOption('width',130).withTitle('创建时间').renderWith(
								function(e, dt, node, config) {
									return $filter('date')(node.createTime,
											'yyyy-MM-dd HH:mm:ss')
								}),
				DTColumnBuilder.newColumn('').withTitle('<div style="width: 100px;">操作</div>').withOption('width',100).withClass('link-group').renderWith(operate) ];
		function operate(e, dt, node, config) {

			return '<a href="javascript:;" class="text-info" ng-click="editService(\''
			       + node.id
			       + '\')">编辑</a>';
	        /*<a href="javascript:;"  class="text-danger" ng-click="removeService(\''
	        + node.id + '\')">删除</a>*/
		}
		function checkType(e, dt, node, config) {
			if (node.type == 1){
				return "单服务";
			}else if (node.type == 2){
				return "套餐服务"
			}else{
				return '--';
			}
			
		}
		function showDes(e, dt, node, config){
			if(node.description==null){
				return "";
			}else{
				return node.description;
			}
		}

		label.getServiceList(function(data) {
			$scope.serviceList = data.data;
			// 条件查询中的字段
			$scope.service = {};
		});
		// 数量下拉框
		$scope.types = [ {
			number : '',
			text : '全部'
		}, {
			number : '1',
			text : '单服务'
		},{
			number : '2',
			text : '套餐服务'
		} ];
		//条件查询
		$scope.serviceForm = function() {
			obj = {};
			var service = $scope.service;
			if (service.createTime && service.createTime.startDate
					&& service.createTime.endDate) {
				var startTime = service.createTime.startDate
						.format('YYYY-MM-DD 00:00:00');
				var endTime = service.createTime.endDate
						.format('YYYY-MM-DD 23:59:59');
				obj.startTime = startTime;
				obj.endTime = endTime;
			}
			//分类
			if (service.type) {
				var type = service.type.number;
				obj.type = type;
			}
			
			if (service.queryText) {
				var queryText = service.queryText;
				obj.queryText = queryText;
			}
			$scope.dtInstance.query(obj);
		}
		//编辑或添加
		$scope.editService = function(item) {
			label.toAddService({id : item}, function(data) {
				//打开弹出框
				var modalInstance = $uibModal.open({
					templateUrl: omsBasicHost+'biz/servicemanage/label/add.html',
					controller : 'addLabel',
					// size: 'lg',
					resolve : {
						param : function() {
							return data || {};
						}
					}
				});
				// 弹窗返回值
				modalInstance.result.then(function(data) {
					if (data) {
						$scope.dtInstance.query(obj);
					}
					$scope.dtInstance.reloadData();
				})
			});

		}
		//删除
		$scope.removeService = function(item) {
	        SweetAlertX.confirm({
	                text: "确定是否要删除?"
                }, function () {
					label.delService({
						id : item
					}, function(data) {
						if (data.result) {
					 		SweetAlertX.alert('','删除成功','success',function(){
                                $scope.dtInstance.query(obj);
                            });
						} else {
					 		SweetAlertX.alert('','删除失败','error');
						}
					});
            	}
            );
		}
	}
	// 弹窗controller
	function addLabel($scope, $uibModalInstance, label, param,SweetAlertX) {
		$scope.serviceData = param.serviceTag;
		// 类型下拉框
		$scope.types = [ {
			number : '1',
			text : '单服务'
		},{
			number : '2',
			text : '套餐服务'
		} ];
		//给下拉框赋默认值
		if ($scope.serviceData) {
			var i = $scope.serviceData.type;
			$scope.serviceData.type = $scope.types[i - 1];
			//添加页展示添加或编辑字样
			$scope.isEdit = $scope.serviceData.id !== null;
		}
		
		//校验服务名称是否重复
		$scope.asyncCallback = function(value) {
			var obj = {};
			//编辑服务时，输入的名称和原本的名称不一致时才判断
			if(param.serviceTag&&param.serviceTag.name!=value){
				obj.name = value;
				result=label.existsByName(obj);
			}else{
				result = {result: true};
			}
			return result;
		}
		
		$scope.ok = function() {
			if ($scope.add_service_form.$valid) {
				var obj = {};
				var service = $scope.serviceData;
				obj.id=service.id;
				//获取标签名称
				obj.name = service.name;
				//获取选中的分类
				if (service.type) {
					var type = service.type.number;
					obj.type = type;
				}
				//获取描述
				obj.description = service.description;

				label.addService(obj, function(data) {
					if (data.result) {
				 		SweetAlertX.alert('','保存成功','success');
						$uibModalInstance.close(data);
					} else {
				 		SweetAlertX.alert('','保存失败','error');
					}
				});
			} else {
				$scope.add_service_form.submitted = true;
			}
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}

	angular.module('serviceManager').controller('labelList', labelList)
			.controller('addLabel', addLabel);

})(angular);
