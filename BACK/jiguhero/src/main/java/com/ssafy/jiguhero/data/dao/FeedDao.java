package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.entity.*;

import java.util.Optional;

public interface FeedDao {

    Feed selectFeedById(Long feedId);

    Feed selectFeedByImageMission(Image_Mission imageMission);

    Like_Feed selectLikeFeedByUser(Feed feed, User user);

    int countByFeed(Feed feed);

    Feed insertFeed(Feed feed);

    void insertLikeFeed(Like_Feed likeFeed);

    Optional<Feed> selectFeed(Long feedId, User user);

    Feed updateFeed(FeedDto feedDto) throws Exception;

    Optional<Feed> searchFeed(User user);

    Optional<Feed> selectFeed(Mission mission, User user);

    void deleteLikeFeed(Feed feed);

    void deleteLikeFeedByUser(Feed feed, User user);

    void deleteFeed(Long feedId);

    int countByFeed(Mission mission, User user);

}
