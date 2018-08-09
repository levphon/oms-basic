angular
    .module('serviceManager', ['ngResource'])
   .factory('serviceCategory', ['$resource', function($resource) {
        return $resource('ServiceCategory/findTree.action', null, {
        	getTreeNode:{ url: omsBasicHost+'ServiceCategory/findById.action', method: 'GET' },
            getCategoryList:{ url: omsBasicHost+'ServiceCategory/findTree.action', method: 'GET', isArray: true },
            add:{ url: omsBasicHost+'ServiceCategory/save.action', method: 'GET' },
            edit:{ url: omsBasicHost+'ServiceCategory/update.action', method: 'GET' },
            del:{ url: omsBasicHost+'ServiceCategory/del.action', method: 'GET' },
            existsByName: { url: omsBasicHost+'ServiceCategory/existsByName.action', method: 'GET', isArray: false }
        });
    }])
    .factory('label', ['$resource', function($resource) {
        return $resource('Label/list.action', {}, {
            getServiceList: { url: omsBasicHost+'Label/list.action', method: 'GET', isArray: false },
            toAddService: { url: omsBasicHost+'Label/toAdd.action', method: 'GET', isArray: false },
            addService: { url: omsBasicHost+'Label/add.action', method: 'GET', isArray: false },
            delService: { url: omsBasicHost+'Label/delete.action', method: 'GET', isArray: false },
            updateService: { url: omsBasicHost+'Label/update.action', method: 'GET', isArray: false },
            existsByName: { url: omsBasicHost+'Label/existsByName.action', method: 'GET', isArray: false }
        });
    }])
    .factory('serviceDefine', ['$resource', function($resource) {
        return $resource('ServiceDefine/list.action', {}, {      	
            getServiceList: { url: omsBasicHost+'ServiceDefine/list.action', method: 'GET', isArray: false },
            toAddService: { url: omsBasicHost+'ServiceDefine/toAdd.action', method: 'GET', isArray: false },
            addService: { url: omsBasicHost+'ServiceDefine/add.action', method: 'POST', isArray: false },
            delService: { url: omsBasicHost+'ServiceDefine/delete.action', method: 'GET', isArray: false },
            updownService: { url: omsBasicHost+'ServiceDefine/updown.action', method: 'GET', isArray: false },  
            existsByName: { url: omsBasicHost+'ServiceDefine/existsByName.action', method: 'GET', isArray: false },
            getAppList:{url: omsBasicHost+'ServiceDefine/getAppList.action', method: 'GET', isArray: false },
            getDeviceList:{url: omsBasicHost+'ServiceDefine/getDeviceList.action', method: 'GET', isArray: false },
            getFlowPackageList:{url: omsBasicHost+'ServiceDefine/getFlowPackageList.action', method: 'GET', isArray: false },
            exportService:{url: omsBasicHost+'ServiceDefine/exportService.action', method: 'GET', isArray: false }
        });
    }])
     .factory('servicePackage', ['$resource', function($resource) {
        return $resource('servicePackage/list.action', {}, {      	
            getServicePackageList: { url: omsBasicHost+'ServicePackage/list.action', method: 'GET', isArray: false },
            toAddServicePackage: { url: omsBasicHost+'ServicePackage/toAdd.action', method: 'GET', isArray: false },
            addServicePackage: { url: omsBasicHost+'ServicePackage/add.action', method: 'POST', isArray: false },
            delServicePackage: { url: omsBasicHost+'ServicePackage/delete.action', method: 'GET', isArray: false },
            updownServicePackage: { url: omsBasicHost+'ServicePackage/updown.action', method: 'GET', isArray: false },  
            existsByName: { url: omsBasicHost+'ServicePackage/existsByName.action', method: 'GET', isArray: false },
            getDeviceList:{url: omsBasicHost+'ServicePackage/getDeviceList.action', method: 'GET', isArray: false },
            getServiceList:{url: omsBasicHost+'ServicePackage/getServiceList.action', method: 'POST', isArray: false },
            getMerchantList:{url: omsBasicHost+'ServicePackage/getMerchantList.action', method: 'GET', isArray: false },
            exportServicePackage:{url: omsBasicHost+'ServicePackage/exportServicePackage.action', method: 'GET', isArray: false }
        });
     }])
     .service('serviceCommon',function(){
    	 // 给下拉框赋值的公共方法
		this.getAllSelect = function (){
			var list = [];
			list.push({
				number : 0,
				text : '全部'
			});
			return list;
		}
		// 给下拉框赋值的公共方法
		this.getAddSelect = function (data,list) {
			for (var i = 0; i < data.length; i++) {
				list.push({
					number : i + 1,
					text : data[i]
				});
			}
			return list;
		}
		
		this.getBoxSelect = function (value,data,type) {
			for (var i = 0; i < data.length; i++) {
				if(type=='number'){
					if(data[i].number==value){
						return data[i];
					}else{
						return {number: "", text: "其他"};
					}
				}
				else if(type=='text'){
					if(data[i].text==value){
						return data[i];
					}else{
						return {number: "", text: "其他"};
					}
				}
				
			}
		}
     });
