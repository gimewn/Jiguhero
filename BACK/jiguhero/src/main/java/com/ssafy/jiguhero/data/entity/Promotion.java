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
@Table(name = "Promotion")
public class Promotion {
    @Id
    @Column(name = "promotion_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long promotionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private int category;

    @Column(nullable = true)
    private String content;

    @OneToOne(mappedBy = "promotion")
    private Image_Promotion image_promotion;
}
