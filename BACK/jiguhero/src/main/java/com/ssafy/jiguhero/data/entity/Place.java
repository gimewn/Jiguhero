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
@Table(name = "Place")
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long place_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String road_address;

    @Column(nullable = true)
    private String jibun_address;

    @Column(nullable = true)
    private String phone;

    @Column(nullable = false)
    private String desc;

    @Column(nullable = true)
    private String url;

    @Column(nullable = true)
    private long lat;

    @Column(nullable = true)
    private long lng;

    @Column(nullable = false)
    private String category_code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_code")
    private Category category;
}
