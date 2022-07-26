package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.GroundDao;
import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.entity.Ground;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroundServiceImpl implements GroundService {

    private final GroundDao groundDao;

    public GroundServiceImpl(GroundDao groundDao) {
        this.groundDao = groundDao;
    }

    @Override
    public List<GroundDto> getTop5Hits() {
        List<Ground> entityList = groundDao.selectTop5ByOrderByHits();

        List<GroundDto> dtoList = entityList.stream().map(entity -> GroundDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public List<GroundDto> getTop5Likes() {
        List<Ground> entitiyList = groundDao.selectTop5ByOrderByLikes();

        List<GroundDto> dtoList = entitiyList.stream().map(entity -> GroundDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }
}
