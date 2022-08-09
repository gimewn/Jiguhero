package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedDto {

    private long feedId;
    private String content;
    private int likeCnt;
    private boolean likeCheck;

    public static FeedDto of(Feed feedEntity) {
        FeedDto feedDto = ModelMapperUtils.getModelMapper().map(feedEntity, FeedDto.class);

        return feedDto;
    }
}
