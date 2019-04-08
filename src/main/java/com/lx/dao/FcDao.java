package com.lx.dao;

import com.lx.entity.Fc;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FcDao {

    @Select("select * from fc")
    public List<Fc> getFc();
}
