(function(angular) {

    function serviceDefineList($scope, DTOptionsBuilder, serviceDefine, serviceCommon, commonResource,SweetAlertX,
        serviceCategory, label, $compile, $uibModal, DTColumnBuilder) {
        var obj = {};
        $scope.dtInstance = {
            serverData: serviceDefine.getServiceList
        };
        $scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10)
            .withButtons([{
                text: '添加服务',
                action: function(e, dt, node, config) {
                    $scope.editService();
                }
            },{
                text: '导出excel',
                action: function(e, dt, node, config) {
                     $scope.exportService();
                }
            }])
            .withFixedColumns({
                leftColumns: 0,
                rightColumns: 1
            });

        var render = (function() {
            var ops = {
                query:'<a href="javascript:;" class="text-info" ng-click="queryService(item)">查看</a>',
            	edit: '<a href="javascript:;" class="text-info" ng-click="editService(item)">编辑</a>',
                remove: '<a href="javascript:;" class="text-danger" ng-click="removeService(item)">删除</a>',
                on: '<a href="javascript:;" ng-click="updownService(item,2)">上架</a>',
                off: '<a href="javascript:;" ng-click="updownService(item,3)">下架</a>'
            };

            return function(e, dt, node, config) {
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
            DTColumnBuilder.newColumn('id').withOption('width', 80).withTitle('服务编号'),
            DTColumnBuilder.newColumn('name').withOption('width', 100).withOption('ellipsis',true).withTitle('服务名称'),
            DTColumnBuilder.newColumn('serviceClassficationName').withOption('width', 80).withOption('ellipsis',true).withTitle('分类'),
            DTColumnBuilder.newColumn('').withOption('width', 56).withTitle('计费方式').renderWith(type),
            DTColumnBuilder.newColumn('supplierName').withOption('width', 150).withOption('ellipsis',true).withTitle('供应商'),
            DTColumnBuilder.newColumn('serviceTagName').withOption('width', 80).withOption('ellipsis',true).withTitle('标签'),
            DTColumnBuilder.newColumn('shelveStatus').withOption('width', 50).withTitle('状态').renderWith(statusRender),
            DTColumnBuilder.newColumn('createBy').withOption('width', 50).withTitle('创建人'),
            DTColumnBuilder.newColumn('createTime').withOption('width', 130).withTitle('创建时间'),
            DTColumnBuilder.newColumn('').withTitle('<div style="width: 150px;">操作</div>').withOption('width', 150).withClass('link-group').renderWith(render)
        ];

        function type(e, dt, node, config) {
        	var quantity="";
        	var validityPeriod="";      	
        	//数量
        	if(node.quantityUnit && node.quantityUnit != null){
        		quantity=node.quantity+node.quantityUnit;
        	}
        	//有效期
        	if(node.validityPeriodUnit && node.validityPeriodUnit != null){
        		if(node.validityPeriodUnit=='forever'){
        			validityPeriod='永久有效';
        		}
        		if(node.validityPeriodUnit=='year'){
        			validityPeriod=node.validityPeriod+'年';
        		}
        		if(node.validityPeriodUnit=='month'){
        			validityPeriod=node.validityPeriod+'月';
        		}
        	}
        	if(quantity!=""&&validityPeriod!=""){
        		return quantity+'/'+validityPeriod;
        	}else{
        		return validityPeriod;
        	}
            
        }

        function statusRender(e, dt, node, config) {
            return serviceCommon.getBoxSelect(node.shelveStatus, $scope.status, 'number').text;
        }

        serviceDefine.getServiceList(function(data) {
            $scope.serviceList = data.serviceDefineList;
            // 条件查询中的字段
            $scope.service = {};
            // 展示条件查询中的标签选项
            var labelList = serviceCommon.getAllSelect();
            var labels = {};
            labels.type = 1;
            label.getServiceList(labels, function(result) {
                for (var i = 0; i < result.data.length; i++) {
                    labelList.push({
                        number: result.data[i].id,
                        text: result.data[i].name
                    });
                }
                $scope.label = labelList;
            });
            // 展示条件查询中的供应商选项
            var supplierList = serviceCommon.getAllSelect();
            for (var i = 0; i < data.supplierList.length; i++) {
                supplierList.push({
                    number: data.supplierList[i].merchantId,
                    text: data.supplierList[i].merchantName
                });
            }
            $scope.supplier = supplierList;
            
            $scope.service.queryType=$scope.queryType[0];
        });
        // 分类下拉框以目录树的形式展示
        serviceCategory.getCategoryList(function(data) {
            $scope.treeDatalist = data;
        });

        // 状态下拉框
        $scope.status = [{
            number: '0',
            text: '全部'
        }, {
            number: '1',
            text: '草稿'
        }, {
            number: '2',
            text: '已上架'
        }, {
            number: '3',
            text: '已下架'
        }];
        
        $scope.queryType = [{
            number: '1',
            text: '服务'
        }, {
            number: '2',
            text: '设备'
        }]
        // 获取查询条件用于查询和导出excel用
        function getServiceForm(obj){   
            var service = $scope.service;
            if (service.createTime && service.createTime.startDate && service.createTime.endDate) {
                var startTime = service.createTime.startDate
                    .format('YYYY-MM-DD 00:00:00');
                var endTime = service.createTime.endDate
                    .format('YYYY-MM-DD 23:59:59');
                obj.startTime = startTime;
                obj.endTime = endTime;
            }
            // 分类
            if (service.serviceClassfication && service.serviceClassfication.id && service.serviceClassfication.text) {
                var serviceClassficationId = service.serviceClassfication.id;
                var serviceClassficationName = service.serviceClassfication.text;
                obj.serviceClassficationId = serviceClassficationId;
                obj.serviceClassficationName = serviceClassficationName;
            }
            // 供应商
            if (service.supplier&&service.supplier.number!=0) {
                var supplierId = service.supplier.number;
                var supplierName = service.supplier.text;
                obj.supplierId = supplierId;
                obj.supplierName = supplierName;
            }
            // 状态
            if (service.shelveStatus&&service.shelveStatus.number!=0) {
                var shelveStatus = service.shelveStatus.number;
                obj.shelveStatus = shelveStatus;
            }
            // 标签
            if (service.serviceTag&&service.serviceTag.number!=0) {
                var serviceTagId = service.serviceTag.number;
                var serviceTagName = service.serviceTag.text;
                obj.serviceTagId = serviceTagId;
                obj.serviceTagName = serviceTagName;
            }
            // 条件查询
            if(service.queryType){
            	var queryType=service.queryType.number;
            	obj.queryType=queryType;
            }
            if (service.queryText) {
                var queryText = service.queryText;
                obj.queryText = queryText;
            }
            return obj;
        }
        //条件查询
        $scope.serviceForm = function() {
                var obj={};
                obj=getServiceForm(obj);
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
        // 查看
        $scope.queryService = function(item) {
                serviceDefine.toAddService(item, function(data) {
                    // 打开弹出框
                    var modalInstance = $uibModal.open({
                        templateUrl: omsBasicHost+'biz/servicemanage/servicedefine/query.html',
                        controller: 'queryServiceDefine',
                        size : 'lg',
                        resolve: {
                            param: function() {
                                return data || {};
                            }
                        }
                    });
                    // 弹窗返回值
                    modalInstance.result.then(function(data) {
                        if (data) {
                            $scope.dtInstance.query(obj);
                        }
                    })
                });

            }
            // 编辑或添加
        $scope.editService = function(item) {
                serviceDefine.toAddService(item, function(data) {
                    // 打开弹出框
                    var modalInstance = $uibModal.open({
                        templateUrl: omsBasicHost+'biz/servicemanage/servicedefine/add.html',
                        controller: 'addServiceDefine',
                        size : 'lg',
                        resolve: {
                            param: function() {
                                return data || {};
                            }
                        }
                    });
                    // 弹窗返回值
                    modalInstance.result.then(function(data) {
                        if (data) {
                            $scope.dtInstance.query(obj);
                        }
                    })
                });

            }
            // 删除
        $scope.removeService = function(item) {
            SweetAlertX.confirm({
                    text: "确定是否要删除"
                }, function () {
                    var object = {};
                    object.id = item.id;
                    serviceDefine.delService(object, function(data) {
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
        $scope.updownService = function(item, status) {
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
                    serviceDefine.updownService(object, function(data) {
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
	   $scope.exportService = function() {
		    var obj={};
            obj=getServiceForm(obj);
            /**
			 * 判断如果是设备，则需判断输入字符是否为数字 
			 * 是则按照设备名称模糊查询转换成设备ID 不是则按照设备ID来查
			 */
            var reg = new RegExp("^[0-9]*$");
		    if (obj.queryType && obj.queryType == 2) {
			   if (!reg.test(obj.queryText)) {
				   var item={};
				   item.deviceName=obj.queryText
				   commonResource.getDeviceIds(item, function(data) {
					var deviceIds = data.deviceIds;
					obj.deviceIds = angular.toJson(deviceIds);
					obj.queryText=null;
					exportExcel(obj);              
				 });
			   }else{
				   var deviceIds=[obj.queryText];
				   obj.deviceIds = angular.toJson(deviceIds);
				   obj.queryText=null;
				   exportExcel(obj);
			   }				  
		    }else{
		    	exportExcel(obj);
		    }                                
		}
	    function exportExcel(obj){
			serviceDefine.exportService(obj,function(data) {
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

    angular.module('serviceManager').controller('serviceDefineList',
        serviceDefineList);

})(angular);
