package com.lx.controller;

import com.lx.entity.Carts;
import com.lx.service.CartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@Scope("prototype")
@RequestMapping("/carts")
public class CartsController {
   @Autowired
   CartsService cartsService;
   @RequestMapping("getAll")
   @ResponseBody
	public Map<String, Object> getAll(HttpServletRequest request,HttpServletResponse response){
	   int page=Integer.parseInt(request.getParameter("pageNumber"));
	   int size=Integer.parseInt(request.getParameter("pageSize"));
	   String nameKey=request.getParameter("nameKey");
	   String name=request.getParameter("name");
	   Map<String, Object> map=new HashMap<>();
	   System.out.println(page);
	   System.out.println(size);
       ArrayList<Carts> list=(ArrayList<Carts>)cartsService.getAll(page, size, nameKey, name).getData();
	   System.out.println(list);
	   System.out.println(cartsService.getAll(page, size, nameKey, name).getCount());
	    map.put("total",cartsService.getAll(page, size, nameKey, name).getCount());

	   map.put("rows", list);
	   return map;
   }
   @RequestMapping("getTotalCount")
   @ResponseBody
	public int getTotalCount(HttpServletRequest request,HttpServletResponse response){
	  
	   String name=request.getParameter("name");
	   int count=cartsService.getTotalCount(name);
	   return count;
   }
   
   @RequestMapping("getSelectTotal")
   @ResponseBody
	public double getSelectTotal(HttpServletRequest request,HttpServletResponse response){

	   String nameKey=request.getParameter("nameKey");
	   String name=request.getParameter("name");
	   double total=cartsService.getAll1(nameKey, name);
	   System.out.println(total);
	   return total;
   }

	@RequestMapping("del")
    @ResponseBody
    public String del(HttpServletRequest request,HttpServletResponse response){
        String id=request.getParameter("id");
        cartsService.del(Integer.parseInt(id));

        return "true";
    }

    @RequestMapping("update")
    @ResponseBody
    public String update(HttpServletRequest request,HttpServletResponse response){
        String id=request.getParameter("editId");
        String pname=request.getParameter("pname");
        String price=request.getParameter("price");
        String num=request.getParameter("text_box1");

        cartsService.update(Integer.parseInt(id),pname,Double.parseDouble(price),Integer.parseInt(num));

        return "true";
    }

    @RequestMapping("deleteMore")
    @ResponseBody
    public String deleteMore(String delIds){
        String [] ids=delIds.split(",");

        cartsService.deleteMore(ids);

        return "true";
    }
    @RequestMapping("addCart")
    @ResponseBody
    public String addCart(Integer typeid,String pname,double price,int num,String name,String url){
        Carts carts=new Carts(typeid,pname,price,num,name,url);
        cartsService.addCart(carts);
        return "true";
    }


}
