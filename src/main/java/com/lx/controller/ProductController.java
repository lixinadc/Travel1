package com.lx.controller;

import com.lx.bean.Page;
import com.lx.entity.Product;
import com.lx.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@Scope("prototype")
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;
    @RequestMapping("getPage")
    @ResponseBody
    public Page<Product> getPage(int page, int size, String nameKey, Integer typeid){
        return productService.getAllProducts( page,  size,  nameKey,  typeid);
    }

    @RequestMapping("getProductOne")
    @ResponseBody
    public Product getProductOne(Integer id){
        return productService.getProductOne(id);
    }

    @RequestMapping("getPageOne")
    @ResponseBody
    public Map<String ,Object> getPageOne(HttpServletRequest request, String nameKey, Integer typeid){
        int page=Integer.parseInt(request.getParameter("pageNumber"));
        int size=Integer.parseInt(request.getParameter("pageSize"));
        System.out.println(typeid);
        System.out.println(productService.getAllProducts(page,  size,  nameKey,  typeid));
        Page<Product> page1=new Page<>(page,size);
        Map<String,Object> map=new HashMap<>();
        ArrayList<Product> list=(ArrayList<Product>)productService.getAllProducts(page, size, nameKey, typeid).getData();
        System.out.println(list);
        System.out.println(productService.getAllProducts(page, size, nameKey, typeid).getCount());
        map.put("rows", list);
        map.put("total",productService.getAllProducts(page, size, nameKey, typeid).getCount());
        return map;
    }

    @RequestMapping("delProduct")
    @ResponseBody
    public String delProduct(Integer id){
        productService.delProduct(id);
        return "true";
    }


}
