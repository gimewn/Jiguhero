package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Promotion;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDto {

    private long promotionId;
    private String title;
    private int category;
    private String content;
    private LocalDateTime regtime;

    public static PromotionDto of(Promotion promotionEntity) {
        PromotionDto promotionDto = ModelMapperUtils.getModelMapper().map(promotionEntity, PromotionDto.class);

        return promotionDto;
    }

}
