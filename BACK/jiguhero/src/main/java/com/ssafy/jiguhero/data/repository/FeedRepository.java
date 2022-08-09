package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Feed;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    Feed findByFeedId(Long feedId);

    Optional<Feed> findByFeedIdAndUser(Long feedId, User user);
}
