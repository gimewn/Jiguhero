package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.data.entity.Like_Feed;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeFeedRepository extends JpaRepository<Like_Feed, Long> {
    Optional<Like_Feed> findByFeedAndUser(Feed feed, User user);

    int countAllByFeed(Feed feed);

    void deleteAllByFeed(Feed feed);

    void deleteByFeedAndUser(Feed feed, User user);
}
