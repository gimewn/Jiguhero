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
@Table(name = "Ground")
public class Ground {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ground_id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String icon;

    @Column(nullable = false)
    private String desc;

    @Column(nullable = false)
    private int like;

    @Column(nullable = false)
    private int hits;

    @Column(nullable = true)
    private LocalDateTime regtime;

    @Column(nullable = false)
    private long user_id;
}
