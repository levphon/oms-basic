(function(angular) {
	/**
	 * @param {[type]}
	 *            $scope [默认，存储页面全局变量]
	 * @param {[type]}
	 *            commodityMng [API
	 *            接口对象，对应commoditymanage/services.js中的某个factory]
	 */
	function serviceCategoryCtrl($scope, serviceCategory, serviceCommon,$uibModal,$q,SweetAlertX) {
		var scCtrl = this;
		scCtrl.treeConfig = {
			'plugins' : [ 'types', 'dnd' ],
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

		// 选择进行编辑
		scCtrl.select_node = function(e, node) {
			serviceCategory
					.getTreeNode(
							{
								id : node.node.id
							},
							function(data) {
								$scope.origName=data.name;
								scCtrl.categoryData = data;
								scCtrl.categoryData.id = data.id;
								scCtrl.categoryData.parent = data.parentId;
								scCtrl.categoryData.type = serviceCommon.getBoxSelect(scCtrl.categoryData.type,$scope.types,'number');
								scCtrl.isShow = true;
								scCtrl.select = "";
								$scope.isShowParent=false;
								// 选中节点非最小子节点 or 选中节点关联服务数等于0 可添加子分类
								if (!scCtrl.treeInstance.jstree(true).is_leaf(
										node.node)
										|| data.serviceCount == 0) {
									$scope.isShowChild = false;
								}else{
									$scope.isShowChild=true;
								}
								// 该节点为最小子节点 and 选中节点关联服务数等于0 可删
								if (scCtrl.treeInstance.jstree(true).is_leaf(
										node.node)
										&& data.serviceCount == 0) {
                                     $scope.isShowDelete=true;
								}else{
									$scope.isShowDelete=false;
								}
								//该节点为服务数不为0时，下拉框不可选	
								if(data.serviceCount != 0){
									$scope.isSelect=true;
								}else{
									$scope.isSelect=false;
								}

							})
		};

		serviceCategory.getCategoryList(function(data) {
			scCtrl.categoryList = data;
			$scope.isShowParent=true;
			$scope.isShowChild=true;
		});

		scCtrl.ignoreModelChanges = function() {
			return true;
		};
		// 分类下拉框
		$scope.types = [ {
			number : '200',
			text : '流量'
		}, {
			number : '201',
			text : '应用'
		}, {
			number : '203',
			text : '短信'
		} ];
		// 添加同级分类
		scCtrl.addfistcategory = function() {
			scCtrl.select = "fist";
			$scope.isSelect=false;
			scCtrl.isShow = true;
			$scope.isShowDelete=false;
			$scope.origName=null;
			scCtrl.categoryData = {
				id : "系统自动生成",
				serviceCount : "系统自动计算",
				createBy : "系统自动生成",
				createTime : "系统自动生成(格式:yyyy-mm-dd HH:mm:ss)",
				updateBy : "系统自动生成",
				updateTime : "系统自动生成(格式:yyyy-mm-dd HH:mm:ss)"
			};
		};

		// 添加子分类
		scCtrl.addsecondcategory = function() {
			scCtrl.select = "second";
			$scope.isSelect=false;		
			scCtrl.isShow = true;
			$scope.isShowDelete=false;
			$scope.origName=null;
			scCtrl.categoryData = {
				id : "系统自动生成",
				serviceCount : "系统自动计算",
				createBy : "系统自动生成",
				createTime : "系统自动生成(格式:yyyy-mm-dd HH:mm:ss)",
				updateBy : "系统自动生成",
				updateTime : "系统自动生成(格式:yyyy-mm-dd HH:mm:ss)"
			};

		};
		// 校验服务分类名称是否重复
		$scope.asyncCallback = function(value) {
			var obj = {};
			var result= $q.defer();
			var origName=$scope.origName;
			//编辑服务分类时，输入的名称和原本的名称不一致时才判断
			if(origName!=value){
				obj.name = value;
				result=serviceCategory.existsByName(obj);
			}else{
				result.resolve({result: true});
			}
			return result;
		}
		// 提交事件
		scCtrl.ok = function() {
			if (scCtrl.service_category_form.$valid) {
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
						return false;
					}
					parent = selected[0];
				}

				if (parent == "#") {
					scCtrl.categoryData.parentId = 1;
				} else {
					scCtrl.categoryData.parentId = parent;
				}
				var obj={};
				obj.name=scCtrl.categoryData.name;
				obj.parentId=scCtrl.categoryData.parentId;
				obj.type = scCtrl.categoryData.type.number;
				obj.description=scCtrl.categoryData.description;
				serviceCategory.add(obj, function(data) {
					if(data){
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
				 			SweetAlertX.alert('','操作成功','success');
					}else{
				 		SweetAlertX.alert('','操作失败','error');
					}
					
				});
			} else {
				scCtrl.service_category_form.submitted = true;
			}
		};

		// 取消事件
		scCtrl.cancel = function() {
			scCtrl.isShow = false;
		};

		// 编辑
		scCtrl.edit = function() {
			if (scCtrl.service_category_form.$valid) {
				var jsTree = scCtrl.treeInstance.jstree(true);
				var selected = jsTree.get_selected();
				if (!selected.length) {
					return false;
				}
				parent = selected[0];
				var obj={};
				obj.id=scCtrl.categoryData.id;
				obj.name=scCtrl.categoryData.name;
				obj.type = scCtrl.categoryData.type.number;
				obj.description=scCtrl.categoryData.description;
				serviceCategory.edit(obj, function(data) {
					if(data){
						jsTree.set_text(parent, scCtrl.categoryData.name);
						scCtrl.isShow = false;
				 		SweetAlertX.alert('','操作成功','success');
					}else{
				 		SweetAlertX.alert('','操作失败','error');
					}
					
				});
			} else {
				scCtrl.service_category_form.submitted = true;
			}
		};

		// 删除
		scCtrl.del = function() {
			SweetAlertX.confirm({
				text : "确定是否要删除"
			}, function() {
				var jsTree = scCtrl.treeInstance.jstree(true);
				var selected = jsTree.get_selected();
				parent = selected[0];
				if (jsTree.is_leaf(parent)) {
					serviceCategory.del({
						id : scCtrl.categoryData.id
					}, function(data) {
						if (data.result) {
							SweetAlertX.alert('','删除成功','success');						
							jsTree.set_text(parent, scCtrl.categoryData.name);
							scCtrl.isShow = false;
							jsTree.delete_node(parent);
						}else{
							SweetAlertX.alert('','删除失败','error');
						}					
					});
				}
			});
		};

		// 取消事件
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

	}

	angular
	/**
	 * serviceCategory： 对应 config.js 中
	 */
	.module('serviceManager')
	/**
	 * CategoryCtrl 对应 config.js 中 商品分类管理.url
	 */
	.controller('serviceCategoryCtrl', serviceCategoryCtrl);

})(angular)
