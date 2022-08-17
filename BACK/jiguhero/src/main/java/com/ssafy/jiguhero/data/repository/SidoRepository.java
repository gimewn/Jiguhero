package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Sido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SidoRepository extends JpaRepository<Sido, String> {

    // 모든 시/도 목록 -> 기본 메서드 findAll() 사용

}
