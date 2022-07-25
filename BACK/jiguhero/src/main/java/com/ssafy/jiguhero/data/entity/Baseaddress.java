package com.ssafy.jiguhero.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Baseaddress")
public class Baseaddress {
    @Id
    private long no;

    @Column(nullable = false, name = "sido_name")
    private String sidoName;

    @Column(nullable = false, name = "gugun_name")
    private String gugunName;

    @Column(nullable = false, name = "dung_name")
    private String dongName;

    @Column(nullable = true)
    private long lat;

    @Column(nullable = true)
    private long lng;

    @Column(nullable = false)
    private String dong_code;
}
