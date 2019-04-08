package com.lx.entity;

import java.io.Serializable;

public class Product implements Serializable{
    private Integer id;
    private String pname;
    private int typeid;
    private double price;
    private double oprice;
    private String sale;
    private int pnum;
    private String url;
    private String jqzurl;
    private ProType proType;
    public Product() {
    }

    public Product( String pname, int typeid, double price, double oprice, String sale, int pnum, String url, String jqzurl) {
        //this.id = id;
        this.pname = pname;
        this.typeid = typeid;
        this.price = price;
        this.oprice = oprice;
        this.sale = sale;
        this.pnum = pnum;
        this.url = url;
        this.jqzurl = jqzurl;
    }

    public Product(Integer id, String pname, int typeid, double price, double oprice, String sale, int pnum, String url, String jqzurl) {
        this.id = id;
        this.pname = pname;
        this.typeid = typeid;
        this.price = price;
        this.oprice = oprice;
        this.sale = sale;
        this.pnum = pnum;
        this.url = url;
        this.jqzurl = jqzurl;
    }

    public Product(Integer id, String pname, int typeid, double price, double oprice, String sale, int pnum, String url, String jqzurl, ProType proType) {
        this.id = id;
        this.pname = pname;
        this.typeid = typeid;
        this.price = price;
        this.oprice = oprice;
        this.sale = sale;
        this.pnum = pnum;
        this.url = url;
        this.jqzurl = jqzurl;
        this.proType = proType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public int getTypeid() {
        return typeid;
    }

    public void setTypeid(int typeid) {
        this.typeid = typeid;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getOprice() {
        return oprice;
    }

    public void setOprice(double oprice) {
        this.oprice = oprice;
    }

    public String getSale() {
        return sale;
    }

    public void setSale(String sale) {
        this.sale = sale;
    }

    public int getPnum() {
        return pnum;
    }

    public void setPnum(int pnum) {
        this.pnum = pnum;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getJqzurl() {
        return jqzurl;
    }

    public void setJqzurl(String jqzurl) {
        this.jqzurl = jqzurl;
    }

    public ProType getProType() {
        return proType;
    }

    public void setProType(ProType proType) {
        this.proType = proType;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", pname='" + pname + '\'' +
                ", typeid='" + typeid + '\'' +
                ", price=" + price +
                ", oprice=" + oprice +
                ", sale='" + sale + '\'' +
                ", pnum=" + pnum +
                ", url='" + url + '\'' +
                ", jqzurl='" + jqzurl + '\'' +
                ", proType=" + proType +
                '}';
    }
}
