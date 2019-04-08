package com.lx.controller;

import com.lx.entity.Product;
import com.lx.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@Scope("prototype")
@RequestMapping("/upload")
public class UploadProductController {
    @Autowired
    ProductService productService;
    @RequestMapping("addProduct")
    @ResponseBody
    public Map<String, Object> fileUpload(@RequestParam("pphoto") CommonsMultipartFile file ,String pname,Integer typeid,Double price,Double oprice, String sale,Integer pnum, HttpServletRequest request) {
//        String pname=request.getParameter("pname");
//        String

        Map<String,Object> map =new HashMap<>();
        map.put("result",false);
        // 获取文件名
        String fname = file.getOriginalFilename() ;
        System.out.println(fname);
        // 新文件名
//		String newFileName = UUID.randomUUID() + fname;
        String extName = fname.substring(fname.lastIndexOf(".")) ;
        String newFileName = new SimpleDateFormat("yyyyMMddHHmmssSSSS").format(new Date())+ extName ;
        System.out.println(newFileName);
        // 获得项目的路径
        // 获取ServletContext对象
        ServletContext sc = request.getServletContext();
        // 上传位置
        String path = sc.getRealPath("/prophoto") + "/"; // 设定文件保存的目录

//        File f = new File(path);
//        if (!f.exists() || ! f.isDirectory())   {
//            f.mkdirs();
//        }
//        if (!file.isEmpty()) {
            try {
                FileOutputStream fos = new FileOutputStream(path + newFileName);
                InputStream in = file.getInputStream();
                byte[] buffer = new byte[1024] ;
                int len = 0 ;
                while ((len = in.read(buffer, 0, buffer.length)) != -1) {
                    fos.write(buffer , 0 , len);
                }
                fos.close();
                in.close();
                System.out.println("上传图片到:" + path + newFileName);
                String url="prophoto/"+newFileName;
                String jqzurl=url;
                System.out.println(pname);
                System.out.println(typeid);
                Product p=new Product(pname,typeid,price,oprice,sale,pnum,url,jqzurl);
                productService.addProduct(p);


                map.put("result", true);
                //map.put("result1",newFileName);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("result", false);
            }
//        }
        //String userImg=path+newFileName;

        return map ;
    }

    @RequestMapping("updateProduct")
    @ResponseBody
    public Map<String, Object> updatefileUpload(@RequestParam("bphoto") CommonsMultipartFile file ,Integer id,@RequestParam("pname1")String pname,@RequestParam("typeid1")Integer typeid,@RequestParam("price1")Double price,@RequestParam("oprice1")Double oprice, @RequestParam("sale1")String sale,@RequestParam("pnum1")Integer pnum,String url, HttpServletRequest request) {
//        String pname=request.getParameter("pname");
//        String
        System.out.println(pname);
        Map<String, Object> map = new HashMap<>();
        map.put("result", false);
        // 获取文件名
        if (file.getOriginalFilename() == null || file.getOriginalFilename() == "") {
            String jqzurl=url;
            Product p = new Product(id, pname, typeid, price, oprice, sale, pnum, url, jqzurl);
            productService.updateProduct(p);
            map.put("result",true);
        } else {

            String fname = file.getOriginalFilename();
            System.out.println(fname);
            // 新文件名
//		String newFileName = UUID.randomUUID() + fname;
            String extName = fname.substring(fname.lastIndexOf("."));
            String newFileName = new SimpleDateFormat("yyyyMMddHHmmssSSSS").format(new Date()) + extName;
            System.out.println(newFileName);
            // 获得项目的路径
            // 获取ServletContext对象
            ServletContext sc = request.getServletContext();
            // 上传位置
            String path = sc.getRealPath("/prophoto") + "/"; // 设定文件保存的目录

//        File f = new File(path);
//        if (!f.exists() || ! f.isDirectory())   {
//            f.mkdirs();
//        }
//        if (!file.isEmpty()) {
            try {
                FileOutputStream fos = new FileOutputStream(path + newFileName);
                InputStream in = file.getInputStream();
                byte[] buffer = new byte[1024];
                int len = 0;
                while ((len = in.read(buffer, 0, buffer.length)) != -1) {
                    fos.write(buffer, 0, len);
                }
                fos.close();
                in.close();
                System.out.println("上传图片到:" + path + newFileName);
                String url1 = "prophoto/" + newFileName;
                String jqzurl = url1;
                System.out.println(pname);
                System.out.println(typeid);
                Product p = new Product(id, pname, typeid, price, oprice, sale, pnum, url1, jqzurl);
                productService.updateProduct(p);


                map.put("result", true);

                //map.put("result1",url);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("result", false);
            }
        }
//        }
        //String userImg=path+newFileName;

        return map ;
    }
}

