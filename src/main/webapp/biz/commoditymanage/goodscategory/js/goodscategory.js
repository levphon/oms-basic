(function(angular) {
	/**
	 * @param  {[type]} $scope [默认，存储页面全局变量]
	 * @param  {[type]} commodityMng  [API 接口对象，对应commoditymanage/services.js中的某个factory]
	 */
	function goodsCategoryCtrl($scope, commodityMng, $uibModal,FileUploader,SweetAlertX) {
		var scCtrl = this;
		scCtrl.treeConfig = {
			'plugins' : ['types','dnd','search'],
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

		//选择进行编辑
		scCtrl.select_node = function(e, node) {
			commodityMng.getTreeNode({
				id : node.node.id
			}, function(data) {
				var param = angular.copy(data,{});
				delete param.$promise;
				delete param.$resolved;
				scCtrl.categoryData = param;
				$scope.origName=data.name;
				scCtrl.categoryData.id=data.id;
				scCtrl.icoImg=data.imageUri;
				scCtrl.categoryData.parent=data.parentId;
				if(data.imageUri){
					$scope.uploaderCategory.AllowAdd =false;
				}else{
					$scope.uploaderCategory.AllowAdd =true;
				}
				scCtrl.categoryData.displayed={number:data.displayed,text:data.displayed==1?"是":"否"};
                scCtrl.categoryData.recommend={number:data.recommend,text:data.recommend==1?"是":"否"};
				commodityMng.total({id : node.node.id
				}, function(data) {
					scCtrl.categoryData.serviceCount=data.result;
					if(data.result==0){
						$scope.isShowChild = false;
					}				
				});
				scCtrl.isShow = true;
				scCtrl.select="";
				scCtrl.isDelete=false;
				
				$scope.isShowParent=false;
				// 选中节点非最小子节点 or 选中节点关联服务数等于0 可添加子分类
				if (!scCtrl.treeInstance.jstree(true).is_leaf(node.node)) {
					$scope.isShowChild = false;
				}else{
					$scope.isShowChild=true;
					scCtrl.isDelete=true;
				}						
			})
		};

		commodityMng.getCategoryList(function(data) {
			scCtrl.categoryList = data;
			$scope.isShowChild=true;
			$scope.isShowParent=true;
		});

		scCtrl.ignoreModelChanges = function() {
			return true;
		};

		//添加同级分类
		
		scCtrl.addfistcategory = function() {
			var jsTree = scCtrl.treeInstance.jstree(true);
			var selected = jsTree.get_selected();						
			scCtrl.select = "fist";
			scCtrl.isShow = true;
			scCtrl.categoryData = {};
			scCtrl.categoryData.serviceCount=0;
			scCtrl.categoryData.displayed={number:1,text:"是"};
            scCtrl.categoryData.recommend={number:1,text:"是"};
			$scope.uploaderCategory.AllowAdd =true;
			scCtrl.icoImg='';
		};
		
		//添加子分类
		scCtrl.addsecondcategory = function() {
			var jsTree = scCtrl.treeInstance.jstree(true);
			var selected = jsTree.get_selected();				
			
			scCtrl.select = "second";
			scCtrl.icoImg='';
			scCtrl.isShow = true;
			scCtrl.categoryData = {};
			$scope.uploaderCategory.AllowAdd =true;
			scCtrl.categoryData.displayed={number:1,text:"是"};
            scCtrl.categoryData.recommend={number:1,text:"是"};
		};

		//提交事件
		scCtrl.ok = function() {
			if(scCtrl.service_category_form.$valid) {
			var jsTree = scCtrl.treeInstance.jstree(true);
			var parent;
			if (scCtrl.select == "fist") {
				if (scCtrl.categoryList.length != 0) {
					var selected = jsTree.get_selected();
					// 没有选中的时候
					if (!selected.length) {
						parent = "#";
					} else {
						// 选中的时候
						var selected_nodes = jsTree.get_node(selected);
						parent = selected_nodes.parent;
					}
				} else {
					parent = "#";
				}
				

			} else {
				var selected = jsTree.get_selected();
				if (!selected.length) {
					SweetAlertX.alert("","没有选择节点!", "warning");
					return false;
				}
				parent = selected[0];
			}
			
			if (parent == "#") {
				scCtrl.categoryData.parentId = 0;
			} else {
				scCtrl.categoryData.parentId = parent;
			}
			
			scCtrl.categoryData.imageUri=scCtrl.icoImg;
			
			//获取选中是否显示
			if (scCtrl.categoryData.displayed) {
				var displayed = scCtrl.categoryData.displayed.number;
				scCtrl.categoryData.displayed=displayed;
			}
                if (scCtrl.categoryData.recommend) {
                    var recommend = scCtrl.categoryData.recommend.number;
                    scCtrl.categoryData.recommend=recommend;
                }
			var param = angular.copy(scCtrl.categoryData,{});
			delete param.serviceCount;
			commodityMng.add(param, function(data) {
				if(data){
					SweetAlertX.alert('','操作成功','success');
					var param = {
							id : data.id,
							parent : parent,
							text : scCtrl.categoryData.name,
							state : {
								opened : true
							}
						};
						
						scCtrl.categoryList.push(param);
						scCtrl.isShow = false;
				}else{
					SweetAlertX.alert('','操作失败','error');
				}
			});
			
			}else{
				scCtrl.service_category_form.submitted = true;
			}
		};

		//取消事件
		scCtrl.cancel = function() {
			scCtrl.isShow = false;
			scCtrl.icoImg='';
			scCtrl.categoryData = {};
			$scope.uploaderCategory.AllowAdd =true; 
		};
       
		//编辑
		scCtrl.edit = function() {
			if(scCtrl.service_category_form.$valid) {
				var jsTree = scCtrl.treeInstance.jstree(true);
				var selected = jsTree.get_selected();
				if (!selected.length) {
					SweetAlertX.alert("","没有选择节点!", "warning");
					return false;
				}
				parent = selected[0];
			/*if(scCtrl.icoImg){
				scCtrl.categoryData.imageUri=scCtrl.icoImg;
			}*/
			
				scCtrl.categoryData.imageUri=scCtrl.icoImg;
				//获取选中是否显示
				if (scCtrl.categoryData.displayed) {
					var displayed = scCtrl.categoryData.displayed.number;
					scCtrl.categoryData.displayed =displayed;
				}
                if (scCtrl.categoryData.recommend) {
                    var recommend = scCtrl.categoryData.recommend.number;
                    scCtrl.categoryData.recommend =recommend;
                }

				var param = angular.copy(scCtrl.categoryData,{});
				delete param.serviceCount;
				delete param.parent;
				delete param.code;
				delete param.createBy;
				delete param.createTime;
				delete param.updateBy;
				delete param.updateTime;
				commodityMng.edit(param, function(data) {
					if(data){
						SweetAlertX.alert('','操作成功','success');
						jsTree.set_text(parent, param.name);
						scCtrl.isShow = false;
					}else{
						SweetAlertX.alert('','操作失败','error');
					}
				});
				}else{
					scCtrl.service_category_form.submitted = true;
				}
		};
		
		//删除
		scCtrl.dele = function() {
			var jsTree = scCtrl.treeInstance.jstree(true);
			var selected = jsTree.get_selected();
			if (!selected.length) {
				SweetAlertX.alert("","父节点不能删除!", "warning");
				return false;
			}
			parent = selected[0];
			commodityMng.total({
				id : parent
			}, function(data) {
				if(data.result>0){
					SweetAlertX.alert("","有关联商品不能删除", "warning");
					return false;
					
				}else{
					if (jsTree.is_leaf(parent)) {
						commodityMng.dele({
							id : scCtrl.categoryData.id
						}, function(data) {
							jsTree.set_text(parent, scCtrl.categoryData.name);
							scCtrl.isShow = false;
							jsTree.delete_node(parent);
						});
					}else{
						SweetAlertX.alert("","有叶子节点不能删除!", "warning");
					}
					
				}
				
			});
		};
		
		// 校验服务分类名称是否重复
		$scope.asyncCallback = function(value) {
			var origName=$scope.origName;
			var obj={};
			//编辑服务时，输入的名称和原本的名称不一致时才判断
			if(scCtrl.select=='fist'||scCtrl.select=='second'){
				obj.name=value;
				result=commodityMng.existsByName(obj);
			}else{
				if(origName!=value){
					obj.name=value;
					result=commodityMng.existsByName(obj);
				}else{
					result = {result: true};
				}
			}
			
			return result;
		}
		



		//取消事件
		scCtrl.unfold = (function() {
			scCtrl.isOpen = false;
			return function () {
				var jsTree = scCtrl.treeInstance.jstree(true);
				if (scCtrl.isOpen) {
					jsTree.close_all();
					scCtrl.isOpen = false;
				} else {
					jsTree.open_all();
					scCtrl.isOpen = true;
				}
			};
		})();
		
		 var uploaderCategory = $scope.uploaderCategory = new FileUploader({
			    url: omsBasicHost+"goods/addPhoto?type=3&jsessionid="+jsessionid,
	  		    autoUpload: true,                 //添加后，自动上传
		 });
		 
		 uploaderCategory.filters.push({
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
		 scCtrl.icoImg='';
		 $scope.uploaderCategory.AllowAdd =true;  
		 scCtrl.show=false;
		 
        //自己添加的，用于在移除图片时，重新计算
		 $scope.uploaderCategory.funcRemoveItem = function () {
			 this.AllowAdd = true;
			 scCtrl.icoImg='';
			 scCtrl.show=false;
        };
  
        //上传控件：回调响应：
        $scope.uploaderCategory.onBeforeUploadItem = function (item) {
       	 var size=item.file.size/1024;
       	 if(size>80){
       		 $scope.uploaderCategory.cancelItem(item);
       		this.removeFromQueue(item);
       		 SweetAlertX.alert("","大小超过80K不能上传", "warning");
       		 
       	 }
        }
        //上传控件：回调响应：
        $scope.uploaderCategory.onCompleteItem = function (item,response,status,headers) {
            if (status == "200") {
	           	 if(response!='1'){
	           		scCtrl.icoImg=response;
	           		scCtrl.show=true;
	           		this.AllowAdd = false;
	           	 }else{
	           		SweetAlertX.alert("","上传图片的分辨率有问题不能上传", "warning");
	           	 }
            }
        }
		
	}


	angular
	/**
	 * commoditymanage： 对应 config.js 中  商品管理.url
	 */
	.module('commoditymanage')
	/**
	 * goodsCategoryCtrl 对应 config.js 中  商品分类管理.url
	 */
	.controller('goodsCategoryCtrl', goodsCategoryCtrl);
	

})(angular)
