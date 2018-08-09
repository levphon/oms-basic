package com.glsx.oms.basic.biz.commoditymanage.controller;



import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.oreframework.boot.security.UserInfo;
import org.oreframework.boot.security.UserInfoHolder;
import org.oreframework.boot.security.cas.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.glsx.oms.basic.biz.commoditymanage.model.MallClassficationDto;
import com.glsx.oms.basic.biz.commoditymanage.model.MallClassficationVo;
import com.glsx.platform.goods.common.entity.MallClassfication;
import com.glsx.platform.goods.common.service.CommonQueryService;
import com.glsx.platform.goods.common.service.MallClassficationService;
import com.glsx.platform.goods.common.service.MallGoodsService;

@Controller
@RequestMapping(value = "/category")
public class GoodsCategoryController {

    private Logger logger = Logger.getLogger(GoodsCategoryController.class);

    @Reference(version="1.0.0")
    private MallClassficationService mallClassficationService;
    
    
    @Reference(version="1.0.0")
    private CommonQueryService commonQueryService;
    
    
    @Reference(version="1.0.0")
    private MallGoodsService mallGoodsService;
    
    @Autowired
	private UserInfoHolder userInfoHolder;
    
    @RequestMapping("/save")
    @ResponseBody
    public MallClassficationDto save(MallClassficationDto dto, HttpServletRequest request) {
        MallClassfication mallClassfication=new MallClassfication();
        try
        {
            BeanUtils.copyProperties(mallClassfication,dto);
            MallClassficationDto vo=new MallClassficationDto();
            User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
            mallClassfication.setCreateBy(userInfo.getUsername());
           // mallClassfication.setUpdateBy(userInfo.getName());
          //  mallClassfication.setCreateTime(new Date());
            if(mallClassfication.getDescription()!=null&&!"".equals(mallClassfication.getDescription())){
                mallClassfication.setDescription(mallClassfication.getDescription().trim());
            }
          
         //   mallClassfication.setUpdateTime(new Date());
            int key=mallClassficationService.save(mallClassfication);
            vo.setId(key);
            return vo;
        }
      
        catch (Exception e)
        {
            logger.error("catch an MallClassficationDto save in existsByName", e);
            e.printStackTrace();
        }
        return null;
    
        
    }
    
    
    @RequestMapping("/findTree")
    @ResponseBody
    public List<MallClassficationVo> findTree() throws Exception {
        List<MallClassficationVo> treeList=new ArrayList<MallClassficationVo>();
        List<MallClassfication> parentList=(List<MallClassfication>)commonQueryService.getRootMallClassfications();
        MallClassficationVo treeVo=null;
        MallClassficationVo parentVo=null;
        for(MallClassfication bo:parentList){
            List<MallClassfication> ChildList=(List<MallClassfication>)commonQueryService.getChildrenMallClassfications(bo.getId(), null).getData();
            for(MallClassfication child:ChildList){
                treeVo=new MallClassficationVo();
                treeVo.setId(child.getId());
                treeVo.setParent(String.valueOf(child.getParentId()));
                treeVo.setParent(child.getParentId()==0?"#":String.valueOf(child.getParentId()));
                treeVo.setText(child.getName());
                treeList.add(treeVo);
            }
        }
        return treeList;
    }
    
    @RequestMapping("/findById")
    @ResponseBody
    public MallClassficationDto findById(int id) throws Exception {
        MallClassfication vo=mallClassficationService.findById(id);
        MallClassficationDto dto=new MallClassficationDto();
        BeanUtils.copyProperties(dto,vo);
        return dto;
    }
    
    
    @RequestMapping("/update")
    @ResponseBody
    public MallClassficationDto update(MallClassficationDto dto,HttpServletRequest request) throws Exception {
        MallClassfication vo=new MallClassfication();
        User userInfo = userInfoHolder.getUserInfo(request.getParameter("jsessionid"));
        BeanUtils.copyProperties(vo,dto);
        vo.setUpdateBy(userInfo.getUsername());
        if(vo.getDescription()!=null&&!"".equals(vo.getDescription())){
            vo.setDescription(vo.getDescription().trim());
        }
        
        mallClassficationService.update(vo);
        return null;
    }
    
    
    @RequestMapping("/dele")
    @ResponseBody
    public MallClassficationDto dele(int id) throws Exception {
      mallClassficationService.delete(id);
      MallClassficationDto vo= new MallClassficationDto();
      
        return vo;
    }
    
    
    /**
     * @param service
     *            服务实体bean
     * @return Object
     */
    @RequestMapping(value = "/existsByName")
    @ResponseBody
    public Map<String, Boolean> existsByName(String  name) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();      
        try {
            // 调用dubbo
            boolean result= mallClassficationService.existsByName(name);
            logger.info("判断服务名是否重复:"+name+","+result);   
            map.put("result", !result);
        } catch (Exception e) {
            logger.error("catch an exception in existsByName", e);
            map.put("result", false);
        }
        return map;
    }
    
    @RequestMapping(value = "/getTotal")
    @ResponseBody
    public Map<String,Integer> getTotal(int id){
    {
        Map<String, Integer> map = new HashMap<String, Integer>();
        try
        {
            int total=mallGoodsService.getMallGoodsCountByMallClassficationId(id);
            map.put("result",total);
        }
        catch (Exception e)
        {
            logger.error("catch an exception in delete", e);
            map.put("result", 0);
        }
        return map;
    }
    
    }

    
    
    
}
