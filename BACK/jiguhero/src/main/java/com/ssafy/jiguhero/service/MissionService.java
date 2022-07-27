package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.MissionDto;

import java.util.List;

public interface MissionService {

    List<MissionDto> getTop3NowPerson();

}
