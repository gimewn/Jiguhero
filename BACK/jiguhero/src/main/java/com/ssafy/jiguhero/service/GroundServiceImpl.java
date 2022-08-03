package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.GroundDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.entity.Like_Ground;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroundServiceImpl implements GroundService {

    private final GroundDao groundDao;
    private final UserDao userDao;

    @Autowired
    public GroundServiceImpl(GroundDao groundDao, UserDao userDao) {
        this.groundDao = groundDao;
        this.userDao = userDao;
    }

    @Override
    public List<GroundDto> getTop5HitsLikes() {
        List<Ground> entityList = groundDao.selectTop5HitsLikes();

        List<GroundDto> dtoList = entityList.stream().map(entity -> GroundDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public List<GroundDto> getLikeGrounds(Long userId) {
        User userEntity = userDao.selectUserById(userId);
        List<Like_Ground> likeGroundList = groundDao.selectLikeGroundByUser(userEntity);
        List<Ground> entityList = new ArrayList<>();

        for (Like_Ground likeGround : likeGroundList) {
            entityList.add(likeGround.getGround());
        }

        List<GroundDto> dtoList = entityList.stream().map(entity -> GroundDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public List<GroundDto> getGrounds() {
        List<Ground> entityList = groundDao.selectGrounds();
        List<GroundDto> dtoList = entityList.stream().map(entity -> GroundDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    public GroundDto getGround(Long groundId) {
        Ground entity = groundDao.selectGroundById(groundId);
        GroundDto dto = GroundDto.of(entity);
        return dto;
    }
}
