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
@Table(name = "Conn_Mission")
public class Conn_Mission {

    @Id
    @Column(name = "conn_mission_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long connMissionId;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private int role;

    @Column(nullable = false, name = "success_rate")
    private int successRate;

//    @Column(nullable = false)
//    private long user_id;
//
//    @Column(nullable = false)
//    private long mission_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missionId")
    private Mission mission;

}
