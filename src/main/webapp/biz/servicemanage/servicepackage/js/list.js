(function(angular) {

	function servicePackageList($scope, DTOptionsBuilder, servicePackage,serviceCommon,commonResource,label,SweetAlertX,
			$compile,$uibModal,DTColumnBuilder) {

		var obj = {};
		$scope.dtInstance = {
            serverData: servicePackage.getServicePackageList
        };
		$scope.dtOptions = DTOptionsBuilder.newOptions()
				.withButtons([ {
					text : '添加服务套餐',
					action : function(e, dt, node, config) {
						$scope.editServicePackage();
					}
				},{
	                text: '导出excel',
	                action: function(e, dt, node, config) {
	                     $scope.exportServicePackage();
	                }
	            } ])
	            .withFixedColumns({
	                leftColumns: 0,
	                rightColumns: 1
	            });

		var render = (function () {
			var ops = {
				query: '<a href="javascript:;" class="text-info" ng-click="queryServicePackage(item)">查看</a>',
				edit: '<a href="javascript:;" class="text-info" ng-click="editServicePackage(item)">编辑</a>',
				remove: '<a href="javascript:;" class="text-danger" ng-click="removeServicePackage(item)">删除</a>',
				on: '<a href="javascript:;" ng-click="updownServicePackage(item,2)">上架</a>',
				off: '<a href="javascript:;" ng-click="updownServicePackage(item,3)">下架</a>'
			};

			return function (e, dt, node, config) {
				var results = [];
				results.push(ops.query);
                if (node.shelveStatus == 1) {                	
                    results.push(ops.edit);
                    results.push(ops.remove);
                }else if (node.shelveStatus == 2) {
                	results.push(ops.off);               
                }else if(node.shelveStatus == 3){
                	results.push(ops.on);
                	results.push(ops.edit);
                }
				return results.join('');
			};
		})();
		$scope.dtColumns = [
				DTColumnBuilder.newColumn('id').withOption('width',100).withTitle('服务套餐编号'),
				DTColumnBuilder.newColumn('name').withOption('ellipsis',true).withTitle('服务套餐名称'),
				DTColumnBuilder.newColumn('merchantList').withOption('ellipsis',true).withTitle('服务定制商'),
				DTColumnBuilder.newColumn('').withTitle('有效期').withOption('width',56).renderWith(validity),
				DTColumnBuilder.newColumn('serviceTagName').withOption('width',100).withOption('ellipsis',true).withTitle('标签'),
				DTColumnBuilder.newColumn('shelveStatus').withOption('width',56).withTitle('状态').renderWith(statusRender),
				DTColumnBuilder.newColumn('createBy').withOption('width',56).withTitle('创建人'),
				DTColumnBuilder.newColumn('createTime').withOption('width',130).withTitle('创建时间'),
				DTColumnBuilder.newColumn('').withClass('link-group').withTitle('<div style="width: 150px;">操作</div>').withOption('width',150).renderWith(render) ];

		 function validity(e, dt, node, config) {
			if (node.validityPeriodUnit && node.validityPeriodUnit != null) {
				if (node.validityPeriodUnit == 'forever') {
					return '永久有效';
				} else if (node.validityPeriodUnit == 'year') {
					return node.validityPeriod + '年';
				} else if (node.validityPeriodUnit == 'month') {
					return node.validityPeriod + '月';
				}
			}else{
				return '';
			}

		}
		 
		function statusRender(e, dt, node, config) {
			return serviceCommon.getBoxSelect(node.shelveStatus, $scope.status,'number').text;
		}

		servicePackage.getServicePackageList(function(data) {
			$scope.servicePackageList = data.ServicePackageList;
			// 条件查询中的字段
			$scope.servicePackage = {};
			// 展示条件查询中的标签选项
			// 展示条件查询中的标签选项
			var labelList=serviceCommon.getAllSelect();
			var labels={};
			labels.type=2;
			label.getServiceList(labels, function(result) {
				for (var i = 0; i < result.data.length; i++) {
					labelList.push({
						number : result.data[i].id,
						text : result.data[i].name
					});
				}
				$scope.label = labelList;
			});
			
			// 展示条件查询中的供应商选项
			var supplierList = serviceCommon.getAllSelect();
			for (var i = 0; i < data.supplierList.length; i++) {
				supplierList.push({
					number : data.supplierList[i].merchantId,
					text : data.supplierList[i].merchantName
				});
			}
			$scope.supplier = supplierList;
			//查询条件下拉框默认是套餐
			$scope.servicePackage.queryType=$scope.queryType[0];
		});

		// 状态下拉框
		$scope.status = [ {
			number : '0',
			text : '全部'
		}, {
			number : '1',
			text : '草稿'
		}, {
			number : '2',
			text : '已上架'
		}, {
			number : '3',
			text : '已下架'
		} ];
		
		$scope.queryType = [{
            number: '1',
            text: '服务套餐'
        }, {
            number: '2',
            text: '设备'
        }]
		// 卡名称下拉框
		$scope.cardName = [ {
			number : '',
			text : '全部'
		}, {
			number : '0',
			text : '外部卡'
		}, {
			number : '1',
			text : '广联3G卡'
		}, {
			number : '2',
			text : '广联繁睿卡'
		}, {
			number : '3',
			text : '重庆联通卡'
		} ];

	    function getServicePackageForm(obj){
			var servicePackages = $scope.servicePackage;
			if (servicePackages.createTime
					&& servicePackages.createTime.startDate
					&& servicePackages.createTime.endDate) {
				var startTime = servicePackages.createTime.startDate
						.format('YYYY-MM-DD 00:00:00');
				var endTime = servicePackages.createTime.endDate
						.format('YYYY-MM-DD 23:59:59');
				obj.startTime = startTime;
				obj.endTime = endTime;
			}

			// 状态
			if (servicePackages.shelveStatus&&servicePackages.shelveStatus.number!=0) {
				var shelveStatus = servicePackages.shelveStatus.number;
				obj.shelveStatus = shelveStatus;
			}
			//服务定制商
			if(servicePackages.supplier&&servicePackages.supplier.number!=0){
				var merchantList=servicePackages.supplier.number;
				obj.merchantList=merchantList;
			}
			// 标签
			if (servicePackages.serviceTag&&servicePackages.serviceTag.number!=0) {
				var serviceTagId = servicePackages.serviceTag.number;
				var serviceTagName = servicePackages.serviceTag.text;
				obj.serviceTagId = serviceTagId;
				obj.serviceTagName = serviceTagName;
			}
			//卡名称
			if(servicePackages.cardName&&servicePackages.cardName.number!=''){
				var cardName=servicePackages.cardName.number;
				obj.cardName=cardName;
			}
			// 条件查询
			if(servicePackages.queryType){
             	var queryType=servicePackages.queryType.number;
             	obj.queryType=queryType;
            }
			if (servicePackages.queryText) {
				var queryText = servicePackages.queryText;
				obj.queryText = queryText;
			}
			return obj;
	    }
	    //条件查询
		$scope.servicePackageForm = function() {
			obj = {};
			obj=getServicePackageForm(obj);
			 /**
             * 判断如果是设备，则需判断输入字符是否为数字
             * 是则按照设备名称模糊查询转换成设备ID
             * 不是则按照设备ID来查
             */
			var reg = new RegExp("^[0-9]*$");
		    if (obj.queryType && obj.queryType == 2 && obj.queryText) {
			   if (!reg.test(obj.queryText)) {
				   var item={};
				   item.deviceName=obj.queryText
				   commonResource.getDeviceIds(item, function(data) {
					var deviceIds = data.deviceIds;
					if(deviceIds.length>0){
						obj.deviceIds = angular.toJson(deviceIds);
					}else{
						obj.deviceIds="";
					}		
					obj.queryText=null;
					$scope.dtInstance.query(obj);	                
				 });
			   }else{
				   var deviceIds=[obj.queryText];
				   obj.deviceIds = angular.toJson(deviceIds);
				   obj.queryText=null;
				   $scope.dtInstance.query(obj);
			   }				  
		    }else{
		    	$scope.dtInstance.query(obj);
		    }    
		}
		//查看
		$scope.queryServicePackage = function(item) {
			servicePackage.toAddServicePackage(item,function(data) {
								// 打开弹出框
								var modalInstance = $uibModal
										.open({
											templateUrl: omsBasicHost+'biz/servicemanage/servicepackage/query.html',
											controller : 'queryServicePackage',
											size : 'lg',
											resolve : {
												param : function() {
													return data || {};
												}
											}
										});
								// 弹窗返回值
								modalInstance.result
										.then(function(data) {
											if (data) {
												$scope.dtInstance.query(obj);
											}
										})
							});

		};
		
		// 编辑或添加
		$scope.editServicePackage = function(item) {
			servicePackage.toAddServicePackage(item,function(data) {
								// 打开弹出框
								var modalInstance = $uibModal
										.open({
											templateUrl: omsBasicHost+'biz/servicemanage/servicepackage/add.html',
											controller : 'addServicePackage',
											size : 'lg',
											resolve : {
												param : function() {									
													return data || {};
												}
											}
										});
								// 弹窗返回值
								modalInstance.result
										.then(function(data) {
											if (data) {
												$scope.dtInstance.query(obj);
											}
										})
							});

		};
		// 删除
		$scope.removeServicePackage = function(item) {
	        SweetAlertX.confirm({
	                text: "确定是否要删除"
	            }, function () {
					var object = {};
					object.id = item.id;
					servicePackage.delServicePackage(object, function(data) {
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
		};
		// 上下架
		$scope.updownServicePackage = function(item, status) {
			var updown;
			if (status == 2) {
				updown = "上架";
			}
			if (status == 3) {
				updown = "下架";
			}
	        SweetAlertX.confirm({
	                text: "确定是否要" + updown + "?"
	            }, function () {			
					var object = {};
					object.id = item.id;
					object.shelveStatus = status;
					servicePackage.updownServicePackage(object, function(data) {
						if (data.result) {
					 		SweetAlertX.alert('','操作成功','success',function(){
                                $scope.dtInstance.query(obj);
                            });
						} else {
					 		SweetAlertX.alert('','操作失败','error');
						}
					});
            	}
            );
		}
	       //导出excel
		$scope.exportServicePackage = function() {
			var obj = {};
			obj = getServicePackageForm(obj);
			/**
			 * 判断如果是设备，则需判断输入字符是否为数字 
			 * 是则按照设备名称模糊查询转换成设备ID 不是则按照设备ID来查
			 */
			var reg = new RegExp("^[0-9]*$");
			if (obj.queryType && obj.queryType == 2) {
				if (!reg.test(obj.queryText)) {
					var item = {};
					item.deviceName = obj.queryText
					commonResource.getDeviceIds(item, function(data) {
						var deviceIds = data.deviceIds;
						obj.deviceIds = angular.toJson(deviceIds);
						obj.queryText = null;
						exportExcel(obj);
					});
				} else {
					var deviceIds = [ obj.queryText ];
					obj.deviceIds = angular.toJson(deviceIds);
					obj.queryText = null;
					exportExcel(obj);
				}
			} else {
				exportExcel(obj);
			}
		}
		
	    function exportExcel(obj){
			servicePackage.exportServicePackage(obj,function(data) {
				if (data.url != null) {
					$("body").after('<a id="download"></a>');
					$("#download").attr('href', data.url);
					$("#download").attr('target', '_blank');
					var download = document.getElementById('download');
					download.click();
					$("#download").remove();
				} else {
					swal({
						title : "",
						text : "下载失败!",
						timer : 1500,
						type : "error",
						showConfirmButton : false
					});
				}
			});
	    } 
	}

	angular.module('serviceManager').controller('servicePackageList',servicePackageList);

})(angular);
