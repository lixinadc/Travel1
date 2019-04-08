package com.lx.entity;

public class Fc {
    private Integer id;
    private String year;
    private int num;

    public Fc() {
    }

    public Fc(Integer id, String year, int num) {
        this.id = id;
        this.year = year;
        this.num = num;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Override
    public String toString() {
        return "Fc{" +
                "id=" + id +
                ", year='" + year + '\'' +
                ", num=" + num +
                '}';
    }
}
