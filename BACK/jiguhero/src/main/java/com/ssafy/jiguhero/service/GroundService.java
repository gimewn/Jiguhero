package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.GroundDto;

import java.util.List;

public interface GroundService {

    List<GroundDto> getTop5HitsLikes();

    List<GroundDto> getLikeGrounds(Long userId);

    List<GroundDto> getGrounds();

}
