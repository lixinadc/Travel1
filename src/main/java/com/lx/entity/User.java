package com.lx.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lx.util.MD5Tools;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable{
   /**
	 * 
	 */
   private static final long serialVersionUID = 1L;
   private Integer id;
   private String username;
   private String email;
   private String password;
   private int sex;
   private String phone;
   private String description;
   private Integer usertype;
   @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
   private Date usereg;
   private String userImg;
   
   
	public User() {
		
	}


	public User(String username, String password,Integer usertype) {
		super();
		this.username = username;
		this.password = MD5Tools.buildMD5String(password);
		this.usertype=usertype;
	}


	public User(Integer id, String username, String email, String password, int sex, String phone, String description) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = MD5Tools.buildMD5String(password);
		this.sex = sex;
		this.phone = phone;
		this.description = description;
		this.usertype = 1;
		this.usereg = new Date();
		this.userImg = "img/user.png";
	}

	public User(Integer id, String username,String email,int sex,  String phone, String description, String userImg) {
		this.id = id;
		this.username = username;
		this.sex=sex;
		this.email = email;
		this.phone = phone;
		this.description = description;
		this.usertype = 1;
		this.userImg = userImg;
	}

	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}

	public boolean checkPwd(String password){
    	return this.password.equals(MD5Tools.buildMD5String(password));
    }
	
	public void setPassword(String password) {
		this.password = MD5Tools.buildMD5String(password);
	}


	public int getSex() {
		return sex;
	}


	public void setSex(int sex) {
		this.sex = sex;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Integer getUsertype() {
		return usertype;
	}


	public void setUsertype(Integer usertype) {
		this.usertype = usertype;
	}


	public Date getUsereg() {
		return usereg;
	}


	public void setUsereg(Date usereg) {
		this.usereg = usereg;
	}


	public String getUserImg() {
		return userImg;
	}


	public void setUserImg(String userImg) {
		this.userImg = userImg;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", sex="
				+ sex + ", phone=" + phone + ", description=" + description + ", usertype=" + usertype + ", usereg="
				+ usereg + ", userImg=" + userImg + "]";
	}
   
}
