package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.FeedDto;

public interface FeedService {

    FeedDto getFeedById(Long imageId, Long userId);

    int insertFeed(FeedDto feedDto);

    FeedDto updateFeed(FeedDto feedDto) throws Exception;

    int deleteFeed(Long feedId, Long userId, Long missionId);

    int likeFeed(Long feedId, Long userId);

}
