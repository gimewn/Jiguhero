package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Conn_Ground;
import com.ssafy.jiguhero.data.entity.Ground;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConnGroundRepository extends JpaRepository<Conn_Ground, Long> {
    List<Conn_Ground> findAllByGround(Ground ground);
}
