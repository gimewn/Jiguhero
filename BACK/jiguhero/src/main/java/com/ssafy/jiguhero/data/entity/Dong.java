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
@Table(name = "Dong")
public class Dong {
    @Id
    private String dong_code;

    @Column(nullable = false)
    private String dong_name;

    @Column(nullable = false)
    private String sido_code;

    @Column(nullable = false)
    private String gugun_code;
}
