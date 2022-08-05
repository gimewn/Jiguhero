package com.ssafy.jiguhero.data.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "Place")
public class Place {
    @Id
    @Column(name = "place_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long placeId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true, name = "road_address")
    private String roadAddress;

    @Column(nullable = true, name = "jibun_address")
    private String jibunAddress;

    @Column(nullable = true)
    private String phone;

    @Column(nullable = false)
    private String content;

    @Column(nullable = true)
    private String url;

    @Column(nullable = true)
    private long lat;

    @Column(nullable = true)
    private long lng;

    @OneToMany(mappedBy = "place")
    List<Review> review = new ArrayList<>();
}
