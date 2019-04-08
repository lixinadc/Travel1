package com.lx.entity;

import java.io.Serializable;

public class ProType implements Serializable{
    private Integer tid;
    private String type;

	public ProType() {
		super();
	}

	public ProType(String type) {
		this.type = type;
	}

	public ProType(Integer tid, String type) {
		super();
		this.tid = tid;
		this.type = type;
	}


	public Integer getTid() {
		return tid;
	}

	public void setTid(Integer tid) {
		this.tid = tid;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "ProType [tid=" + tid + ", type=" + type + "]";
	}

}
