package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Review;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private long reviewId;
    private int score;
    private String content;
    private long userId;

    public static ReviewDto of(Review reviewEntity){
        ReviewDto reviewDto = ModelMapperUtils.getModelMapper().map(reviewEntity, ReviewDto.class);
        return reviewDto;
    }
}
