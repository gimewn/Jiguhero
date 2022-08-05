package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.DongDto;
import com.ssafy.jiguhero.data.dto.GugunDto;
import com.ssafy.jiguhero.data.dto.SidoDto;

import java.util.List;

public interface MapService {

    List<SidoDto> getSidoList();

    List<GugunDto> getGugunList(String sidoCode);

    List<DongDto> getDongList(String gugunCode);

}
