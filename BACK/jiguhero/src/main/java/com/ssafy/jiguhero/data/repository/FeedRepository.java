package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    Feed findByFeedId(Long feedId);
}
