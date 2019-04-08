package com.lx.service;

import com.lx.entity.Fc;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FcService {

    public List<Fc> getFc();
}
