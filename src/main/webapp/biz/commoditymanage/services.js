angular
    /**
     * commoditymanage： 对应 config.js 中  商品管理.url
     */
    .module('commoditymanage', ['ngResource'])
    /**
     * commodityMng 存储API接口方法，在 XXXcontroller.js 中参数引入
     */
    .factory('commodityMng', ['$resource', function($resource) {
        return $resource('json/service.json', null, {
            getTreeNode:{ url: omsBasicHost+'category/findById', method: 'GET' },
            getCategoryList:{ url: omsBasicHost+'category/findTree', method: 'GET', isArray: true },
            add:{ url: omsBasicHost+'category/save', method: 'GET' },
            edit:{ url: omsBasicHost+'category/update', method: 'GET' },
            dele:{ url: omsBasicHost+'category/dele', method: 'GET' },
            total:{ url: omsBasicHost+'category/getTotal', method: 'GET' },
            existsByName: { url: omsBasicHost+'category/existsByName', method: 'GET', isArray: false }
        });
    }]).factory('goodsDefine', ['$resource', function($resource) {
        return $resource('json/service.json', null, {      	
            getGoodsList: { url: omsBasicHost+'goods/list.action', method:'GET', isArray: false },
            getOfflineSalesChannels: { url: omsBasicHost+'goods/OfflineSalesChannels', method: 'GET', isArray: true },
            addGoods: { url: omsBasicHost+'goods/add', method: 'POST', isArray: false},
            isShow: { url: omsBasicHost+'goods/show', method: 'GET', isArray: false},
            updateGoods: { url: omsBasicHost+'goods/update', method: 'POST', isArray: false},
            updateAuditing: { url: omsBasicHost+'goods/auditingUpdate', method: 'GET', isArray: false},
            updateBatchGoods:{ url: omsBasicHost+'goods/batchUpdate', method: 'POST', isArray: false},
            delGoods: { url: omsBasicHost+'goods/delete', method: 'GET', isArray: false },
            updownGoods: { url: omsBasicHost+'goods/updown', method: 'GET', isArray: false },
            auditingGoods: { url: omsBasicHost+'goods/auditing', method: 'GET', isArray: false },
            getGoods:{ url: omsBasicHost+'goods/findById', method: 'GET' },
            getServiceList: { url: omsBasicHost+'goods/getService', method: 'GET',isArray: false },
            findServicePackage:{ url: omsBasicHost+'goods/findServicePackage', method: 'GET' },
            getPermission: { url: omsBasicHost+'goods/isPermission', method: 'GET', isArray: false },
            existsByName: { url: omsBasicHost+'goods/existsByName', method: 'GET', isArray: false },
            exportGoods: { url: omsBasicHost+'goods/exportFile', method: 'GET', isArray: false},
        });
    }]);
