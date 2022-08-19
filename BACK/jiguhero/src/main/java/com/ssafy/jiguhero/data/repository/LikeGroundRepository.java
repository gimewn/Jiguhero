package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.entity.Like_Ground;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeGroundRepository extends JpaRepository<Like_Ground, Long> {

    // user에 해당하는 like_mission 인스터스 목록
    List<Like_Ground> findAllByUser(User user);

    Optional<Like_Ground> findByGroundAndUser(Ground groundEntity, User userEntity);

    void deleteByGroundAndUser(Ground groundEntity, User userEntity);

    List<Like_Ground> findAllByGround(Ground groundEntity);
}
