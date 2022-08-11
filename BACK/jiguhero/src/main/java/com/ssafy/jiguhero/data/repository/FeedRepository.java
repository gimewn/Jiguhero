package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    Feed findByFeedId(Long feedId);

    Optional<Feed> findByFeedIdAndUserAndRegtime(Long feedId, User user, LocalDate regtime);

    Optional<Feed> findByUserAndRegtime(User user, LocalDate regtime);

    void deleteAllByFeed(Feed feed);

    Optional<Feed> findByMissionAndUserAndRegtime(Mission mission, User user, LocalDate regtime);

}
