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
@Table(name = "Gugun")
public class Gugun {
    @Id
    private String gugun_code;

    @Column(nullable = false)
    private String gugun_name;

    @Column(nullable = false)
    private String sido_code;
}
