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
@Table(name = "Conn_Ground")
public class Conn_Ground {
    @Id
    @Column(name = "conn_ground_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long connGroundId;

//    @Column(nullable = false)
//    private long ground_id;
//
//    @Column(nullable = false)
//    private long place_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "groundId")
    private Ground ground;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeId")
    private Place place;

}
