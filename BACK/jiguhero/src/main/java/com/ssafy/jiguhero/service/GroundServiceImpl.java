package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.GroundDao;
import com.ssafy.jiguhero.data.dao.PlaceDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroundServiceImpl implements GroundService {

    private final GroundDao groundDao;
    private final UserDao userDao;
    private final PlaceDao placeDao;

    @Autowired
    public GroundServiceImpl(GroundDao groundDao, UserDao userDao, PlaceDao placeDao) {
        this.groundDao = groundDao;
        this.userDao = userDao;
        this.placeDao = placeDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<GroundDto> getTop5HitsLikes() {
        List<Ground> entityList = groundDao.selectTop5HitsLikes();

        List<GroundDto> dtoList = entityList.stream().map(entity -> GroundDto.of(entity)).collect(Collectors.toList());

        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
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
    @Transactional(readOnly = true)
    public List<GroundDto> getGrounds() {
        List<Ground> entityList = groundDao.selectGrounds();
        List<GroundDto> dtoList = entityList.stream().map(entity -> GroundDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public GroundDto getGround(Long groundId) {
        Ground entity = groundDao.selectGroundById(groundId);
        GroundDto dto = GroundDto.of(entity);
        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public List<GroundDto> getGroundsByUser(Long userId) {
        User userEntity = userDao.selectUserById(userId);
        List<Ground> entityList = groundDao.selectGroundByUser(userEntity);
        List<GroundDto> dtoList = entityList.stream().map(entity -> GroundDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    public void saveGround(GroundDto groundDto, List<PlaceDto> placeDtoList, Long userId) {
        User userEntity = userDao.selectUserById(userId);

        Ground groundEntity = new Ground();
        groundEntity.setContent(groundDto.getContent());
        groundEntity.setHits(0);
        groundEntity.setLikes(0);
        groundEntity.setUser(userEntity);

        groundDao.insertGround(groundEntity);

        for(PlaceDto placeDto : placeDtoList){
            Place placeEntity = placeDao.selectPlaceById(placeDto.getPlaceId());
            Conn_Ground connGroundEntity = new Conn_Ground();
            connGroundEntity.setGround(groundEntity);
            connGroundEntity.setPlace(placeEntity);
            groundDao.insertConnGround(connGroundEntity);
        }
    }

    @Override
    public boolean addGround(String placeId, Long groundId, Long userId) {
        Ground groundEntity = groundDao.selectGroundById(groundId);

        if(groundEntity.getUser().getUserId() != userId){
            return false;
        }

        Place placeEntity = placeDao.selectPlaceById(placeId);
        Conn_Ground connGroundEntity = new Conn_Ground();
        connGroundEntity.setGround(groundEntity);
        connGroundEntity.setPlace(placeEntity);
        groundDao.insertConnGround(connGroundEntity);
        return true;
    }

    @Override
    public String deletePlace(String placeId, Long groundId, Long userId) {
        Ground groundEntity = groundDao.selectGroundById(groundId);

        if(groundEntity.getUser().getUserId() != userId){
            return "unauthorized";
        }

        List<Conn_Ground> list = groundDao.selectConnGroundByGround(groundEntity);

        for(Conn_Ground connGround : list){
            if(connGround.getPlace().getPlaceId().equals(placeId)){
                groundDao.deleteConnGroundById(connGround.getConnGroundId());
                return "success";
            }
        }

        return "failed";
    }

    @Override
    public String deleteGround(Long groundId, Long userId) {
        Ground groundEntity = groundDao.selectGroundById(groundId);

        if(groundEntity.getUser().getUserId() != userId){
            return "unauthorized";
        }

        List<Conn_Ground> list = groundDao.selectConnGroundByGround(groundEntity);

        for(Conn_Ground connGround : list){
            groundDao.deleteConnGroundById(connGround.getConnGroundId());
        }

        groundDao.deleteGroundById(groundId);

        return "success";
    }

    @Override
    public List<PlaceDto> getPlacesByGround(Long groundId) {
        Ground groundEntity = groundDao.selectGroundById(groundId);

        List<Conn_Ground> connGroundList = groundDao.selectConnGroundByGround(groundEntity);
        List<Place> placeList  = new ArrayList<Place>();
        for(Conn_Ground connGround : connGroundList){
            placeList.add(connGround.getPlace());
        }

        List<PlaceDto> dtoList = placeList.stream().map(entity -> PlaceDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }
}
