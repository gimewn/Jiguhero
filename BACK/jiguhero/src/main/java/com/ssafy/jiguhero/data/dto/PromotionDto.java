package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Promotion;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDto {

    private long promotionId;
    private String title;
    private int category;
    private String content;
    private LocalDateTime regtime;
    private String imageURL;

    public static PromotionDto of(Promotion promotionEntity) {
        PromotionDto promotionDto = ModelMapperUtils.getModelMapper().map(promotionEntity, PromotionDto.class);

        return promotionDto;
    }

}
