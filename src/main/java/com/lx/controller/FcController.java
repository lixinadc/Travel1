package com.lx.controller;

import com.lx.entity.Fc;
import com.lx.service.FcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@Scope("prototype")
@RequestMapping("/fcke")
public class FcController {
    @Autowired
    FcService fcService;
    @RequestMapping("count1")
    @ResponseBody
    public List<Fc> getFc(){
        List<Fc> list=fcService.getFc();
        return list;
    }
}
