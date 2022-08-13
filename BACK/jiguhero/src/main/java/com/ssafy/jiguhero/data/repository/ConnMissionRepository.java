package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnMissionRepository extends JpaRepository<Conn_Mission, Long> {

    // user에 해당하는 join_mission 인스터스 목록
    List<Conn_Mission> findAllByUser(User user);

    Conn_Mission findByMissionAndUser(Mission mission, User user);

    void deleteAllByMission(Mission mission);

    List<Conn_Mission> findAllByMission(Mission mission);
}
