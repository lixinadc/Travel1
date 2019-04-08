package com.lx.controller;


import com.lx.entity.User;
import com.lx.service.UserService;
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
@RequestMapping("/uploadUser")
public class UploadUserController {
    @Autowired
    UserService userService;
    @RequestMapping("update")
    @ResponseBody
    public Map<String, Object> fileUpload(@RequestParam("uphoto") CommonsMultipartFile file ,Integer id, String username,  int sex, String email,String phone, String description,String userImg, HttpServletRequest request) {
//        String pname=request.getParameter("pname");
//        String
        System.out.println("文件名"+file.getOriginalFilename());
        Map<String,Object> map =new HashMap<>();
        map.put("result",false);
        if(file.getOriginalFilename()==null||file.getOriginalFilename()==""){
            User user = new User(id, username, email, sex, phone, description, userImg);
            userService.updateUser(user);
            map.put("result",true);
            map.put("result1",user);
        }else {
            // 获取文件名
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
            String path = sc.getRealPath("/userphoto") + "/"; // 设定文件保存的目录

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
                String userImg1 = "userphoto/" + newFileName;

                //String jqzurl=url;
//            System.out.println(pname);
//            System.out.println(typeid);
                //Product p=new Product(pname,typeid,price,oprice,sale,pnum,url,jqzurl);
                User user = new User(id, username, email, sex, phone, description, userImg1);
                userService.updateUser(user);


                map.put("result", true);
                map.put("result1", user);
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
