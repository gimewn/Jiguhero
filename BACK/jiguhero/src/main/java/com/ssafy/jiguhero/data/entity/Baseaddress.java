package com.ssafy.jiguhero.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    //@Column(nullable = false)
    //private String dongCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dongCode")
    private Dong dong;
}
