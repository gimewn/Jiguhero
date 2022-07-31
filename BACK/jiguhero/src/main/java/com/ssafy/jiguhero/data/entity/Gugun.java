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
@Table(name = "Gugun")
public class Gugun {
    @Id
    @Column(name = "gugun_code")
    private String gugunCode;

    @Column(nullable = false, name = "gugun_name")
    private String gugunName;

    //Column(nullable = false, name = "sido_code")
    //private String sidoCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sidoCode")
    private Sido sido;

    @OneToMany(mappedBy = "gugun")
    List<Dong> dong = new ArrayList<>();
}
