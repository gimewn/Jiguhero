package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.FeedDto;

public interface FeedService {

    FeedDto getFeedById(Long feedId, Long userId);

    int insertFeed(FeedDto feedDto, Long missionId, Long userId);

    FeedDto changeFeed(FeedDto feedDto, Long userId) throws Exception;

    int deleteFeed(Long feedId, Long userId, Long missionId);

}
