package com.lx.dao;

import com.lx.entity.ProType;
import com.lx.entity.Product;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao {

    public List<Product> getSelectResult(@Param("page")int page, @Param("size")int size, @Param("nameKey")String nameKey, @Param("typeid")int typeid);


    public int getProductCount(@Param("nameKey")String nameKey,@Param("typeid")int typeid);

    @Select("select * from protype where tid=#{tid}")
    public ProType getProtype(int tid);

//    @Select("select * from product where id=#{id}")
//    @Results({
//            @Result(id=true,column="id",property="id"),
//            @Result(column="pname",property="pname"),
//            @Result(column="typeid",property="typeid"),
//            @Result(column="price",property="price"),
//            @Result(column="oprice",property="oprice"),
//            @Result(column="sale",property="sale"),
//            @Result(column="pnum",property="pnum"),
//            @Result(column="url",property="url"),
//            @Result(column="jqzurl",property="jqzurl"),
//            @Result(property="proType",column="tid",one=@One(fetchType= FetchType.LAZY,select="getProtype"))
//
//    })
    public Product getProductOne(Integer id);

    @Insert("insert into product values(null,#{pname},#{typeid},#{price},#{oprice},#{sale},#{pnum},#{url},#{jqzurl})")
    public void addProduct(Product product);

    @Delete("delete from product where id=#{id}")
    public void delProduct(Integer id);

    @Update("update product set pname=#{pname},typeid=#{typeid},price=#{price},oprice=#{oprice},sale=#{sale},pnum=#{pnum},url=#{url},jqzurl=#{jqzurl} where id=#{id}")
    public void updateProduct(Product product);
}
