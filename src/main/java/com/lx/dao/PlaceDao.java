package com.lx.dao;

import com.lx.entity.Place;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceDao {

    @Select("select * from place")
    public List<Place> getPlace();

    public List<Place> getPlacePage(@Param("page")int page, @Param("size")int size, @Param("nameKey")String nameKey);

    public int getPlaceCount(@Param("nameKey")String nameKey);

    @Insert("insert into place(id,city,people) values(null,#{city},#{people})")
    public void addPlace(Place place);

    @Update("update place set city=#{city},people=#{people} where id=#{id}")
    public void updatePlace(Place place);

    @Delete("delete from place where id=#{id}")
    public void delPlace(int id);
}
