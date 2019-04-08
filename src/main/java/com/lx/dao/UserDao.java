package com.lx.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.lx.entity.User;

import java.util.List;

@Repository
public interface UserDao {
   
	@Insert("insert into tb_user1(id,username,email,password,sex,phone,description,usertype,usereg,userImg) values(null,#{username},#{email},#{password},#{sex},#{phone},#{description},#{usertype},#{usereg},#{userImg})")
	public int addUser(User user);
	
	@Select("select * from tb_user1 where username=#{username}")
    public User isExist(String username);
	
	@Select("select * from tb_user1 where username=#{username} and password=#{password} and usertype=#{usertype}")
	public User login(User user);


	public List<User> getSelectUser(@Param("page")int page, @Param("size")int size, @Param("nameKey")String nameKey,@Param("usertype") Integer usertype);


	public int getUserCount(@Param("nameKey")String nameKey,@Param("usertype") Integer usertype);

	@Update("update tb_user1 set username=#{username},email=#{email},sex=#{sex},phone=#{phone},description=#{description},userImg=#{userImg} where id=#{id}")
	public void updateUser(User user);
}
