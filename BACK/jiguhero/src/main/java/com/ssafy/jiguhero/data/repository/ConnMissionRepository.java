package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConnMissionRepository extends JpaRepository<Conn_Mission, Long> {

    // user에 해당하는 join_mission 인스터스 목록
    List<Conn_Mission> findAllByUser(User user);
}
