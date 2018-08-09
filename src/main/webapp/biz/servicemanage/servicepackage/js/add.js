(function(angular) {

	

	function getNewServiceList(oldList, newList) {
		var newServiceList = [];
		for (var i = 0; i < oldList.length; i++) {
			for (var j = 0; j < newList.length; j++) {
				if (oldList[i].id == newList[j].id) {
					newServiceList.push(oldList[i]);
					break;
				}
			}
		}
		return newServiceList;
	}
	function qc(list){
		// 遍历list，把元素分别放入tmp数组(不存在才放)
		 var tmp = new Array(); 
		 for (var i in list) { //
		 // 该元素在tmp内部不存在才允许追加 if
		    if(tmp.indexOf(list[i]) ==-1) {
		       tmp.push(list[i]); 
		    } 
		 }
		 return tmp;
	}

	// 添加或编辑弹窗controller
	function addServicePackage($scope, $uibModalInstance, servicePackage,serviceCommon,label,
			param, DTOptionsBuilder, $uibModal,$q,SweetAlertX) {

		$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(-1)
				.withOption('bFilter', false).withButtons([]).withOption(
						'lengthChange', false).withOption('ordering', false)
				.withOption('paging', false).withOption('scrollY', "70px")
				.withOption('scrollCollapse', true);

		$scope.servicePackageData = param.servicePackage;
		$scope.origName=$scope.servicePackageData.name;		
		// 展示标签选项
		var labelList=[];
		var labels={};
		labels.type=2;
		label.getServiceList(labels, function(result) {
			for (var i = 0; i < result.data.length; i++) {
				labelList.push({
                    number : result.data[i].id,
                    text : result.data[i].name
                });
			}
			$scope.labelList = labelList;
			$scope.servicePackageData.serviceTag = serviceCommon.getBoxSelect($scope.servicePackageData.serviceTagId,$scope.labelList,'number');
		});
		//获取线下销售渠道
		var channelList=[];
		for(var j=0; j < param.configurationsList.length;j++){
			channelList.push({
				number : param.configurationsList[j].conf_id,
				text : param.configurationsList[j].conf_value
			});
		}
		$scope.channelList = channelList;
		$scope.servicePackageData.channel=serviceCommon.getBoxSelect($scope.servicePackageData.labelId,$scope.channelList,'number');
		
		// 展示绑定的设备列表
		$scope.deviceList = param.deviceList;
		// 展示套餐绑定的服务列表
		$scope.serviceList = param.serviceDefineList;
		// 展示套餐绑定的服务列表
		$scope.merchantList = param.merchantList;
		//编辑服务时绑定选中的卡
		param.cardList.forEach(function(val,index,arr){
			if(val==0){//外部卡
				$scope.servicePackageData.wbCard=true;
			}else if(val==1){//广联3G卡
				$scope.servicePackageData.gl3GCard=true;
			}else if(val==2){//广联繁睿卡
				$scope.servicePackageData.glfrCard=true; 
			}else if(val==3){//重庆联通卡
				$scope.servicePackageData.cqltCard=true;				
			}
			$scope.checkCards=1;
		})
		
		// 有效期下拉框
		$scope.times = [ {
			number : 'forever',
			text : '永久有效'
		}, {
			number : 'year',
			text : '年'
		},{
			number : 'month',
			text : '月'
		} ];
		
		
		// 给下拉框赋默认值
		if ($scope.servicePackageData) {
			$scope.servicePackageData.validityPeriodUnit = serviceCommon.getBoxSelect($scope.servicePackageData.validityPeriodUnit, $scope.times,'number');
			if($scope.servicePackageData.validityPeriod&&$scope.servicePackageData.validityPeriod!=0){
				$scope.showValidityPeriod=true;
			}
				
			// 添加页展示添加或编辑字样
			$scope.isEdit = $scope.servicePackageData.id !== null;
		}
		
		$scope.isShow = function(item){
			if(item.number=="forever"){//选择永久有效时
				$scope.showValidityPeriod=false;
			}else if(item.number=="year"||item.number=="month"){//选择年或者月
				$scope.showValidityPeriod=true;			
			}
		} 
       
		// 校验服务套餐名称是否重复
		$scope.asyncCallback = function(value) {
			var obj = {};
			var result= $q.defer();
			var origName=$scope.origName;
			//编辑服务套餐时，输入的名称和原本的名称不一致时才判断
			if(origName!=value){
				obj.name = value;
				result=servicePackage.existsByName(obj);
			}else{
				result = {result: true};
			}
			return result;
		}

		// 添加方法
		$scope.ok = function(status) {
			if ($scope.add_servicePackage_form.$valid) {
				var obj = {};
				var servicePackageData = $scope.servicePackageData;
				// 获取主键ID
				if (servicePackageData.id) {
					obj.id = servicePackageData.id;
				}
				// 获取服务套餐名称
				obj.name = servicePackageData.name;
				// 获取服务套餐别名
				obj.alias = servicePackageData.alias;
				// 处理选中的设备列表,以免转成json串后，长度太长，http请求会414
				var deviceInfoList=new Array();
				$.each($scope.deviceList, function(key, val) { 
					deviceInfoList[key]=$scope.deviceList[key].deviceId;
				});
				obj.deviceList = angular.toJson(deviceInfoList);
				// 获取多选框选中的卡
				obj.cqltCard = servicePackageData.cqltCard == true ? 1 : 0;
				obj.glfrCard = servicePackageData.glfrCard == true ? 1 : 0;
				obj.gl3GCard = servicePackageData.gl3GCard == true ? 1 : 0;
				obj.wbCard = servicePackageData.wbCard == true ? 1 : 0;
				//处理获取的服务列表，以免转成json串后，长度太长，http请求会414
				var serviceInfoList=new Array();
				$.each($scope.serviceList, function(key, val) { 
					serviceInfoList[key]=$scope.serviceList[key].id;
				});
				obj.serviceList = angular.toJson(serviceInfoList);
				
				// 获取有效期
				obj.validityPeriodUnit=servicePackageData.validityPeriodUnit.number;//获取时间单位
				if(servicePackageData.validityPeriodUnit.number!='forever'){
					obj.validityPeriod=servicePackageData.validityPeriod;//获取时间值
				}else{
					obj.validityPeriod=0;
				}

				//处理获取的定制商列表，以免转成json串后，长度太长，http请求会414
				var merchantInfoList=new Array();
				$.each($scope.merchantList, function(key, val) { 
					merchantInfoList[key]=$scope.merchantList[key].merchantId;
				});				
				obj.merchantList=angular.toJson(merchantInfoList);
				//获取选中的渠道
				if(servicePackageData.channel){
					var labelId=servicePackageData.channel.number;
					obj.labelId=labelId;
				}
				// 获取选中的标签
				if (servicePackageData.serviceTag) {
					var serviceTagId = servicePackageData.serviceTag.number;
					var serviceTagName = servicePackageData.serviceTag.text;
					obj.serviceTagId = serviceTagId;
					obj.serviceTagName = serviceTagName;
				}
				// 获取描述
				obj.description = servicePackageData.description;
				// 保存or存草稿or上架
				obj.shelveStatus = status;
				servicePackage.addServicePackage(obj, function(data) {
					if (data.result) {
				 		SweetAlertX.alert('','操作成功','success');
						$uibModalInstance.close(data);
					} else {
				 		SweetAlertX.alert('','操作失败','error');
					}
				});
			} else {
				$scope.add_servicePackage_form.submitted = true;
			}

		};
		// 取消
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
        
		//根据选中的设备,卡获取可选择的服务列表
		function getServices(callback){
			var data = {};
			var serviceVO={};
			
			var deviceInfoList=new Array();
			$.each($scope.deviceList, function(key, val) { 
				deviceInfoList[key]=$scope.deviceList[key].deviceId;
			});
			serviceVO.deviceList=angular.toJson(deviceInfoList);
			
			if($scope.servicePackageData&&$scope.servicePackageData.cqltCard==true){
				serviceVO.cqltCard=1;
			}
			if($scope.servicePackageData&&$scope.servicePackageData.glfrCard==true){
				serviceVO.glfrCard=1;
			}
			//查询可选择的服务列表
			servicePackage.getServiceList(serviceVO,function(item) {
				(callback || angular.noop)(item.ServiceList);
			});
		}
		// 添加设备
		$scope.addDevice = function() {
			var data = $scope.deviceList;
			// 打开弹出框
			var modalInstance = $uibModal
					.open({
						templateUrl: omsBasicHost+'biz/servicemanage/servicepackage/addDevice.html',
						controller : 'addDeviceList',
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
							$scope.deviceList=data;
							var list;
							getServices(function(ServiceList){
								list=ServiceList;
								if(list){
									// 判断已选择的服务列表是否在新获取的服务列表是否存在，不存在，则删除	
									$scope.serviceList = getNewServiceList($scope.serviceList,list);
								}else{
									$scope.serviceList=[];
								}
								
							});
							
						}
					})
		}
		
		//添加卡的非空校验和获取卡关联的服务列表
		$scope.getCardService = function() {
			if (!$scope.servicePackageData.glfrCard
					&& !$scope.servicePackageData.cqltCard
					&& !$scope.servicePackageData.gl3GCard
					&& !$scope.servicePackageData.wbCard) {
				$scope.checkCards = null;
			} else {
				$scope.checkCards = 1;
			}
			var list;
			getServices(function(ServiceList) {
				list = ServiceList;
				if (list) {
					// 判断已选择的服务列表是否在新获取的服务列表是否存在，不存在，则删除
					$scope.serviceList = getNewServiceList($scope.serviceList,
							list);
				} else {
					$scope.serviceList = [];
				}
			});
		}

		// 添加服务
		$scope.addService = function() {
			var data = {};
			data.selectedServiceList = $scope.serviceList;
			//查询可选择的服务列表
			getServices(function(ServiceList){
				if(ServiceList.length>0){
					$scope.selectingServiceList =ServiceList;
					data.selectingServiceList=$scope.selectingServiceList;
					// 打开弹出框
					var modalInstance = $uibModal
							.open({
								templateUrl: omsBasicHost+'biz/servicemanage/servicepackage/addService.html',
								controller : 'addServiceList',
								size : 'lg',
								resolve : {
									param : function() {
										return data || {};
									}
								}
							});
					// 弹窗返回值
					modalInstance.result.then(function(data) {
						if (data) {
							$scope.serviceList=data;
						}
					})
				}else{
					SweetAlertX.alert("请重新选择", "可选的服务列表为空,请重新选择设备列表和卡列表", "warning");
				}
				
			});			
			
		}
		
		// 添加服务定制商
		$scope.addMerchant = function() {
			var data = $scope.merchantList;
			// 打开弹出框
			var modalInstance = $uibModal
					.open({
						templateUrl: omsBasicHost+'biz/servicemanage/servicepackage/addMerchant.html',
						controller : 'addMerchantList',
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
							$scope.merchantList=data;					
						}
					})
		}
	}

	angular.module('serviceManager').controller('addServicePackage',
			addServicePackage);

})(angular);
