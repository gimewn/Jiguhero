package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FeedDto {

    private long feedId;
    private LocalDate regtime;
    private String content;
    private int likeCnt;
    private boolean likeCheck;
    private long missionId;
    private long userId;
    private long imageId;

    public static FeedDto of(Feed feedEntity) {
        FeedDto feedDto = ModelMapperUtils.getModelMapper().map(feedEntity, FeedDto.class);

        return feedDto;
    }
}
