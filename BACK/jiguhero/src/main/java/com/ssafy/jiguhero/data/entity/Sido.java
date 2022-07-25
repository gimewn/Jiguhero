package com.ssafy.jiguhero.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Sido")
public class Sido {
    @Id
    @Column(name = "sido_code")
    private String sidoCode;

    @Column(nullable = false, name = "sido_name")
    private String sidoName;

    @OneToMany(mappedBy = "sido")
    List<Gugun> gugun = new ArrayList<>();

    @OneToMany(mappedBy = "sido")
    List<Dong> dong = new ArrayList<>();

}
