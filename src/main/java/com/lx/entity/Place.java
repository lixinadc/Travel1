package com.lx.entity;

public class Place {

    private Integer id;
    private String city;
    private int people;

    public Place() {
    }

    public Place(String city, int people) {
        this.city = city;
        this.people = people;
    }

    public Place(Integer id, String city, int people) {
        this.id = id;
        this.city = city;
        this.people = people;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getPeople() {
        return people;
    }

    public void setPeople(int people) {
        this.people = people;
    }

    @Override
    public String toString() {
        return "Place{" +
                "id=" + id +
                ", city='" + city + '\'' +
                ", people=" + people +
                '}';
    }
}
