package com.lx.dao;

import com.lx.entity.Carts;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartsDao {

	
	public List<Carts> getAll(@Param("page") int page, @Param("size") int size, @Param("nameKey") String nameKey, @Param("name") String name);

	public int getCartCount(@Param("nameKey") String nameKey, @Param("name") String name);

	public void deleteMore(String[] ids);

	@Delete("delete from carts where id=#{id}")
	public void del(int id);


	public List<Carts> getAll1(@Param("nameKey") String nameKey, @Param("name") String name);

	@Update("update carts set pname=#{pname},price=#{price},num=#{num} where id=#{id}")
    public void update(@Param("id") Integer id,@Param("pname") String pname,@Param("price") double price,@Param("num") int num);

	@Insert("insert into carts values(null,#{uuid},#{typeid},#{pname},#{price},#{num},#{pdate},#{name},#{url})")
	public void addCart(Carts carts);
}
