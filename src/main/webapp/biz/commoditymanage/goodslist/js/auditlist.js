(function(angular) {

	// 给下拉框赋值的公共方法
	function getSelect(data) {
		var list = [];
		for (var i = 0; i < data.length; i++) {
			list.push({
				number : i + 1,
				text : data[i]
			});
		}
		return list;
	}

	function auditListCtrl($scope,DTOptionsBuilder,commodityMng,goodsDefine,$uibModal,SweetAlertX,FileUploader,DTColumnBuilder,$filter,$compile) {
		$scope.goods={};
		var scCtrl = this;
		scCtrl.treeConfig = {
			'plugins' : [ 'types', 'dnd', 'search' ],
			'types' : {
				'default' : {
					'icon' : 'fa fa-folder'
				},
				'html' : {
					'icon' : 'fa fa-file-code-o'
				},
				'svg' : {
					'icon' : 'fa fa-file-picture-o'
				},
				'css' : {
					'icon' : 'fa fa-file-code-o'
				},
				'img' : {
					'icon' : 'fa fa-file-image-o'
				},
				'js' : {
					'icon' : 'fa fa-file-text-o'
				}

			},

			core : {
				check_callback : true
			},

			version : 1
		};
		
		scCtrl.count = false;
		
		commodityMng.getCategoryList(function(data) {
			scCtrl.categoryList = data;
		});

		scCtrl.ignoreModelChanges = function() {
			return true;
		};

		// 选择进行编辑
		scCtrl.select_node = function(e, node) {
			$scope.$apply(function() {
				$scope.goods.categoryId = node.node.id;
				$scope.goods.category = node.node.text;
				$scope.count = false;
			});
		};

		scCtrl.onkeup = function() {
			var select = $scope.goods.category;
			var jsTree = scCtrl.treeInstance.jstree(true);
			jsTree.search(select, false, true);
			$scope.count = true;
		}
		
		$scope.isPermission={};
		goodsDefine.getPermission(function(data) {
			$scope.isPermission = data.result;
			buttons = [];
			if ($scope.isPermission) {
				
				buttons.push({
					text : '审核',
					action : function(e, dt, node, config) {
						  var items = $scope.dtInstance.getSelectItems();
						  var list=[];
						  if (items.length > 0) {
							angular.forEach(items, function(date) {
								var obj = {};
								if (date.auditingStatus == 3) { // 上架审核中
									if (date.shelveStatus == 1) {
										obj.shelveStatus = 2;
									} else if (date.shelveStatus == 3) {
										obj.shelveStatus = 2;
									}
									obj.auditingStatus = 1;
								} else if (date.auditingStatus == 4) { // 下降架审核中
									obj.shelveStatus = 3;
								}
								obj.auditingStatus = 1;
								obj.id = date.id;
								list.push(obj);
								
							});
							 SweetAlertX.confirm({
								    text: "是否同意该审核申请！",
								    confirmButtonText: "同意",
								    cancelButtonText: "不同意",
								    closeOnConfirm: false,
								    closeOnCancel: false
								}, function() {
							        SweetAlertX.confirm({
							            text: "请再次确认是否要执行当前操作！",
							            closeOnConfirm: true,
							            closeOnCancel: true
							        }, function() {
						                var objList = [];
						                angular.forEach(list, function(i) {
						                    var goods = { id: i.id, auditingStatus: 1, shelveStatus: i.shelveStatus };
						                    objList.push(goods);
						                });

						                //var listJson = angular.toJson(objList);//把对象(集合)转换为json串
						                goodsDefine.updateBatchGoods(objList, function(data) {
						                    if (data.result) {
						                        var goods = { isAudit: 222 };
						                        $scope.dtInstance.query(goods);
						                    } else {
						                        SweetAlertX.alert('', '审核失败', 'error');
						                    }
						                });
							        });
							    }, function() {
							        SweetAlertX.confirm({
							            text: "请再次确认是否要执行当前操作！",
							            closeOnConfirm: true,
							            closeOnCancel: true
							        }, function() {
							            var objList = [];
							            angular.forEach(list, function(i) {
							                var goods = { id: i.id, auditingStatus: 2};
							                objList.push(goods);
							            });
							            goodsDefine.updateBatchGoods(objList, function(data) {
							                if (data.result) {
							                    var goods = { isAudit: 222 };
							                    $scope.dtInstance.query(goods);
							                } else {
							                    SweetAlertX.alert('', '审核失败', 'error');
							                }
							            });
							        });
								});
						  }
					}
				} );
			}
			
			$scope.dtOptions = DTOptionsBuilder.newOptions()
			.withButtons(buttons)
		    .withOption('select', {
		    	filter: function(item, index) {
			        if (item.auditingStatus == 3 || item.auditingStatus == 4) {
			            return true;
			        }
			        return false;
			    }
			})
	        .withFixedColumns({
	            leftColumns: 0,
	            rightColumns: 1
	        });
			var operate = (function () {
				var ops = {
					review: '<a href="javascript:;" ng-click="auditingGoods(item)">审核</a>',
					view: '<a href="javascript:;" ng-click="viewGoods(item.id)">查看</a>'
				};

				return function (e, dt, node, config) {
					var results = [];
					if ($scope.isPermission) {
						if (node.auditingStatus==3||node.auditingStatus==4) {
							results.push(ops.review);
						}
						results.push(ops.view);
					}
					return results.join('');
				};
			})();
			$scope.dtColumns = [
					DTColumnBuilder.newColumn('code').withOption('width',100).withTitle('商品编号'),
					DTColumnBuilder.newColumn('name').withOption('width',80).withOption('ellipsis',true).withTitle('商品名称'),
					DTColumnBuilder.newColumn('mallClassficationName').withOption('width',80).withTitle('商品分类'),
					DTColumnBuilder.newColumn("").withOption('width',60).withClass('text-center').withTitle('商品ICON').renderWith(operateIoc) ,
					DTColumnBuilder.newColumn('retailPrice').withOption('width',42).withTitle('零售价'),
					DTColumnBuilder.newColumn('preferentialPrice').withOption('width',42).withTitle('优惠价').renderWith(updatePreferentialPrice),
					DTColumnBuilder.newColumn('shelveStatus').withOption('width',56).withTitle('商品状态')
					.renderWith(function(e, dt, node, config) {
						return  node.shelveStatus==null?'':$scope.shelveStatus[node.shelveStatus].text;
					}),
					DTColumnBuilder.newColumn('auditingStatus').withOption('width',56).withTitle('审核状态')
					.renderWith(function(e, dt, node, config) {
						return node.auditingStatus==null?'':$scope.auditingStatus[node.auditingStatus].text;
					}),
					DTColumnBuilder.newColumn('displayed').withOption('width',56).withTitle('是否显示')
					.renderWith(function(e, dt, node, config) {
						return node.displayed==null?'':$scope.labelList[node.displayed].text ;
					}),
                	DTColumnBuilder.newColumn('recommend').withOption('width',56).withTitle('是否推荐')
                    .renderWith(function(e, dt, node, config) {
                        return node.recommend==null?'':$scope.recommendList[node.recommend].text ;
                    }),
					DTColumnBuilder.newColumn('storageQuantity').withOption('width',56).withOption('ellipsis',true).withTitle('实际库存')
                        .renderWith(function(e, dt, node, config) {
                            return node.storageQuantity==null?"不限":node.storageQuantity ;
                        }),
					DTColumnBuilder.newColumn('actualSales').withOption('width',56).withTitle('实际销量'),
					DTColumnBuilder.newColumn('actualClicks').withOption('width',84).withTitle('实际浏览次数'),
					DTColumnBuilder.newColumn('createBy').withOption('width',56).withTitle('创建人'),
					DTColumnBuilder.newColumn('createTime').withOption('width',130).withTitle('创建时间')
					.renderWith(function(e, dt, node, config) {
						return $filter('date')(node.createTime,'yyyy-MM-dd HH:mm:ss')
					}),
					DTColumnBuilder.newColumn('operation').withTitle('<div style="width: 100px;">操作</div>').withOption('width',100).withClass('link-group').renderWith(operate) 
					];
		
			function operateIoc(e, dt, item, config){
				var result;
				var url = '';
				angular.forEach(item.mallGoodsImages, function(data) {
					if(data.icon){
						if(data.imgType == 1){
							url=data.uri;
						}
						 result='<img lazy-src="'+url+'" class="img-xs" />';
					}
				});
				return result;
			}
			function updatePreferentialPrice(e,dt, item, config){
				if(item.preferentialPrice==0||item.preferentialPrice==0.00){
					return "";
				}else{
					return item.preferentialPrice;
				}
			}

			$scope.dtSelect = {
		            showFilter: function(item, index) {
		            	if (item.auditingStatus==3||item.auditingStatus==4) {
		            	  return true;
		            	}
		            	 return false;
		            }
		        }
			 
		        $scope.dtInstance = {
		            serverData: function(param){
		            	angular.extend(param,{isAudit:333});
		            	return goodsDefine.getGoodsList(param);
		            }
		        };
		});
		
		
		//获取线下销售渠道
		goodsDefine.getOfflineSalesChannels(function(data) {
			$scope.offlinesaleschannels = data;
		});
		
		

		$scope.conditions = {
			daterange : '',
			conditionQuery : '支持按服务编号、服务名称模糊摸索'
		};

	

		

		// 商品状态下拉框
		$scope.shelveStatus = [ {
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
		
		
		//商品审核状态下拉框
		$scope.auditingStatus = [ {
			number : '0',
			text : '全部'
		}, {
			number : '1',
			text : '审核成功'
		}, {
			number : '2',
			text : '审核失败'
		}, {
			number : '3',
			text : '上架审核中'
		},{
			number : '4',
			text : '下架审核中'
		} ];


        //推荐状态下拉框
        $scope.recommendList = [

            {
                number : '0',
                text : '否'
            }, {
                number : '1',
                text : '是'
            } ];

        //商品状态下拉框
		$scope.labelList = [

		{
			number : '0',
			text : '否'
		}, {
			number : '1',
			text : '是'
		} ];
		
		$scope.select = {
				select_all: false
		}

	    $scope.getGoodsList = [];
		$scope.auditForm = function() {
			var obj = {};
			var goods = $scope.goods;
			if (goods.createTime&& goods.createTime.startDate&& goods.createTime.endDate){
				var startTime = goods.createTime.startDate.format('YYYY-MM-DD');
				var endTime = goods.createTime.endDate.format('YYYY-MM-DD');
				obj.startTime = startTime;
				obj.endTime = endTime;
			}
			
		/*	//分类
			if (goods.categoryId) {
				obj.mallClassficationId = goods.categoryId;
			}*/
			
			//分类
			if (goods.category && goods.category.id && goods.category.text) {
				obj.mallClassficationId = goods.category.id;
            }
			
			//线下销售渠道
			if (goods.offlinesaleschannels&&goods.offlinesaleschannels.conf_id!=0) {
				var salesChannelsId = goods.offlinesaleschannels.conf_id;
				var salesChannels = goods.offlinesaleschannels.conf_value;
				obj.salesChannelsId = salesChannelsId;
				obj.salesChannels = salesChannels;
			}
			
		
			//审核状态
			if (goods.auditingStatus&&goods.auditingStatus.number!=0) {
				var status = goods.auditingStatus.number;
				obj.auditingStatus = status;
			}
			
			//条件查询
			if (goods.queryText) {
				var queryText = goods.queryText;
				obj.queryText = queryText;
			}
			   obj.isAudit="333";
			   $scope.dtInstance.query(obj);
		}
		
		  // 添加
		$scope.viewGoods = function(id) {
		 // 打开弹出框
			var modalInstance = $uibModal.open({
				templateUrl: omsBasicHost+'biz/commoditymanage/goodslist/viewgoods.html',
				controller : 'viewCtrl',
				size: 'lg',
				resolve : {
					param : function() {
						return  {
							id:id,
							labelList:$scope.labelList,
                            recommendList:$scope.recommendList
						};
					}
				}
			});
			// 弹窗返回值
			modalInstance.result.then(function(data) {
				if (data) {
					 $scope.dtInstance.query(obj);
				}
			})

		}
		$scope.auditingGoods = function(item,status) {
	        SweetAlertX.confirm({
	                text: "是否同意该审核申请！",
	                confirmButtonText: "同意",
	                cancelButtonText: "不同意",
	                closeOnConfirm: false,
	                closeOnCancel: false 
	            }, function () {
        	        SweetAlertX.confirm({
        	                text: "请再次确认是否要执行当前操作！",
        	                closeOnConfirm: true,
        	                closeOnCancel: true 
        	            }, function() {
						    var obj = {};
					        if (item.auditingStatus == 3) { // 上架审核中
					            if (item.shelveStatus == 1) {
					                obj.shelveStatus = 2;
					            } else if (item.shelveStatus == 3) {
					                obj.shelveStatus = 2;
					            }
					            obj.auditingStatus = 1;
					        } else if (item.auditingStatus == 4) { // 下降架审核中
					            obj.shelveStatus = 3;
					        }
					        obj.auditingStatus = 1;
					        obj.id = item.id;
					        goodsDefine.updateAuditing(obj, function(data) {
					            if (data.result) {
					                var goods = { isAudit: 222 };
					                $scope.dtInstance.query(goods);
					            } else {
					                SweetAlertX.alert('', '审核失败', 'error');
					            }
					        });
						});
                }, function ()  {
                	SweetAlertX.confirm({
      	                text: "请再次确认是否要执行当前操作！",
      	                closeOnConfirm: true,
      	                closeOnCancel: true 
      	            }, function () {
      	               var obj={};
  	                	obj.auditingStatus=2;
  	                	obj.id=item.id;
  	                	goodsDefine.updateAuditing(obj, function(data) {
  	        				if (data.result) {
  	        					var goods={isAudit:222};
  	        					 $scope.dtInstance.query(goods);
        				} else {
							SweetAlertX.alert('','审核失败','error');    	        				}
  	        			});	
      	            });
                });
	    };
		
		 $scope.checked = [];
	}

	// 弹窗controller
	function viewCtrl($scope, $uibModalInstance,goodsDefine,commodityMng,param,$uibModal,FileUploader) {
		
		// 商品状态下拉框
		$scope.types = [
		{
			number : '0',
			text : '请选择'
		}, 
		{
			number : '1',
			text : '服务'
		}, 
		{
			number : '2',
			text : '服务套餐'
		} ];
		
		if (param.id != null) {
			goodsDefine.getGoods({
				id : param.id
			}, function(date) {
				$scope.goodsData=date;
				$scope.goodsData.offlinesaleschannels={conf_id:date.salesChannelsId,conf_value:date.salesChannels};
				$scope.goodsData.displayed={number:date.displayed,text:date.displayed==1?"是":"否"};
                $scope.goodsData.recommend={number:date.recommend,text:date.recommend==1?"是":"否"};
				$scope.goodsData.category={id:date.mallClassficationId};
				goodsDefine.findServicePackage({id : date.productId,type:date.productType}, function(v) {
					$scope.goodsData.packageValue = {productId : v.id,name : v.name,productType : v.type};
					});
				$scope.imageSrc1=date.ionc1;
				$scope.imageSrc2=date.ionc2;
				$scope.imageSrc3=date.ionc3;
				$scope.addImg=date.pic || [];
			});
		}
		$scope.state=param.state;
		$scope.labelList=param.labelList;
        $scope.recommendList=param.recommendList;
		goodsDefine.getOfflineSalesChannels(function(data) {
			$scope.offlinesaleschannels =data;
		});
		
		commodityMng.getCategoryList(function(data) {
			$scope.categoryList = data;
		});
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}
		
	

		


	
	
	
	angular.module('commoditymanage').controller('auditListCtrl',auditListCtrl).controller('viewCtrl',viewCtrl);
})(angular);
