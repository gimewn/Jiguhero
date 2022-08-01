package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.GroundDto;

import java.util.List;

public interface GroundService {

    List<GroundDto> getTop5Hits();

    List<GroundDto> getTop5Likes();

}
