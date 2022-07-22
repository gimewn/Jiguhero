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

    @Column(nullable = false)
    private String sido_name;

    @Column(nullable = false)
    private String gugun_name;

    @Column(nullable = false)
    private String dong_name;

    @Column(nullable = true)
    private long lat;

    @Column(nullable = true)
    private long lng;

    @Column(nullable = false)
    private String dong_code;
}
