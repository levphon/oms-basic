package com.glsx.oms.basic.biz.commoditymanage.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.InvocationTargetException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.log4j.Logger;
import org.oreframework.boot.security.UserInfo;
import org.oreframework.boot.security.UserInfoHolder;
import org.oreframework.boot.security.cas.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.glsx.cloudframework.exception.ServiceException;
import com.glsx.oms.basic.biz.commoditymanage.execl.OutOrderExec;
import com.glsx.oms.basic.biz.commoditymanage.model.Configuration;
import com.glsx.oms.basic.biz.commoditymanage.model.Goods;
import com.glsx.oms.basic.biz.commoditymanage.model.GoodsConstants;
import com.glsx.oms.basic.biz.commoditymanage.model.GoodsDto;
import com.glsx.oms.basic.biz.commoditymanage.model.GoodsExecl;
import com.glsx.oms.basic.biz.commoditymanage.model.QueryDto;
import com.glsx.oms.basic.biz.commoditymanage.model.ServiceDto;
import com.glsx.oms.basic.biz.commoditymanage.service.GoodsService;
import com.glsx.oms.basic.framework.config.GoodsProperty;
import com.glsx.platform.goods.common.dto.PageResult;
import com.glsx.platform.goods.common.entity.MallGoods;
import com.glsx.platform.goods.common.entity.MallGoodsImages;
import com.glsx.platform.goods.common.entity.ServiceDefinition;
import com.glsx.platform.goods.common.entity.ServicePackage;
import com.glsx.platform.goods.common.query.MallGoodsQuery;
import com.glsx.platform.goods.common.query.ServiceDefinitionQuery;
import com.glsx.platform.goods.common.query.ServicePackageQuery;
import com.glsx.platform.goods.common.service.CommonQueryService;
import com.glsx.platform.goods.common.service.MallClassficationService;
import com.glsx.platform.goods.common.service.MallGoodsService;
import com.glsx.platform.goods.common.service.ServiceDefinitionService;
import com.glsx.platform.goods.common.service.ServicePackageService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Controller
@RequestMapping(value = "/goods")
public class GoodsController {

    private Logger logger = Logger.getLogger(GoodsController.class);

    @Autowired
    private GoodsService goodsService;

    @Reference(version = "1.0.0")
    private MallGoodsService mallGoodsService;


    @Reference(version = "1.0.0")
    private ServicePackageService servicePackageService;

    @Reference(version = "1.0.0")
    private CommonQueryService commonQueryService;


    @Reference(version = "1.0.0")
    private ServiceDefinitionService serviceDefinitionServices;

    @Autowired
    private GoodsProperty goodsProperty;

    @Reference(version = "1.0.0")
    private MallClassficationService mallClassficationService;

    @Autowired
    private OutOrderExec outOrderExec;
    @Autowired
	private UserInfoHolder userInfoHolder;

    /**
     * @param service 线下销售渠道bean
     * @return Object
     */
    @RequestMapping(value = "/OfflineSalesChannels")
    @ResponseBody
    public List<Configuration> findOfflineSalesChannels() {
        List<Configuration> newList = new ArrayList<Configuration>();
        Configuration fist = new Configuration();
        fist.setConf_id(0);
        fist.setConf_value("全部");
        newList.add(fist);
        List<Configuration> list = goodsService.queryChannelList();
        for (Configuration c : list) {
            newList.add(c);
        }
        return newList;
    }


    @RequestMapping(value = "/findServicePackage")
    @ResponseBody
    public ServiceDto findServicePackage(int id, int type) throws Exception {
        ServiceDto vo = new ServiceDto();
        Object object = null;
        try {
            if (type == GoodsConstants.PRODUCT_SERVICE) {                                          //商品服务
                object = serviceDefinitionServices.findById(id, false);
            } else if (type == GoodsConstants.PRODUCT_PACKAGE) {                                     //服务套餐
                object = servicePackageService.findById(id, false);
            }
            BeanUtils.copyProperties(vo, object);
            vo.setType(type);
            return vo;
        } catch (ServiceException e) {
            e.printStackTrace();
        }
        return null;

    }

    @RequestMapping(value = "/getService")
    @ResponseBody
    public Map<String, Object> getService(int type, String queryText) throws Exception {
        type = type + 1;
        Map<String, Object> map = new HashMap<String, Object>();
        PageResult pageResult = null;
        List<ServiceDto> list = new ArrayList<ServiceDto>();
        if (type == GoodsConstants.PRODUCT_SERVICE) {                                          //商品服务
            ServiceDefinition serviceDefinition = new ServiceDefinition();
            serviceDefinition.setShelveStatus(2);
            pageResult = commonQueryService.getServiceDefinitions(serviceDefinition, convertQueryObject(type, queryText) == null ? null : (ServiceDefinitionQuery) convertQueryObject(type, queryText));
        } else if (type == GoodsConstants.PRODUCT_PACKAGE) {                                    //服务套餐
            ServicePackage servicePackage = new ServicePackage();
            servicePackage.setShelveStatus(2);
            pageResult = commonQueryService.getServicePackages(servicePackage, convertQueryObject(type, queryText) == null ? null : (ServicePackageQuery) convertQueryObject(type, queryText));
        }

        for (Object object : pageResult.getData()) {
            ServiceDto vo = new ServiceDto();
            BeanUtils.copyProperties(vo, object);
            vo.setType(type - 1);
            list.add(vo);
        }
        map.put("ServiceList", list);
        return map;

    }


    private Object convertQueryObject(int type, String queryText) throws Exception {
        if (queryText != null && !"".equals(queryText)) {
            QueryDto query = new QueryDto();
            query.setPageNo(null);
            query.setPageSize(null);
            query.setQueryText(queryText);
            Object vo = null;
            if (type == GoodsConstants.PRODUCT_SERVICE) {
                vo = new ServiceDefinitionQuery();
            } else if (type == GoodsConstants.PRODUCT_PACKAGE) {
                vo = new ServicePackageQuery();
            }
            BeanUtils.copyProperties(vo, query);
            return vo;
        }
        return null;
    }
    
    /*方法二：推荐，速度最快
     * 判断是否为整数 
     * @param str 传入的字符串 
     * @return 是整数返回true,否则返回false 
   */

    public static boolean isInteger(String str) {
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
        return pattern.matcher(str).matches();
    }


    @RequestMapping(value = "/list")
    @ResponseBody
    public Map<String, Object> list(GoodsDto dto, Integer pageStart, Integer pageSize, Integer currentPage) throws Exception, InvocationTargetException {
        Map<String, Object> map = new HashMap<String, Object>();
        PageResult result = new PageResult();
        MallGoodsQuery mallGoodsQuery = new MallGoodsQuery();
        // int totalPages =( pageStart % pageSize == 0 ? pageStart / pageSize: (pageStart / pageSize)) + 1;
        MallGoods mallGoods = new MallGoods();
        BeanUtils.copyProperties(mallGoods, dto);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            if (dto.getIsAudit() != null) {
                mallGoodsQuery.setIsAudit(1); //表示用审核的页面查询
            }
            mallGoodsQuery.setCardTypeId(dto.getCardName());
            mallGoodsQuery.setQueryText(dto.getQueryText() == null ? "" : dto.getQueryText());
            mallGoodsQuery.setPageNo(currentPage);
            mallGoodsQuery.setPageSize(pageSize);
            if (dto.getStartTime() != null && !"".equals(dto.getStartTime())) {
                mallGoodsQuery.setStartTime(sdf.parse(dto.getStartTime()));
            }
            if (dto.getEndTime() != null && !"".equals(dto.getEndTime())) {
                mallGoodsQuery.setEndTime(sdf.parse(dto.getEndTime()));
            }
            
            if(dto.getDeviceIds()==null){//没有输入设备id或者名称
            	result = commonQueryService.getMallGoods(mallGoods, mallGoodsQuery);
            }
            if(dto.getDeviceIds()!=null && !dto.getDeviceIds().equals("")){//输入了设备id或者根据设备名称能反查到设备id
 				List<Integer> deviceIdList=JSON.parseArray(dto.getDeviceIds(),Integer.class);
 				mallGoodsQuery.setDeviceIds(deviceIdList);
 				result = commonQueryService.getMallGoods(mallGoods, mallGoodsQuery);
 			}
            if(dto.getDeviceIds()!=null &&dto.getDeviceIds().equals("")){//输入设备名称反查不到设备id
            	result.setData(new ArrayList<MallGoods>());
            }
            long recordsTotal = result.getCount()==null?0:result.getCount();
            map.put("data", result.getData());
            map.put("recordsTotal", recordsTotal);
            map.put("draw", recordsTotal);
            map.put("recordsFiltered", recordsTotal);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }


    /**
     * @param Goods 商品实体bean
     * @return Goods
     * @throws Exception
     */
    @RequestMapping(value = "/findById")
    @ResponseBody
    public GoodsDto findById(int id) throws Exception {
        MallGoods goods = mallGoodsService.findById(id, true);
        GoodsDto dto = new GoodsDto();
        try {
            BeanUtils.copyProperties(dto, goods);
            if (dto.getMallGoodsImages() != null && dto.getMallGoodsImages().size() > 0) {
                String pic[] = new String[dto.getMallGoodsImages().size() - 3];
                List<String> list = new ArrayList<String>();
                int i=0;
                for (MallGoodsImages img : dto.getMallGoodsImages()) {
                    if (img.getIcon() == true && img.getImgType() == 1) {
                        dto.setIonc1(img.getUri());
                    } else {
                        list.add(img.getUri());
                    }
                    if (img.getIcon() == true && img.getImgType() == 5) {
                        dto.setIonc2(img.getUri());
                    } else {
                        list.add(img.getUri());
                    }
                    if (img.getIcon() == true && img.getImgType() == 3) {
                        dto.setIonc3(img.getUri());
                    } else {
                        list.add(img.getUri());
                    }
                    if(img.getIcon() == false && img.getImgType() == 2){
                    	pic[i] = img.getUri();
                    	i++;
                    }
                }
                i = 0;
                //String[] array = (String[]) list.toArray(new String[list.size()]);
                dto.setPic(pic);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        return dto;
    }


    /**
     * @param Goods 商品实体bean
     * @return Object
     */
    @RequestMapping(value = "/toAdd")
    public Map<String, Object> toAdd(Goods goods) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {

        } catch (Exception e) {
            logger.error("catch an exception in toAdd", e);
        }
        return map;
    }

    /**
     * @param Goods 商品实体bean
     * @return Object
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Boolean> add(@RequestBody GoodsDto goods, HttpServletRequest request) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {

            List<MallGoodsImages> mallGoodsImages = new ArrayList<MallGoodsImages>();
            String ico1 = goods.getIonc1();
            String ico2 = goods.getIonc2();
            String ico3 = goods.getIonc3();
            MallGoodsImages icoVo1 = new MallGoodsImages();
            icoVo1.setIcon(true);
            icoVo1.setImgType(1);
            icoVo1.setUri(ico1);
            MallGoodsImages icoVo2 = new MallGoodsImages();
            icoVo2.setIcon(true);
            icoVo2.setImgType(5);
            icoVo2.setUri(ico2);
            MallGoodsImages icoVo3 = new MallGoodsImages();
            icoVo3.setIcon(true);
            icoVo3.setImgType(3);
            icoVo3.setUri(ico3);
            mallGoodsImages.add(icoVo1);
            mallGoodsImages.add(icoVo2);
            mallGoodsImages.add(icoVo3);
            String pic[] = goods.getPic();
            MallGoodsImages picVo = null;
            if (pic != null) {
                for (int i = 0; i < pic.length; i++) {
                    picVo = new MallGoodsImages();
                    picVo.setIcon(false);
                    picVo.setImgType(2);
                    picVo.setUri(pic[i]);
                    mallGoodsImages.add(picVo);
                }
            }
            goods.setMallGoodsImages(mallGoodsImages);
            MallGoods mallGoods = new MallGoods();
            BeanUtils.copyProperties(mallGoods, goods);
            User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
            mallGoods.setCreateBy(userInfo.getUsername());
            mallGoods.setUpdateBy(userInfo.getUsername());
            //  mallGoods.setCreateTime(new Date());
            //  mallGoods.setUpdateTime(new Date());
            // 调用dubbo
            mallGoodsService.save(mallGoods);
            logger.info("添加商品:" + mallGoods.toString());
            map.put("result", true);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", false);
        }
        return map;
    }


    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Boolean> update(@RequestBody GoodsDto goods) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {
            List<MallGoodsImages> mallGoodsImages = new ArrayList<MallGoodsImages>();
            String ico1 = goods.getIonc1();
            String ico2 = goods.getIonc2();
            String ico3 = goods.getIonc3();
            MallGoodsImages icoVo1 = new MallGoodsImages();
            icoVo1.setIcon(true);
            icoVo1.setImgType(1);
            icoVo1.setUri(ico1);
            icoVo1.setGoodsId(goods.getId());
            mallGoodsImages.add(icoVo1);
            MallGoodsImages icoVo2 = new MallGoodsImages();
            icoVo2.setIcon(true);
            icoVo2.setImgType(5);
            icoVo2.setUri(ico2);
            icoVo2.setGoodsId(goods.getId());
            mallGoodsImages.add(icoVo2);
            MallGoodsImages icoVo3 = new MallGoodsImages();
            icoVo3.setIcon(true);
            icoVo3.setImgType(3);
            icoVo3.setUri(ico3);
            icoVo3.setGoodsId(goods.getId());
            mallGoodsImages.add(icoVo3);
            String pic[] = goods.getPic();
            MallGoodsImages picVo = null;
            if (pic != null) {
                for (int i = 0; i < pic.length; i++) {
                    picVo = new MallGoodsImages();
                    picVo.setIcon(false);
                    picVo.setImgType(2);
                    picVo.setUri(pic[i]);
                    picVo.setGoodsId(goods.getId());
                    mallGoodsImages.add(picVo);
                }
            }
            goods.setMallGoodsImages(mallGoodsImages);
            MallGoods mallGoods = new MallGoods();
            BeanUtils.copyProperties(mallGoods, goods);
            // 调用dubbo
            mallGoodsService.update(mallGoods);
            logger.info("添加商品:" + mallGoods.toString());
            map.put("result", true);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result", false);
        }
        return map;
    }


    @RequestMapping(value = "/show")
    @ResponseBody
    public Map<String, Boolean> isShow(int id, int displayed) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {

            MallGoods mallGoods = new MallGoods();
            mallGoods.setId(id);
            mallGoods.setDisplayed((byte) displayed);
            // 调用dubbo
            mallGoodsService.update(mallGoods);
            logger.info("更新商品:" + mallGoods.toString());
            map.put("result", true);
        } catch (Exception e) {
            map.put("result", false);
        }
        return map;
    }

    @RequestMapping(value = "/auditingUpdate")
    @ResponseBody
    public Map<String, Boolean> update(Goods goods) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {
            MallGoods mallGoods = new MallGoods();
            BeanUtils.copyProperties(mallGoods, goods);
            // 调用dubbo
            mallGoodsService.update(mallGoods);
            logger.info("添加商品:" + mallGoods.toString());
            map.put("result", true);
        } catch (Exception e) {
            map.put("result", false);
        }
        return map;
    }

    @RequestMapping(value = "/batchUpdate")
    @ResponseBody
    public Map<String, Boolean> batchUpdate(@RequestBody String listJson) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {

            Gson gson = new Gson();
            List<MallGoods> redisList = gson.fromJson(listJson, new TypeToken<List<MallGoods>>() {
            }.getType());
            // 调用dubbo
            mallGoodsService.updateBatch(redisList);
            //    logger.info("添加商品:" + mallGoods.toString());
            map.put("result", true);
        } catch (Exception e) {
            map.put("result", false);
        }
        return map;
    }


    /**
     * @param Goods 商品实体bean
     * @return Object
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Map<String, Boolean> delete(int id) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {
            mallGoodsService.delete(id);
            logger.info("删除商品:" + id);
            map.put("result", true);
        } catch (Exception e) {
            logger.error("catch an exception in delete", e);
            map.put("result", false);
        }
        return map;
    }


    /**
     * 上架
     *
     * @param Goods 商品实体bean
     * @return Object
     */
    @RequestMapping(value = "/updown")
    @ResponseBody
    public Map<String, Boolean> updown(Integer[] ids, int status) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {
            List<Integer> paramList = new ArrayList<Integer>();
            Collections.addAll(paramList, ids);
            mallGoodsService.updateShelveStatus(paramList, status);
            // 调用dubbo
            logger.info("上下架商品:" + ids.toString());
            map.put("result", true);
        } catch (Exception e) {
            logger.error("catch an exception in delete", e);
            map.put("result", false);
        }
        return map;
    }


    /**
     * 审核
     *
     * @param Goods 商品实体bean
     * @return Object
     */
    @RequestMapping(value = "/auditing")
    @ResponseBody
    public Map<String, Boolean> auditing(Integer ids[], int status) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {
            List<Integer> paramList = new ArrayList<Integer>();
            paramList = Arrays.asList(ids);
            mallGoodsService.updateAuditingStatus(paramList, status);

            // 调用dubbo
            logger.info("上下架商品:" + paramList.toString());
            map.put("result", true);
        } catch (Exception e) {
            logger.error("catch an exception in delete", e);
            map.put("result", false);
        }
        return map;
    }


    //判断是否有权限 

    @RequestMapping(value = "/isPermission")
    @ResponseBody
    public Map<String, Boolean> isPermission(HttpServletRequest request) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {
            boolean exists = false;
            //获取用户的权限
            String users[] = goodsProperty.getUser().split(",");
            User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
            for (String s : users) {
                if (s.equals(userInfo.getUsername())) {
                    exists = true;
                    break;
                }
            }
            map.put("result", exists);
        } catch (Exception e) {
            logger.error("catch an exception in delete", e);
            map.put("result", false);
        }
        return map;
    }


    /**
     * @param Goods 商品实体bean
     * @return Object
     */
    @RequestMapping(value = "/existsByName")
    @ResponseBody
    public Map<String, Boolean> existsByName(String name) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        try {
            // 调用dubbo
            boolean b = mallGoodsService.existsByName(name);

            logger.info("判断服务名是否重复:" + name);
            map.put("result", b ? false : true);
        } catch (Exception e) {
            logger.error("catch an exception in delete", e);
            map.put("result", false);
        }
        return map;
    }


    @RequestMapping(value = "/addPhoto", method = RequestMethod.POST)
    @ResponseBody
    public String addPhoto(@RequestParam(value = "file") MultipartFile uploadFiles, String type) {
        String downUrl = null;
        PostMethod postMethod = null;
        try {
            HttpClient httpclient = new HttpClient();
            String fileName = uploadFiles.getOriginalFilename();
            Long size = uploadFiles.getSize();
            String url = goodsProperty.getUrl();
            String uploadName = URLEncoder.encode(fileName, "utf-8");
            postMethod = new PostMethod(url + "?user=goods&fname=" + uploadName + "&fsize=" + size);
            List<Header> headers = new ArrayList<Header>();
            headers.add(new Header("Content-Length", String.valueOf(size)));
            httpclient.getHostConfiguration().getParams().setParameter("http.default-headers", headers);
            postMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());
            postMethod.setRequestBody(uploadFiles.getInputStream());
            if (type.equals("1")) {
                if (!checkImagePixes(uploadFiles.getInputStream(), goodsProperty.getWidth_one(), goodsProperty.getHeigh_one())) {
                    return "1";
                }
            } else if (type.equals("2")) {
                if (!checkImagePixes(uploadFiles.getInputStream(), goodsProperty.getWidth_two(), goodsProperty.getHeigh_two())) {
                    return "1";
                }
            } else if (type.equals("3")) {
                if (!checkImagePixes(uploadFiles.getInputStream(), goodsProperty.getWidth_three(), goodsProperty.getHeigh_three())) {
                    return "1";
                }
            } else if (type.equals("5")) {
                if (!checkImagePixes(uploadFiles.getInputStream(), goodsProperty.getWidth_four(), goodsProperty.getHeigh_four()) && !checkImagePixes(uploadFiles.getInputStream(), goodsProperty.getWidth_five(), goodsProperty.getHeigh_five())) {
                    return "1";
                }
            } else if (type.equals("6")) {
                if (!checkImagePixes(uploadFiles.getInputStream(), goodsProperty.getWidth_six(), goodsProperty.getHeigh_six())) {
                    return "1";
                }
            }

            // （4）执行postMethod
            int statusCode = httpclient.executeMethod(postMethod);
            if (statusCode != HttpStatus.SC_OK) {
                System.err.println("Method failed:" + postMethod.getStatusLine());
            }
            InputStream inputStream = postMethod.getResponseBodyAsStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
            StringBuffer stringBuffer = new StringBuffer();
            String str = "";
            while ((str = br.readLine()) != null) {
                stringBuffer.append(str);
            }
            System.out.print(stringBuffer.toString());
            String reuslt = stringBuffer.toString();
            JSONObject json = JSONObject.fromObject(reuslt);
            String results = json.get("results").toString();
            JSONObject jsons = JSONObject.fromObject(results);
            downUrl = jsons.get("downUrl").toString();
        } catch (Exception e) {

            // 发生致命的异常，可能是协议不对或者返回的内容有问题

            System.out.println("Please check your provided http address!");
            e.printStackTrace();
        } finally {

            // 释放连接

            postMethod.releaseConnection();


        }
        return downUrl;

    }


    public static boolean checkImagePixes(InputStream is, int width, int height) throws IOException {
        if (null == is) return false;
        BufferedImage image = ImageIO.read(is);
        if (image.getWidth() == width && image.getHeight() == height) {
            return true;
        }
        return false;
    }


    @RequestMapping(value = "/exportFile", method = RequestMethod.GET)
    @ResponseBody
	public Map<String, String> exportFile(GoodsDto dto) {
		String downUrl = null;
		Map<String, String> map = new HashMap<String, String>();
		try {
			PageResult result = new PageResult();
			MallGoodsQuery mallGoodsQuery = new MallGoodsQuery();
			MallGoods mg = new MallGoods();
			BeanUtils.copyProperties(mg, dto);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			if (dto.getIsAudit() != null) {
				mallGoodsQuery.setIsAudit(1); // 表示用审核的页面查询
			}
			mallGoodsQuery.setCardTypeId(dto.getCardName());
			mallGoodsQuery.setQueryText(dto.getQueryText() == null ? "" : dto.getQueryText());
			mallGoodsQuery.setPageNo(1);
			mallGoodsQuery.setPageSize(10000);
			if (dto.getStartTime() != null && !"".equals(dto.getStartTime())) {
				mallGoodsQuery.setStartTime(sdf.parse(dto.getStartTime()));
			}
			if (dto.getEndTime() != null && !"".equals(dto.getEndTime())) {
				mallGoodsQuery.setEndTime(sdf.parse(dto.getEndTime()));
			}

			if (dto.getDeviceIds() == null) {// 没有输入设备id或者名称
				result = commonQueryService.getMallGoods(mg, mallGoodsQuery);
			}
			if (dto.getDeviceIds() != null && !dto.getDeviceIds().equals("")) {// 输入了设备id或者根据设备名称能反查到设备id
				List<Integer> deviceIdList = JSON.parseArray(dto.getDeviceIds(), Integer.class);
				mallGoodsQuery.setDeviceIds(deviceIdList);
				result = commonQueryService.getMallGoods(mg, mallGoodsQuery);
			}
			if (dto.getDeviceIds() != null && dto.getDeviceIds().equals("")) {// 输入设备名称反查不到设备id
				result.setData(new ArrayList<MallGoods>());
			}

			List<MallGoods> list = (List<MallGoods>) result.getData();
			List<GoodsExecl> execllist = new ArrayList<GoodsExecl>();
			for (MallGoods mallGoods : list) {
				// 审核状态 1 成功， 2 失败,3上架审核中，4下降审核中
				GoodsExecl execl = new GoodsExecl();
				BeanUtils.copyProperties(execl, mallGoods);
				if (execl.getAuditingStatus() != null) {
					if (execl.getAuditingStatus() == 1) {
						execl.setAuditingStatusString("审核成功");
					} else if (execl.getAuditingStatus() == 2) {
						execl.setAuditingStatusString("审核失败");
					} else if (execl.getAuditingStatus() == 3) {
						execl.setAuditingStatusString("上架审核中");
					} else if (execl.getAuditingStatus() == 4) {
						execl.setAuditingStatusString("下降审核中");
					}
				}
				// 上架状态: 1 草稿， 2 上架， 3 下架
				if (execl.getShelveStatus() != null) {
					if (execl.getShelveStatus() == 1) {
						execl.setShelveStatusString("草稿");
					} else if (execl.getShelveStatus() == 2) {
						execl.setShelveStatusString("上架");
					} else if (execl.getShelveStatus() == 3) {
						execl.setShelveStatusString("下架");
					}
				}

				if (execl.getDisplayed() != null) {
					if (execl.getDisplayed() == 0) {
						execl.setDisplayedString("否");
					} else {
						execl.setDisplayedString("是");
					}
				}
                if (execl.getRecommend() != null) {
                    if (execl.getRecommend() == 0) {
                        execl.setRecommendString("否");
                    } else {
                        execl.setRecommendString("是");
                    }
                }
				execllist.add(execl);

			}
			downUrl = outOrderExec.execlGoodsPath(execllist);
			map.put("url", downUrl);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}


}
