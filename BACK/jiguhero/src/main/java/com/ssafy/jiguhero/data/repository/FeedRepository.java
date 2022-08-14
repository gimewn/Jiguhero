package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.data.entity.Image_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    Feed findByFeedId(Long feedId);

    Feed findByImageMission(Image_Mission imageMission);

    Optional<Feed> findByFeedIdAndUserAndRegtime(Long feedId, User user, LocalDate regtime);

    Optional<Feed> findByUserAndRegtime(User user, LocalDate regtime);

    Optional<Feed> findByMissionAndUserAndRegtime(Mission mission, User user, LocalDate regtime);

    int countAllByMissionAndUser(Mission mission, User user);
}
