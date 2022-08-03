package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Gugun;
import com.ssafy.jiguhero.data.entity.Sido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GugunRepository extends JpaRepository<Gugun, String> {

    // 해당 sido에 속한 구/군 가져오기
    List<Gugun> findAllBySido(Sido sido);

}
