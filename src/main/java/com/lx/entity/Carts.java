package com.lx.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lx.util.UUidUtil;

import java.io.Serializable;
import java.util.Date;

public class Carts implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String uuid;
	private int typeid;
	private String pname;
	private double price;
	private int num;
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date pdate;
	private String name;
	private String url;
	private ProType proType;
	public Carts() {
		super();
	}

	public Carts(int typeid, String pname, double price, int num, String name, String url) {
		//this.id=id;
		this.uuid = UUidUtil.getUuid();
		this.typeid = typeid;
		this.pname = pname;
		this.price = price;
		this.num = num;
		this.pdate = new Date();
		this.name = name;
		this.url = url;
	}

	public Carts(Integer id, String uuid, int typeid, String pname, double price, int num, Date pdate, String name, String url,
				 ProType proType) {
		super();
		this.id = id;
		this.uuid=uuid;
		this.typeid = typeid;
		this.pname = pname;
		this.price = price;
		this.num = num;
		this.pdate = pdate;
		this.name = name;
		this.url = url;
		this.proType = proType;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public int getTypeid() {
		return typeid;
	}
	public void setTypeid(int typeid) {
		this.typeid = typeid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public Date getPdate() {
		return pdate;
	}
	public void setPdate(Date pdate) {
		this.pdate = pdate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

	public ProType getProType() {
		return proType;
	}

	public void setProType(ProType proType) {
		this.proType = proType;
	}

	@Override
	public String toString() {
		return "Carts [id=" + id + ", uuid=" + uuid + ", typeid=" + typeid + ", pname=" + pname + ", price=" + price
				+ ", num=" + num + ", pdate=" + pdate + ", name=" + name + ", url=" + url + ", proType=" + proType
				+ "]";
	}

	
	
}
