package com.lx.controller;

import com.lx.entity.ProType;
import com.lx.service.ProTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@Scope("prototype")
@RequestMapping("/type")
public class ProTypeController {
    @Autowired
    ProTypeService proTypeService;
    @RequestMapping("getType")
    @ResponseBody
    public List<ProType> getType(){
        List<ProType> list=proTypeService.getType();
        return list;
    }
    @RequestMapping("addType")
    @ResponseBody
    public String addType(String type){
        ProType pt=new ProType(type);
        proTypeService.addType(pt);
        return "true";
    }
}
