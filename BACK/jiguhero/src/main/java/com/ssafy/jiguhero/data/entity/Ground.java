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
    @Column(name = "ground_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long groundId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String icon;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int likes;

    @Column(nullable = false)
    private int hits;

    @Column(nullable = true)
    private LocalDateTime regtime;

//    @Column(nullable = false)
//    private long user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

}
