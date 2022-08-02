package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Dong;
import com.ssafy.jiguhero.data.entity.Gugun;
import com.ssafy.jiguhero.data.entity.Sido;

import java.util.List;

public interface MapDao {

    // 모든 시/도 목록 가져오기
    List<Sido> selectSidoList();

    // 해당 시/도에 속한 구/군 목록 가져오기
    List<Gugun> selectGugunList(Sido sido);

    // sido_code에 해당하는 시/도 조회
    Sido selectSidoById(String sidoCode);

    // 해당 구/군에 속한 동 목록 가져오기
    List<Dong> selectDongList(Gugun gugun);

    // gugun_code에 해당하는 시/도 조회
    Gugun selectGugunById(String gugunCode);

}
