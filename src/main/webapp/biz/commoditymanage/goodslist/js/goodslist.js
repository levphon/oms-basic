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
	
	function goodsListCtrl($scope,DTOptionsBuilder,commodityMng,goodsDefine,commonResource,$uibModal,$q,SweetAlertX,FileUploader,DTColumnBuilder,$filter,$compile) {
		$scope.goods={};
		var scCtrl = this;
		var obj;
		$scope.dtInstance = {};
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
		
		//获取线下销售渠道
		goodsDefine.getOfflineSalesChannels(function(data) {
			$scope.offlinesaleschannels = data;
		});
		$scope.checked = [];
		
		//查询条件下拉框
		$scope.queryType = [{
	            number: '1',
	            text: '商品'
	       }, {
	            number: '2',
	            text: '设备'
	    }]
		//查询条件下拉框默认是商品
		$scope.goods.queryType=$scope.queryType[0];
		
		$scope.dtOptions = DTOptionsBuilder.newOptions()
		.withButtons([{
			text : '导出EXCEL',
			action : function(e, dt, node, config) {
				$scope.exportGoods();
				}
			},{
			text : '添加商品',
			action : function(e, dt, node, config) {
				$scope.addGoods();
				}
			},
			{
			text : '上架',
			action : function(e, dt, node, config) {

	            var items = $scope.dtInstance.getSelectItems();
	            
				if (items.length > 0) {
					var ids = items.map(function(item){
						return item.id;
					});
					$scope.updownGoods(ids, 3);
				}
			}
		}])
		.withOption('select', {
			filter: function(item, index) {
	        	if (item.shelveStatus==1) {
	        		if(item.auditingStatus==null||item.auditingStatus==2)	{
	        			return true;
	        		}
	        	}else if(item.shelveStatus==3){
	        		if(item.auditingStatus==1||item.auditingStatus==2){
	        			return true;
	        		}
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
				on:    '<a href="javascript:;"   ng-click="auditingGoods(item,3)">上架</a>',
				off:   '<a href="javascript:;"  ng-click="auditingGoods(item,4)">下架</a>',
				edit:  '<a href="javascript:;"   class="text-info" ng-click="editGoods(item.id,0)">编辑</a>',
				remove:'<a href="javascript:;" class="text-danger" ng-click="remove(item.id)">删除</a>',
				show:  '<a href="javascript:;" ng-click="show(item)">显示</a>',
				view:  '<a href="javascript:;" ng-click="viewGoods(item.id)">查看</a>',
				hide:  '<a href="javascript:;" ng-click="hide(item)">隐藏</a>',
                shelveEdit: '<a href="javascript:;" class="text-info" ng-click="editGoods(item.id,1)">编辑</a>'
			};

			return function (e, dt, node, config) {
				var results = [];
				if (node.shelveStatus==1) {
					if (node.auditingStatus==null||node.auditingStatus==2) {
						results.push(ops.on);
						results.push(ops.edit);
						results.push(ops.remove);
					}
					if(node.auditingStatus==3){
						results.push(ops.view);
					}
				}
				if (node.shelveStatus==2) {
					if (node.auditingStatus==1||node.auditingStatus==2) {
						results.push(ops.off);
						results.push(ops.view);
						if(node.displayed==1){
							results.push(ops.hide);
						}else{
							results.push(ops.show);
						}
					}
					if (node.auditingStatus==4) {
						results.push(ops.view);
					}
				}
				if (node.shelveStatus==3) {
					//审核状态  1 成功， 2 失败,3上架审核中，4下降审核中
					if (node.auditingStatus==3) {
						results.push(ops.view);
					}
					if (node.auditingStatus==1||node.auditingStatus==2) {
						results.push(ops.on);
						results.push(ops.view);
					}


                    results.push(ops.shelveEdit);


				}
			/*	if (node.displayed==2) {
					results.push(ops.show);
				}*/
				return results.join('');
			};
		})();
		$scope.dtColumns = [
				DTColumnBuilder.newColumn('code').withOption('width',100).withTitle('商品编号'),
				DTColumnBuilder.newColumn('name').withOption('width',80).withOption('ellipsis',true).withTitle('商品名称'),
				DTColumnBuilder.newColumn('mallClassficationName').withOption('width',80).withOption('ellipsis',true).withTitle('商品分类'),
			    DTColumnBuilder.newColumn("").withOption('width',60).withClass('text-center').withTitle('商品ICON').renderWith(operateIoc),
				DTColumnBuilder.newColumn('retailPrice').withOption('width',42).withTitle('零售价'),
				DTColumnBuilder.newColumn('preferentialPrice').withOption('width',42).withTitle('优惠价').renderWith(updatePreferentialPrice),
				DTColumnBuilder.newColumn('shelveStatus').withOption('width',72).withTitle('商品状态')
				.renderWith(function(e, dt, node, config) {
					return  node.shelveStatus==null?'':$scope.shelveStatus[node.shelveStatus].text;
				}),
				DTColumnBuilder.newColumn('auditingStatus').withOption('width',72).withTitle('审核状态')
				.renderWith(function(e, dt, node, config)  {
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
				DTColumnBuilder.newColumn('createBy').withOption('width',42).withTitle('创建人'),
				DTColumnBuilder.newColumn('createTime').withOption('width',130).withTitle('创建时间')
				.renderWith(function(e, dt, node, config) {
					return $filter('date')(node.createTime,'yyyy-MM-dd HH:mm:ss')
				}),
				DTColumnBuilder.newColumn('operation').withOption('width',150).withTitle('<div style="width: 150px;">操作</div>').withClass('link-group').renderWith(operate) 
				];
	
		function operateIoc(e,dt, item, config){
			var result = '';
			var url = '';
			angular.forEach(item.mallGoodsImages, function(data) {
				if(data.icon){
					if(data.imgType == 1){
						url = data.uri;
					}
					result = '<img lazy-src="'+url+'" class="img-xs" />';
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
	        $scope.dtInstance = {
	            serverData: function(param){
	            	return goodsDefine.getGoodsList(param);
	            }
	        };
		
		$scope.updownGoods = function(item,status) {
	        SweetAlertX.confirm({
	                text: "请再次确认是否要执行当前操作！",
	                confirmButtonText: "确认",
	                cancelButtonText: "取消"
	            }, function () {
            		goodsDefine.auditingGoods({ids:item,status:status}, function(data) {
        				if (data.result) {
        					SweetAlertX.alert('','操作成功','success',function(){
        						var obj = {};
            		            $scope.dtInstance.query(obj);
        					});
        				
        				} else {
							SweetAlertX.alert('','操作失败','error');
        				}
        			});	
	            });
	        
	        $scope.checked = [];
	    };

		//导出商品
		$scope.exportGoods = function() {
			var obj = {};
			obj = getGoodsForm(obj);
			/**
			 * 判断如果是设备，则需判断输入字符是否为数字 
			 * 是则按照设备名称模糊查询转换成设备ID 不是则按照设备ID来查
			 */
			var reg = new RegExp("^[0-9]*$");
			if (obj.queryType && obj.queryType == 2 && obj.queryText) {
				if (!reg.test(obj.queryText)) {
					var item = {};
					item.deviceName = obj.queryText
					commonResource.getDeviceIds(item, function(data) {
						var deviceIds = data.deviceIds;
						if (deviceIds.length > 0) {
							obj.deviceIds = angular.toJson(deviceIds);
						} else {
							obj.deviceIds = "";
						}
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
		

		function exportExcel(obj) {
			goodsDefine.exportGoods(obj, function(data) {
				// Console.log(data);
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
		//商品状态下拉框
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
                number :'0',
                text : '否'
            }, {
                number :'1',
                text : '是'
            } ];
		
		//商品状态下拉框
		$scope.labelList = [
		{
			number :'0',
			text : '否'
		}, {
			number :'1',
			text : '是'
		} ];
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

	    function getGoodsForm(obj){
	    	var goods = $scope.goods;
			if (goods.createTime&& goods.createTime.startDate&& goods.createTime.endDate){
				var startTime = goods.createTime.startDate.format('YYYY-MM-DD');
				var endTime = goods.createTime.endDate.format('YYYY-MM-DD');
				obj.startTime = startTime;
				obj.endTime = endTime;
			}
			
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
		
			//商品状态
			if (goods.shelveStatus&&goods.shelveStatus.number!=0) {
				var status = goods.shelveStatus.number;
				obj.shelveStatus = status;
			}
			
			//审核状态
			if (goods.auditingStatus&&goods.auditingStatus.number!=0) {
				var status = goods.auditingStatus.number;
				obj.auditingStatus = status;
			}
			//卡名称
			if(goods.cardName&&goods.cardName.number!=''){
				var cardName=goods.cardName.number;
				obj.cardName=cardName;
			}
			//条件查询
			if(goods.queryType){
             	var queryType=goods.queryType.number;
             	obj.queryType=queryType;
            }
			if (goods.queryText) {
				var queryText = goods.queryText;
				obj.queryText = queryText;
			}
	    	return obj;
	    }
		//条件查询
		$scope.goodsForm = function() {
			obj = {};
			obj=getGoodsForm(obj);
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
		
		  // 添加
		$scope.addGoods = function(id,state) {
		 // 打开弹出框
			var modalInstance = $uibModal.open({
				templateUrl: omsBasicHost+'biz/commoditymanage/goodslist/addgoods.html',
				controller : 'addGoodsDefine',
				size: 'lg',
				resolve : {
					param : function() {
						return  {
							id:id,
							state:state,
							labelList:$scope.labelList,
                            recommendList:$scope.recommendList
						};
					}
				}
			});
			modalInstance.result.then(function(data) {
		            $scope.dtInstance.query({});
				})
		}
		
		//查看
		
		$scope.viewGoods = function(id) {
			 // 打开弹出框
				var modalInstance = $uibModal.open({
					templateUrl: omsBasicHost+'biz/commoditymanage/goodslist/viewgoods.html',
					controller : 'addGoodsDefine',
					size: 'lg',
					resolve : {
						param : function() {
							return  {
								id:id,
								labelList:$scope.labelList,
                                recommendListL:$scope.recommendList
							};
						}
					}
				});
				modalInstance.result.then(function(data) {
			            $scope.dtInstance.query({});
					})
			}
		
		  // 编辑
		$scope.editGoods = function(id,state) {
		 // 打开弹出框
			var modalInstance = $uibModal.open({
				templateUrl: omsBasicHost+'biz/commoditymanage/goodslist/editgoods.html',
				controller : 'editGoodsDefine',
				size: 'lg',
				resolve : {
					param : function() {
						return  {
							id:id,
                            state:state
						};
					}
				}
			});
			// 弹窗返回值
			modalInstance.result.then(function(data) {
	            $scope.dtInstance.query({});
			})
		}
		
		var obj={};
		$scope.show = function(item) {
			obj.displayed =1;
			obj.recommend =1;
			obj.id = item.id;
			goodsDefine.isShow(obj, function(data) {
				if (data.result) {
		            $scope.dtInstance.query({});
				} else {
					 SweetAlertX.alert("","操作失败!", "error");
				}
			});
		}
		
		$scope.hide = function(item) {
			obj.displayed =0;
			obj.recommend =0;
			obj.id = item.id;
			goodsDefine.isShow(obj, function(data) {
				if (data.result) {
		            $scope.dtInstance.query({});
				} else {
					 SweetAlertX.alert("","操作失败!", "error");
				}
			});
		}
		// 删除
		$scope.remove = function(id) {
			SweetAlertX.confirm({
                text: "确定是否要删除"
            }, function () {
            	goodsDefine.delGoods({id:id}, function(data) {
    				if (data.result) {
    					 SweetAlertX.alert("","删除成功!", "success",function(){
    						 $scope.dtInstance.query({});
     					});
    				} else {
    					 SweetAlertX.alert("","删除失败!", "error");
    				}
    			});	
        	}
        );
		}
		//审核状态
		$scope.auditingGoods = function(item,status) {
			var array = new Array(); 
			array[0]=item.id;
			$scope.updownGoods(array,status);
		}
	}
	
	
	// 弹窗controller
	function addGoodsDefine($scope, $uibModalInstance,goodsDefine,commodityMng,param,$q,$uibModal,FileUploader,fileService,SweetAlertX) {
		$scope.goodsData={};
		var uploaderResume1 = $scope.uploaderResume1 = new FileUploader({
             url: omsBasicHost+"goods/addPhoto?type=1&jsessionid="+jsessionid,
             queueLimit: 1,     //文件个数 
             autoUpload: true,  //添加后，自动上传
             removeAfterUpload: true,
         });
         //
		$scope.goodsData.displayed = {number:1,text:"是"};
        $scope.goodsData.recommend = {number:1,text:"是"};
		uploaderResume1.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                if('|jpg|png|jpeg|gif|'.indexOf(type) !== -1){
                	return true;
               }else{
            	   	SweetAlertX.alert('','图片格式不正确','warning');
            	 	return false;
               }
            }
        });

         //
         $scope.uploaderResume1.onBeforeUploadItem = function (fileItem) {
            	 var size=fileItem.file.size/1024;
            	 if(size>80){
            		 $scope.uploaderResume1.cancelItem(fileItem) ;
            		// this.removeFromQueue(item);
            		 SweetAlertX.alert('',"大小超过80k范围不能上传!", "warning");
            		 
            	 }
        	
         };
         //
         $scope.uploaderResume1.onCompleteItem = function (fileItem, response, status, headers) {
             if (status == "200") {
            	 if(response!='1'){
            		 $scope.imageSrc1 = response;
            	 }else{
            		 SweetAlertX.alert('',"上传图片的分辨率有问题!", "warning");
            		
            	 }
             }
         };
         
         //第二张图片
         var uploaderResume2 = $scope.uploaderResume2 = new FileUploader({
             url: omsBasicHost+"goods/addPhoto?type=5&jsessionid="+jsessionid,
             queueLimit: 1,     //文件个数 
             autoUpload: true,  //添加后，自动上传
             removeAfterUpload: true,
         });
		 
		uploaderResume2.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                if('|jpg|png|jpeg|gif|'.indexOf(type) !== -1){
                	return true;
               }else{
            	   	SweetAlertX.alert('','图片格式不正确','warning');
            	 	return false;
               }
            }
        });

         //
         $scope.uploaderResume2.onBeforeUploadItem = function (fileItem) {
            	 var size=fileItem.file.size/1024;
            	 if(size>80){
            		 $scope.uploaderResume2.cancelItem(fileItem) ;
            		// this.removeFromQueue(item);
            		 SweetAlertX.alert('',"大小超过80k范围不能上传!", "warning");
            		 
            	 }
        	
         };
         //
         $scope.uploaderResume2.onCompleteItem = function (fileItem, response, status, headers) {
             if (status == "200") {
            	 if(response!='1'){
            		 $scope.imageSrc2 = response;
            	 }else{
            		 SweetAlertX.alert('',"上传图片的分辨率有问题!", "warning");
            		
            	 }
             }
         };
         
       //第三张图片
         var uploaderResume3 = $scope.uploaderResume3 = new FileUploader({
             url: omsBasicHost+"goods/addPhoto?type=6&jsessionid="+jsessionid,
             queueLimit: 1,     //文件个数 
             autoUpload: true,  //添加后，自动上传
             removeAfterUpload: true,
         });
		 
		uploaderResume3.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                if('|jpg|png|jpeg|gif|'.indexOf(type) !== -1){
                	return true;
               }else{
            	   	SweetAlertX.alert('','图片格式不正确','warning');
            	 	return false;
               }
            }
        });

         //
         $scope.uploaderResume3.onBeforeUploadItem = function (fileItem) {
            	 var size=fileItem.file.size/1024;
            	 if(size>80){
            		 $scope.uploaderResume3.cancelItem(fileItem) ;
            		// this.removeFromQueue(item);
            		 SweetAlertX.alert('',"大小超过80k范围不能上传!", "warning");
            		 
            	 }
        	
         };
         //
         $scope.uploaderResume3.onCompleteItem = function (fileItem, response, status, headers) {
             if (status == "200") {
            	 if(response!='1'){
            		 $scope.imageSrc3 = response;
            	 }else{
            		 SweetAlertX.alert('',"上传图片的分辨率有问题!", "warning");
            		
            	 }
             }
         };
		
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
					$scope.goodsData.packageValue = {productId:v.id,name:v.name,productType:v.type-1};
					});

				//查看的三张图片
				$scope.imageSrc1=date.ionc1;
				$scope.imageSrc2=date.ionc2;
				$scope.imageSrc3=date.ionc3;
				$scope.addImg=date.pic || [];
				$scope.goodsData.packageValue={};
				$scope.uploaderPhotos.AllowAdd =false; 
				
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
		

		$scope.types = [  {
			number : '0',
			text : '服务'
		}, {
			number : '1',
			text : '服务套餐'
		} ];
		

	 // 校验服务名称是否重复
		$scope.asyncCallback = function(value) {
			var obj = {};
			obj.name = value;
			return goodsDefine.existsByName(obj);
		}


        $scope.imageUpload = function(files) {
			var timestamp = new Date().getTime();
			var uploadFiles = new FormData();
			//uploadFiles.append("uploadFiles", files);
			uploadFiles.append('file',files[0]);
			$.ajax({
		        data: uploadFiles,
		        type: "POST",
		        url: omsBasicHost+"goods/addPhoto?type=4&jsessionid="+jsessionid,
		        cache: false,
		        contentType: false,
		        processData: false,
		        success: function(imageUrl) {
		        	 $('#wjy').summernote('insertImage',imageUrl,'img');
		        },
		        error: function() {
		            console.log("uploadError");
		        }
			})
		};
		
		$scope.ok = function(status) {
			if ($scope.add_goods_form.$valid) {
			var obj = {};
			var goods = $scope.goodsData;
			//获取服务名称
			obj=goods;
			//获取选中的分类goodsData.category
			if (goods.category) {
				var mallClassficationId = goods.category.id;
				obj.mallClassficationId = mallClassficationId;
			}
		
			if (goods.offlinesaleschannels&&goods.offlinesaleschannels.conf_id!=0) {
				var salesChannelsId = goods.offlinesaleschannels.conf_id;
				var salesChannels = goods.offlinesaleschannels.conf_value;
				obj.salesChannelsId = salesChannelsId;
				obj.salesChannels = salesChannels;
			}
			
			/*//获取选中是否显示
			if (goods.displayed&& goods.displayed.number!=0) {*/
				var displayed = goods.displayed.number;
				obj.displayed = displayed;
				var recommend = goods.recommend.number;
				obj.recommend = recommend;
			/*}else {
				SweetAlertX.alert('',"请从新选择", "warning");
				return false;
			}*/
			if (goods.packageValue) {
				obj.productId=goods.packageValue.productId;
				obj.productType=goods.packageValue.productType+1;
			}
			//存草稿或者是上架
			if(status==2){  //表示商家此时商品状态还是草稿审核的状态是上架审核中
				obj.shelveStatus=1;
				obj.auditingStatus=3;
			}else{
				obj.shelveStatus=status; 
			}
			
			
			//获取选中是否显示
			if ($scope.imageSrc1) {
				obj.ionc1 = $scope.imageSrc1;
			}
			if ($scope.imageSrc2) {
				obj.ionc2 = $scope.imageSrc2;
			}
			if ($scope.imageSrc3) {
				obj.ionc3 = $scope.imageSrc3;
			}
			
			
			//获取选中是否显示
			if ($scope.addImg) {
				obj.pic = $scope.addImg;
			}
			
			goodsDefine.addGoods(obj,function(data) {
				if (data.result) {
					SweetAlertX.alert("","操作成功!", "success",function(){
						$uibModalInstance.close(data);
					});
					
				} else {
					 SweetAlertX.alert("","操作失败!", "error");
				}
			});
			}else{
				$scope.add_goods_form.submitted = true;
			}

		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		$scope.deletepackage = function() {
			$scope.goodsData.packageValue=null;
		};
		
		
		
		
		 var uploaderPhotos = $scope.uploaderPhotos = new FileUploader({
			    url: omsBasicHost+"goods/addPhoto?type=2&jsessionid="+jsessionid,
			    queueLimit:4,
			    autoUpload: true,//添加后，自动上传
         });
		 

		 uploaderPhotos.filters.push({
	            name: 'imageFilter',
	            fn: function(item /*{File|FileLikeObject}*/, options) {
	                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
	                if('|jpg|png|jpeg|gif|'.indexOf(type) !== -1){
	                	return true;
	               }else{
	            	   	SweetAlertX.alert('','图片格式不正确','warning');
	            	 	return false;
	               }
	            }
	        });

		 
		 //自己添加的，用于限制上传数量
         $scope.uploaderPhotos.AllowAdd = true;  
         
        $scope.addImg=[];
         
        
         
         //自己添加的，用于在移除图片时，重新计算
         $scope.uploaderPhotos.funcRemoveItem = function (index) {
        	 $scope.addImg.splice(index,1);
             this.AllowAdd = ($scope.addImg.length < 4);
             this.queue.splice(index,1)
         };
         
         //上传控件：回调响应：
         $scope.uploaderPhotos.onBeforeUploadItem = function (item) {
        	 var size=item.file.size/1024;
        	 if(size>200){
        		 $scope.uploaderPhotos.cancelItem(item) ; 
        		 this.removeFromQueue(item);
				 SweetAlertX.alert('','大小超过200K范围不能上传','warning');
				// item.remove();
        	 }
         }
         
         $scope.uploaderPhotos.onAfterAddingFile=function(item){
        	 var size=item.file.size/1024;
        	 if(size<=200){
        		 $scope.uploaderPhotos.addToQueue(item); 
        	 }
         }
         
         //上传控件：回调响应：
         $scope.uploaderPhotos.onCompleteItem = function (item,response,status,headers) {
             if (status == "200") {
            	 if(response!=""&&response!='1'){
            		 $scope.addImg.push(response);
            		 this.AllowAdd = ($scope.addImg.length < 4);
            	 }else{
            		 this.removeFromQueue(item);
            		// item.remove();
				 	 SweetAlertX.alert('','上传图片的分辨率有问题','warning');
            	 }
             }
         };
       
		$scope.addpackage = function() {
			// 打开弹出框
			var modalInstance;
			$scope.loadingDemo = true;
			$scope.query={};
			goodsDefine.getServiceList({type:1},function(data) {
			$scope.query.type={number:1,text:"服务套餐"};
			$scope.packageList =data.ServiceList;
			 modalInstance = $uibModal.open({
				templateUrl: omsBasicHost+'biz/commoditymanage/goodslist/addpackage.html',
				controller : 'addpackageDefine',
				size: 'lg',
				resolve : {
					param : function() {
						return  {packageList:data.ServiceList,query:$scope.query};
					}
				}
			});
			 $scope.loadingDemo = false;
				// 弹窗返回值
				modalInstance.result.then(function(data) {
					if (data) {
						$scope.goodsData.packageValue={
								productId:data.id,
								name:data.name,
								productType:data.type
						}
					}
				})
				
			});

		}
	}

	
		
		

	
	
	
	angular.module('commoditymanage').controller('goodsListCtrl',goodsListCtrl).controller('addGoodsDefine',addGoodsDefine);

})(angular);
