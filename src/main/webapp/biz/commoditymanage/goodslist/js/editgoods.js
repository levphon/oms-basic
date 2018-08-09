(function(angular) {

	// 弹窗controller
	function editGoodsDefine($scope, $uibModalInstance, goodsDefine,
			commodityMng, param, $uibModal, $q, FileUploader, SweetAlertX,
			$timeout) {
		// 商品状态下拉框
		$scope.labelList = [ {
			number : '0',
			text : '否'
		}, {
			number : '1',
			text : '是'
		} ];

        $scope.recommendList = [ {
            number : '0',
            text : '否'
        }, {
            number : '1',
            text : '是'
        } ];

		$scope.addImg = [];

		$scope.state = param.state;

		var uploaderResume1 = $scope.uploaderResume1 = new FileUploader({
			url : omsBasicHost+"goods/addPhoto?type=1&jsessionid="+jsessionid,
			queueLimit : 1, //文件个数 
			autoUpload : true, //添加后，自动上传
			removeAfterUpload : true,
		});
		//

		uploaderResume1.filters
				.push({
					name : 'imageFilter',
					fn : function(item /*{File|FileLikeObject}*/, options) {
						var type = '|'
								+ item.type
										.slice(item.type.lastIndexOf('/') + 1)
								+ '|';
						if ('|jpg|png|jpeg|gif|'.indexOf(type) !== -1) {
							return true;
						} else {
							SweetAlertX.alert('', '图片格式不正确', 'warning');
							return false;
						}
					}
				});

		//
		$scope.uploaderResume1.onBeforeUploadItem = function(fileItem) {
			var size = fileItem.file.size / 1024;
			if (size > 80) {
				$scope.uploaderResume1.cancelItem(fileItem);
				// this.removeFromQueue(item);
				SweetAlertX.alert('', '大小超过80k范围不能上传', 'warning');
			}

		};
		//
		$scope.uploaderResume1.onCompleteItem = function(fileItem, response,
				status, headers) {
			if (status == "200") {
				if (response != '1') {
					$scope.imageSrc1 = response;
				} else {
					SweetAlertX.alert('', '上传图片的分辨率有问题', 'warning');
				}
			}
		};
		
		//第二张图片
		var uploaderResume2 = $scope.uploaderResume2 = new FileUploader({
			url : omsBasicHost+"goods/addPhoto?type=5&jsessionid="+jsessionid,
			queueLimit : 1, //文件个数 
			autoUpload : true, //添加后，自动上传
			removeAfterUpload : true,
		});
		//

		uploaderResume2.filters
				.push({
					name : 'imageFilter',
					fn : function(item /*{File|FileLikeObject}*/, options) {
						var type = '|'
								+ item.type
										.slice(item.type.lastIndexOf('/') + 1)
								+ '|';
						if ('|jpg|png|jpeg|gif|'.indexOf(type) !== -1) {
							return true;
						} else {
							SweetAlertX.alert('', '图片格式不正确', 'warning');
							return false;
						}
					}
				});

		//
		$scope.uploaderResume2.onBeforeUploadItem = function(fileItem) {
			var size = fileItem.file.size / 1024;
			if (size > 80) {
				$scope.uploaderResume2.cancelItem(fileItem);
				// this.removeFromQueue(item);
				SweetAlertX.alert('', '大小超过80k范围不能上传', 'warning');
			}

		};
		//
		$scope.uploaderResume2.onCompleteItem = function(fileItem, response,
				status, headers) {
			if (status == "200") {
				if (response != '1') {
					$scope.imageSrc2 = response;
				} else {
					SweetAlertX.alert('', '上传图片的分辨率有问题', 'warning');
				}
			}
		};
		
		//第三张图片
		var uploaderResume3 = $scope.uploaderResume3 = new FileUploader({
			url : omsBasicHost+"goods/addPhoto?type=6&jsessionid="+jsessionid,
			queueLimit : 1, //文件个数 
			autoUpload : true, //添加后，自动上传
			removeAfterUpload : true,
		});
		//

		uploaderResume3.filters
				.push({
					name : 'imageFilter',
					fn : function(item /*{File|FileLikeObject}*/, options) {
						var type = '|'
								+ item.type
										.slice(item.type.lastIndexOf('/') + 1)
								+ '|';
						if ('|jpg|png|jpeg|gif|'.indexOf(type) !== -1) {
							return true;
						} else {
							SweetAlertX.alert('', '图片格式不正确', 'warning');
							return false;
						}
					}
				});

		//
		$scope.uploaderResume3.onBeforeUploadItem = function(fileItem) {
			var size = fileItem.file.size / 1024;
			if (size > 80) {
				$scope.uploaderResume3.cancelItem(fileItem);
				// this.removeFromQueue(item);
				SweetAlertX.alert('', '大小超过80k范围不能上传', 'warning');
			}

		};
		//
		$scope.uploaderResume3.onCompleteItem = function(fileItem, response,
				status, headers) {
			if (status == "200") {
				if (response != '1') {
					$scope.imageSrc3 = response;
				} else {
					SweetAlertX.alert('', '上传图片的分辨率有问题', 'warning');
				}
			}
		};

		$scope.types = [ {
			number : '0',
			text : '服务'
		}, {
			number : '1',
			text : '服务套餐'
		} ];
		var v_name;
		goodsDefine
				.getGoods(
						{
							id : param.id
						},
						function(date) {
							v_name = date.name;
							$scope.goodsData = {
								name : date.name,
								alias : date.alias,
								costPrice : date.costPrice == 0.00 ? null
										: date.costPrice,
								wholesalePrice : date.wholesalePrice == 0.00 ? null
										: date.wholesalePrice,
								retailPrice : date.retailPrice,
								preferentialPrice : date.preferentialPrice == 0.00 ? null
										: date.preferentialPrice,
								storageQuantity : date.storageQuantity,
								showSalse : date.showSalse,
								showClicks : date.showClicks,
								purchaseQuantity : date.purchaseQuantity,
								description : date.description,
								id : date.id
							}
							$scope.imageSrc = date.ionc;
							$scope.goodsData.category = {
								id : date.mallClassficationId
							};
							$scope.addImg = date.pic || [];
							$scope.uploaderPhotos.queueLimit = 4 - $scope.addImg.length;
							$scope.uploaderPhotos.AllowAdd = ($scope.addImg.length < 4) || false;
							//自己添加的，用于在移除图片时，重新计算
							if (date.salesChannels) {
								$scope.goodsData.offlinesaleschannels = {
									conf_id : date.salesChannelsId,
									conf_value : date.salesChannels
								};
							}
							$scope.goodsData.displayed = {
								number : date.displayed,
								text : date.displayed == 1 ? "是" : "否"
							};
                            $scope.goodsData.recommend = {
                                number : date.recommend,
                                text : date.recommend == 1 ? "是" : "否"
                            };
							if (date.productId) {
								goodsDefine.findServicePackage({
									id : date.productId,
									type : date.productType
								}, function(v) {
									$scope.goodsData.packageValue = {
										productId : v.id,
										name : v.name,
										productType : v.type - 1
									};
								});
							}
						});

		goodsDefine.getOfflineSalesChannels(function(data) {
			$scope.offlinesaleschannels = data;
		});
		commodityMng.getCategoryList(function(data) {
			$scope.categoryList = data;
		});

		var uploaderPhotos = $scope.uploaderPhotos = new FileUploader({
			url : omsBasicHost+"goods/addPhoto?type=2&jsessionid="+jsessionid,
			queueLimit : 4,
			autoUpload : true,//添加后，自动上传
		});

		uploaderPhotos.filters
				.push({
					name : 'imageFilter',
					fn : function(item /*{File|FileLikeObject}*/, options) {
						var type = '|'
								+ item.type
										.slice(item.type.lastIndexOf('/') + 1)
								+ '|';
						if ('|jpg|png|jpeg|gif|'.indexOf(type) !== -1) {
							return true;
						} else {
							//this.removeFromQueue(item);
							SweetAlertX.alert('', '图片格式不正确', 'warning');
							return false;
						}
					}
				});

		//自己添加的，用于在移除图片时，重新计算
		$scope.uploaderPhotos.funcRemoveItem = function(index) {
			$scope.addImg.splice(index, 1);
			this.AllowAdd = ($scope.addImg.length < 4);
			$scope.uploaderPhotos.queueLimit = $scope.uploaderPhotos.queueLimit + 1;
			$scope.uploaderPhotos.clearQueue();
			this.queue.splice(index, 1);
			console.log(this.queue);
		};

		//上传控件：回调响应：
		$scope.uploaderPhotos.onBeforeUploadItem = function(item) {
			var size = item.file.size / 1024;
			if (size > 200) {
				$scope.uploaderPhotos.cancelItem(item);
				this.removeFromQueue(item);
				SweetAlertX.alert('', '大小超过200k范围不能上传', 'warning');
			}
		}
		$scope.uploaderPhotos.onAfterAddingFile = function(item) {
			var size = item.file.size / 1024;
			if (size <= 200) {
				$scope.uploaderPhotos.addToQueue(item);
			}
		}

		//上传控件：回调响应：
		$scope.uploaderPhotos.onCompleteItem = function(item, response, status,
				headers) {
			if (status == "200") {
				if (response != "" && response != '1') {
					$scope.addImg.push(response);
					$scope.uploaderPhotos.queueLimit = $scope.uploaderPhotos.queueLimit - 1;
					this.removeFromQueue(item);
					this.AllowAdd = ($scope.addImg.length < 4);
				} else {
					this.removeFromQueue(item);
					SweetAlertX.alert('', '上传图片的分辨率有问题', 'warning');
				}
			}
		};

		$scope.imageUpload = function(files) {
			var timestamp = new Date().getTime();
			var uploadFiles = new FormData();
			//uploadFiles.append("uploadFiles", files);
			uploadFiles.append('file', files[0]);
			$.ajax({
				data : uploadFiles,
				type : "POST",
				url : omsBasicHost+"goods/addPhoto?type=4&jsessionid="+jsessionid,
				cache : false,
				contentType : false,
				processData : false,
				success : function(imageUrl) {
					$('#wjy').summernote('insertImage', imageUrl, 'img');
				},
				error : function() {
					console.log("uploadError");
				}
			})
		};

		$scope.ok = function(status) {
			if ($scope.add_goods_form.$valid) {
				var obj = {};
				var goods = $scope.goodsData;
				//获取服务名称
				obj = goods;
				//获取选中的分类goodsData.category
				if (goods.category) {
					var mallClassficationId = goods.category.id;
					obj.mallClassficationId = mallClassficationId;
				}
				if (goods.offlinesaleschannels) {
					var salesChannelsId = goods.offlinesaleschannels.conf_id;
					var salesChannels = goods.offlinesaleschannels.conf_value;
					obj.salesChannelsId = salesChannelsId;
					obj.salesChannels = salesChannels;
				}

				//获取选中是否显示
				/*	if (goods.displayed&&goods.displayed.number!=0) {*/
				var displayed = goods.displayed.number;
				obj.displayed = displayed;
                var recommend = goods.recommend.number;
                obj.recommend = recommend;
				/*}else {
					SweetAlertX.alert('',"是否显示有问题请从新选择", "warning");
					return false;
				}*/

				if (goods.packageValue) {
					obj.productId = goods.packageValue.productId;
					obj.productType = goods.packageValue.productType + 1;
				}

				//图片ico
				if ($scope.imageSrc1) {
					obj.ionc1 = $scope.imageSrc1;
				}
				
				if ($scope.imageSrc2) {
					obj.ionc2 = $scope.imageSrc2;
				}
				
				if ($scope.imageSrc1) {
					obj.ionc3 = $scope.imageSrc3;
				}

				//主图
				if ($scope.addImg) {
					obj.pic = $scope.addImg;
				}

				//存草稿或者是上架
				if (status == 2) { //表示商家此时商品状态还是草稿审核的状态是上架审核中
					if (param.state == 1) { //已经下降成功开始上架
						obj.auditingStatus = 3; //上架审核中
					} else {
						obj.shelveStatus = 1; //表示草稿
						obj.auditingStatus = 3; //上架审核中
					}
				} else {
					obj.shelveStatus = status;
				}
				obj.id = param.id;
				if (obj.costPrice == "") {
					obj.costPrice = 0.00;
				}
				if (obj.wholesalePrice == "") {
					obj.wholesalePrice = 0.00;
				}
				if (obj.preferentialPrice == "") {
					obj.preferentialPrice = 0.00
				}
				goodsDefine.updateGoods(obj, function(data) {
					if (data.result) {
						//$uibModalInstance.close(data);
						SweetAlertX.alert("", "操作成功!", "success", function() {
							$uibModalInstance.close(data);
						});

					} else {
						SweetAlertX.alert('', '更新失败', 'error');
					}
				});

			} else {
				$scope.add_goods_form.submitted = true;
			}
		};
		// 校验服务名称是否重复
		$scope.asyncCallback = function(value) {
			// console.log(v_name);

			if (value !== v_name) {
				var obj = {};
				obj.name = value;
				return goodsDefine.existsByName(obj);
			} else {
				var def = $q.defer();
				var obj = {
					result : true
				};
				def.resolve(obj)
				return def;
			}
		}

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.deletepackage = function() {
			$scope.goodsData.packageValue = null;
		};

		$scope.addpackage = function() {
			// 打开弹出框
			var modalInstance;
			$scope.loadingDemo = true;
			$scope.query = {};
			goodsDefine
					.getServiceList(
							{
								type : 1
							},
							function(data) {
								$scope.query.type = {
									number : 1,
									text : "服务套餐"
								};
								$scope.packageList = data.ServiceList;
								modalInstance = $uibModal
										.open({
											templateUrl: omsBasicHost+'biz/commoditymanage/goodslist/addpackage.html',
											controller : 'addpackageDefine',
											size : 'lg',
											resolve : {
												param : function() {
													return {
														packageList : data.ServiceList,
														query : $scope.query
													};
												}
											}
										});

								$scope.loadingDemo = false;
								// 弹窗返回值
								modalInstance.result.then(function(data) {
									if (data) {
										$scope.goodsData.packageValue = {
											productId : data.id,
											name : data.name,
											productType : data.type
										}
									}
								})

							});

		}

	}

	// 套餐弹窗controller
	function addpackageDefine($scope, $uibModalInstance, goodsDefine, param,
			DTOptionsBuilder, SweetAlertX) {
		$scope.query = {};
		// 商品状态下拉框
		/*		$scope.types = [
		 {
		 number : '0',
		 text : '服务'
		 }, 
		 {
		 number : '1',
		 text : '服务套餐'
		 } ];*/

		$scope.packageList = param.packageList;

		$scope.query = param.query;
		//屏蔽服务下拉框
		$scope.types = [ {
			number : '1',
			text : '服务套餐'
		} ];
		$scope.query.type = $scope.types[0];

		$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10)
				.withOption('bFilter', false).withDOM('iTfgtlp');

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.add = function(data) {
			$uibModalInstance.close(data);
			$uibModalInstance.dismiss('cancel');
		};

		$scope.packageForm = function() {
			var obj = {};
			obj.type = $scope.query.type.number;
			if ($scope.query.queryText) {
				obj.queryText = $scope.query.queryText;
			}

			$scope.loadingQuery = true;
			goodsDefine.getServiceList(obj, function(data) {
				$scope.loadingQuery = false;
				$scope.packageList = data.ServiceList;
			});
		};
	}
	angular.module('commoditymanage').controller('editGoodsDefine',
			editGoodsDefine).controller('addpackageDefine', addpackageDefine);

})(angular);
