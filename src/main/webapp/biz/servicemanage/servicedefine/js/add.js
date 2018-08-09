(function(angular) {

	// 添加或编辑弹窗controller
	function addServiceDefine($scope, $uibModalInstance, serviceDefine,serviceCommon,SweetAlertX,
			serviceCategory, label,param,DTOptionsBuilder,$uibModal,$q) {

		$scope.dtOptions = DTOptionsBuilder.newOptions()
				.withDisplayLength(-1)
                .withOption('bFilter', false)
                .withButtons([])
                .withOption('lengthChange', false)
                .withOption('ordering', false)
                .withOption('autoWidth', false)
                .withOption('paging', false)
                .withOption('scrollY', "70px")
                .withOption('scrollX', true)
                .withOption('scrollCollapse', true);
		
		$scope.serviceData = param.ServiceDefine;

		//编辑时赋值
		$scope.origName=param.ServiceDefine.name;
		// 展示标签选项
		var labelList=[];
		var labels={};
		labels.type=1;
		label.getServiceList(labels, function(result) {
			for (var i = 0; i < result.data.length; i++) {
				labelList.push({
					number : result.data[i].id,
					text : result.data[i].name
				});
			}
			$scope.labelList = labelList;
			$scope.serviceData.serviceTag = serviceCommon.getBoxSelect($scope.serviceData.serviceTagId,$scope.labelList,'number');
		});
		// 展示供应商选项
        var supplierList=serviceCommon.getAllSelect();
		for (var i = 0; i < param.supplierList.length; i++) {
			supplierList.push({
				number : param.supplierList[i].merchantId,
				text : param.supplierList[i].merchantName
			});
		}
		$scope.supplierList = supplierList;
		// 分类下拉框以目录树的形式展示
		serviceCategory.getCategoryList(function(data) {
			$scope.treeDatalist = data;
		});
		
		//展示绑定的应用列表
		$scope.appList=param.appList;
		//展示绑定的设备列表
		$scope.deviceList=param.deviceList;
		//展示绑定的流量套餐列表
		$scope.flowPackageList=param.flowPackageList;
		// 展示计费方式下拉框
		$scope.billingList = [ {
			number : '1',
			text : '按时间'
		}, {
			number : '2',
			text : '按数量'
		} ];
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
		// 数量下拉框
		$scope.counts = [ {
			number : 'ci',
			text : '次'
		}, {
			number : 'tai',
			text : '台'
		},{
			number : 'M',
			text : 'M'
		} ];
		
		
		//给添加流量表格赋totalAddedFlow、totalBasicFlow值
		$scope.totalAddedFlow=function(item){
			if(item.totalAddedFlow != null){
				return item.totalAddedFlow;
			}else if(item.addedIsUnlimitFlow != null && item.addedIsUnlimitFlow != '--'){
				return item.addedIsUnlimitFlow;
			}else if(item.addedMonthTotalflow != null){
				return item.addedMonthTotalflow+"M/月*"+item.addedPeriods+"月";
			}else{
				return '--';
			}
		}
		
		$scope.totalBasicFlow=function(item){
			if(item.totalBasicFlow != null){
				return item.totalBasicFlow;
			}else if(item.basicIsUnlimitFlow != null && item.basicIsUnlimitFlow != '--'){
				return item.basicIsUnlimitFlow;
			}else if(item.basicMonthTotalflow != null){
				return item.basicMonthTotalflow+"M/月*"+item.basicPeriods+"月";
			}else {
				return '--';
			}
		}
		
		
		//增值流量类型addedFlowType 基础流量类型basicFlowType 设值问题
		$scope.addedFlowType=function(item){
			if(item.addedFlowType != null){
				return item.addedFlowType;
			}else {
				return '--';
			}
		}
		
		$scope.basicFlowType=function(item){
			if(item.basicFlowType != null){
				return item.basicFlowType;
			}else {
				return '--';
			}
		}
		
		
		
		// 给下拉框赋默认值
		if ($scope.serviceData.id !=null) {
			$scope.serviceData.serviceClassfication = {
				id : $scope.serviceData.serviceClassficationId
			};
			$scope.serviceData.supplier = serviceCommon.getBoxSelect($scope.serviceData.supplierId,$scope.supplierList,'number');
			if (!$scope.serviceData.quantity&&$scope.serviceData.quantity==0) {// 按时间
				$scope.serviceData.billing = $scope.billingList[0];
				$scope.serviceData.validityPeriodUnit = serviceCommon.getBoxSelect(
						$scope.serviceData.validityPeriodUnit, $scope.times,'number');
			} else {// 按数量
				$scope.serviceData.billing = $scope.billingList[1];
				$scope.serviceData.quantityUnit = serviceCommon.getBoxSelect(
						$scope.serviceData.quantityUnit, $scope.counts,'text');
				$scope.serviceData.validityPeriodUnit = serviceCommon.getBoxSelect(
						$scope.serviceData.validityPeriodUnit, $scope.times,'number');
			}

			// 当计费方式为按时间时，展示有效期下拉框，隐藏数量下拉框+数量输入框+隐藏有效期输入框
			if (!$scope.serviceData.quantityUnit) {
				$scope.showQuantityUnit = false;
				$scope.showQuantity = false;
				$scope.showValidityPeriodUnit = true;
				if($scope.serviceData.validityPeriod&&$scope.serviceData.validityPeriod!=0){
					$scope.showValidityPeriod = true;
				}			
			} else { // 当计费方式为按数量时，展示数量下拉框+数量输入框+有效期下拉框框,隐藏有效期输入框
				$scope.showQuantityUnit = true;
				$scope.showQuantity = true;
				$scope.showValidityPeriodUnit = true;
				if($scope.serviceData.validityPeriod){
					$scope.showValidityPeriod = true;
				}
			}

			// 添加页展示添加或编辑字样
			$scope.isEdit = $scope.serviceData.id !=null;
		}
		//计费方式
        $scope.isShow = function(item) {
			if(item.number==1){//选择时间
				$scope.showQuantityUnit=false;
				$scope.showQuantity=false;
				$scope.showValidityPeriodUnit=true;
				if($scope.serviceData.validityPeriodUnit==null||$scope.serviceData.validityPeriodUnit.number=="forever"){
					$scope.showValidityPeriod=false;
				}else{
					$scope.showValidityPeriod=true;
				}	
			}else if(item.number==2){//选择数量
				$scope.showQuantityUnit=true;
				$scope.showQuantity=true;
				$scope.showValidityPeriodUnit=true;
				if($scope.serviceData.validityPeriodUnit==null||$scope.serviceData.validityPeriodUnit.number=="forever"){
					$scope.showValidityPeriod=false;
				}else{
					$scope.showValidityPeriod=true;
				}
			}else if(item.number=="forever"){//选择永久有效时
				$scope.showValidityPeriod=false;
			}else if(item.number=="year"||item.number=="month"){//选择年或者月
				$scope.showValidityPeriod=true;
				$scope.showValidityPeriodUnit=true;
				
			}
		}
		
		
		// 校验服务名称是否重复
		$scope.asyncCallback = function(value) {
			var obj = {};
			var result= $q.defer();
			var origName=$scope.origName;
			//编辑服务时，输入的名称和原本的名称不一致时才判断
			if(origName!=value){
				obj.name = value;
				result=serviceDefine.existsByName(obj);
			}else{
				result = {result: true};
			}
			return result;
		}
		
		// 添加页面目录树选中节点时触发的方法
		var type;
		$scope.selectCallback = function(e, node) {
			type=node.node.original.type;
			//第一次进入页面不清空已选应用列表，后续每次选择分类都会清空已选应用列表
			if($scope.serviceData.serviceClassfication&&$scope.serviceData.serviceClassfication.id!=node.node.id){
				$scope.appList=[];
			}
			$scope.origclassficationId=node.node.id;
			if(type==200){//流量
				$scope.showCard=true;
				$scope.showApp=true;
				$scope.showDevice=false;
				$scope.showFlowPackage=true;
				$scope.cardRequired=false;
				$scope.appRequired=false;
				//编辑服务时绑定选中的卡
				param.cardList.forEach(function(val,index,arr){
					if(val==3){//重庆联通卡
						$scope.serviceData.cqltCard=true; 
					}else if(val==2){//广联繁睿卡
						$scope.serviceData.glfrCard=true; 
					}         
				})
			}else if(type==201){//应用
				$scope.showCard=false;
				$scope.showApp=true;
				$scope.showDevice=true;
				$scope.showFlowPackage=false;
				$scope.appRequired=true;
				$scope.deviceRequired=false;
				$scope.isRequiredApp=true;
			}else if(type==203){//短信
				$scope.showCard=false;
				$scope.showApp=true;
				$scope.showDevice=false;
				$scope.showFlowPackage=false;
				$scope.appRequired=false;
			}else{
				$scope.showCard=false;
				$scope.showApp=false;
				$scope.showDevice=false;
			}
		}
		
		//添加方法
		$scope.ok = function(status) {
			
			if ($scope.add_service_form.$valid) {
				var obj = {};
				var service = $scope.serviceData;
				//获取主键ID
				if(service.id){
					obj.id=service.id;
				}
				// 获取服务名称
				obj.name = service.name;
				//处理获取的应用列表，设备列表，以免转成json串后，长度太长，http请求会414
				var appInfoList=new Array();
				$.each($scope.appList, function(key, val) { 
					appInfoList[key]=$scope.appList[key].appCode;
				});
				var deviceInfoList=new Array();
				$.each($scope.deviceList, function(key, val) { 
					deviceInfoList[key]=$scope.deviceList[key].deviceId;
				});

				// 获取选中的分类
				if (service.serviceClassfication) {				
					var serviceClassficationId = service.serviceClassfication.id;
					var serviceClassficationName = service.serviceClassfication.text;
					obj.serviceClassficationId = serviceClassficationId;
					obj.serviceClassficationName = serviceClassficationName;
					if(type==200){//选择的分类类型为流量
				    	obj.cqltCard=service.cqltCard==true?1:0;
				    	obj.glfrCard=service.glfrCard==true?1:0;
				    	obj.appList=angular.toJson(appInfoList);
				    	obj.flowPackageList=angular.toJson($scope.flowPackageList);
				    }else if(type==201){//选择的分类类型为应用
				    	obj.appList=angular.toJson(appInfoList);
				    	obj.deviceList=angular.toJson(deviceInfoList); 
				    }else if(type==203){//选择的分类类型为短信
				    	obj.appList=angular.toJson(appInfoList);  	
				    }
					
				    
				}	
				
				// 获取选中的计费方式
				if (service.billing) {
					obj.validityPeriodUnit=service.validityPeriodUnit.number;//获取时间单位
					if(service.validityPeriodUnit.number!='forever'){
						obj.validityPeriod=service.validityPeriod;//获取时间值
					}else{
						obj.validityPeriod=0;
					}
					//按数量:获取数量单位和数量值
					if(service.billing.number==2){
						obj.quantityUnit=service.quantityUnit.text;
						obj.quantity=service.quantity;
					}else{
						obj.quantityUnit='';
						obj.quantity=0
					}
				}
				// 获取选中的供应商
				if (service.supplier && service.supplier.number != 0) {
					var supplierId = service.supplier.number;
					var supplierName = service.supplier.text;
					obj.supplierId = supplierId;
					obj.supplierName = supplierName;
				}
				// 获取选中的标签
				if (service.serviceTag) {
					var serviceTagId = service.serviceTag.number;
					var serviceTagName = service.serviceTag.text;
					obj.serviceTagId = serviceTagId;
					obj.serviceTagName = serviceTagName;
				}
				// 获取描述
				obj.description = service.description;
				// 保存or存草稿or上架
				obj.shelveStatus = status;
				
				serviceDefine.addService(obj, function(data) {
					if (data.result) {
				 		SweetAlertX.alert('','操作成功','success');
						$uibModalInstance.close(data);
					} else {
				 		SweetAlertX.alert('','操作失败','error');
					}
				});
			} else {
				$scope.add_service_form.submitted = true;
			}

		};
        //取消
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		// 添加应用
		$scope.addApp = function() {
			    var data={};
			    data.appList=$scope.appList;
			    data.type=type;
				// 打开弹出框
				var modalInstance = $uibModal.open({
					templateUrl : omsBasicHost + 'biz/servicemanage/servicedefine/addApp.html',
					controller : 'addAppList',
					size: 'lg',
					resolve : {
						param : function() {
							return data || {};
						}
					}
				});
				// 弹窗返回值
				modalInstance.result.then(function(data) {
					if (data) {
						$scope.appList=data;	
					}
				})
		}
		//添加流量套餐
		$scope.addFlowPackage = function() {
			    var data=$scope.flowPackageList;
				// 打开弹出框
				var modalInstance = $uibModal.open({
					templateUrl : omsBasicHost + 'biz/servicemanage/servicedefine/addFlowPackage.html',
					controller : 'addFlowPackageList',
					size: 'lg',
					resolve : {
						param : function() {
							return data || {};
						}
					}
				});
				// 弹窗返回值
				modalInstance.result.then(function(data) {
					if (data) {
						$scope.flowPackageList=data;	
					}
				})
		}
		// 添加设备
		$scope.addDevice = function() {
			    var data=$scope.deviceList;
				// 打开弹出框
				var modalInstance = $uibModal.open({
					templateUrl : omsBasicHost + 'biz/servicemanage/servicedefine/addDevice.html',
					controller : 'addDeviceList',
					size: 'lg',
					resolve : {
						param : function() {
							return data || {};
						}
					}
				});
				// 弹窗返回值
				modalInstance.result.then(function(data) {
					if (data) {
						$scope.deviceList=data;
					}
				})
		}
	}

	angular.module('serviceManager').controller('addServiceDefine', addServiceDefine);

})(angular);
