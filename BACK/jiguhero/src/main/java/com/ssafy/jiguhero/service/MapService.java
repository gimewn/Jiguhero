package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.DongDto;
import com.ssafy.jiguhero.data.dto.GugunDto;
import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.dto.SidoDto;

import java.util.List;

public interface MapService {

    List<SidoDto> getSidoList();

    List<GugunDto> getGugunList(String sidoCode);

    List<DongDto> getDongList(String gugunCode);

    // 접속위치 기준 반경 10km내 친환경 가게 리스트 가져오기
    List<PlaceDto> getPlaceList10kmRadius(Double curLat, Double curLng);

}
