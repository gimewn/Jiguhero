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
@Table(name = "Review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long review_id;

    @Column(nullable = false)
    private int score;

    @Column(nullable = false)
    private String desc;

    @Column(nullable = false)
    private long user_id;

    @Column(nullable = false)
    private long place_id;

}
