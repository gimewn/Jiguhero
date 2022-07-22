package com.ssafy.jiguhero.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Mission")
public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mission_id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime start_date;

    @Column(nullable = false)
    private LocalDateTime end_date;

    @Column(nullable = false)
    private int entry_point;

    @Column(nullable = true)
    private String sido_code;

    @Column(nullable = true)
    private String gugun_code;

    @Column(nullable = true)
    private String dong_code;

    @Column(nullable = false)
    private int now_person;

    @Column(nullable = false)
    private int max_person;

    @Column(nullable = false)
    private int failed_person;

    @Column(nullable = false)
    private int like;

    @Column(nullable = false)
    private int hits;
}
