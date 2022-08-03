package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.Dong;
import com.ssafy.jiguhero.data.entity.Gugun;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DongRepository extends JpaRepository<Dong, Long> {

    // 해당 gugun에 속한 동 가져오기
    List<Dong> findAllByGugun(Gugun gugun);

}
