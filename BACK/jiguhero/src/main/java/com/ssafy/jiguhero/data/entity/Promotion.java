package com.ssafy.jiguhero.data.entity;

import com.ssafy.jiguhero.data.dto.PromotionDto;
import com.ssafy.jiguhero.util.ModelMapperUtils;
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
    private Image_Promotion imagePromotion;

    @Column(nullable = false)
    private LocalDateTime regtime;

    public static Promotion of(PromotionDto promotionDto) {
        Promotion promotionEntity = ModelMapperUtils.getModelMapper().map(promotionDto, Promotion.class);

        return promotionEntity;
    }
}
