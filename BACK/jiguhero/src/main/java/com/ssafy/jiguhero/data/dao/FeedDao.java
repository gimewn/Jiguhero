package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.data.entity.Like_Feed;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;

import java.util.Optional;

public interface FeedDao {

    Feed selectFeedById(Long missionId);

    Like_Feed selectLikeFeedByUser(Feed feed, User user);

    int countByFeed(Feed feed);

    void insertFeed(Feed feed);

    Optional<Feed> selectFeed(Long feedId, User user);

    Feed updateFeed(FeedDto feedDto) throws Exception;

    Optional<Feed> searchFeed(User user);

    Optional<Feed> selectFeed(Mission mission, User user);

    void deleteLikeFeed(Feed feed);

    void deleteFeed(Long feedId);

}
