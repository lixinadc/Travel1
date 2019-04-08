package com.lx.dao;

import com.lx.entity.ProType;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProTypeDao {

    @Select("select * from protype")
    public List<ProType> getType();

    @Select("select count(*) from protype")
    public int countType();

    @Insert("insert into protype(id,type) values(null,#{type})")
    public void addType(ProType proType);

}
