package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.Like_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {

    // 미션 정보 가져오기 -> 기본 메서드 findById 사용

    // 임무 Top3 참여자순
    List<Mission> findTop3ByOrderByNowPersonDesc();

    List<Mission> findAllByTitleContainingOrderByTitleAsc(String search);

    List<Mission> findAllByTitleContainingOrderByRegtimeDesc(String search);

    List<Mission> findAllByTitleContainingOrderByHitsDesc(String search);

    List<Mission> findAllByOrderByHitsDesc();

    List<Mission> findAllByOrderByRegtimeDesc();
}
