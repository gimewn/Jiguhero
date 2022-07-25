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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long conn_ground_id;

    @Column(nullable = false)
    private long ground_id;

    @Column(nullable = false)
    private long place_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ground_id")
    private Ground ground;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

}
