package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Conn_Mission;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConnMissionRepository extends JpaRepository<Conn_Mission, Long> {

    // user에 해당하는 join_mission 인스터스 목록
    List<Conn_Mission> findAllByUser(User user);
}
