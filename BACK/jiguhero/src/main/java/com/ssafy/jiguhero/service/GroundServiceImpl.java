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

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroundServiceImpl implements GroundService {

    private final GroundDao groundDao;
    private final UserDao userDao;
    private final PlaceDao placeDao;
    private final PlaceServiceImpl placeService;

    @Autowired
    public GroundServiceImpl(GroundDao groundDao, UserDao userDao, PlaceDao placeDao, PlaceServiceImpl placeService) {
        this.groundDao = groundDao;
        this.userDao = userDao;
        this.placeDao = placeDao;
        this.placeService = placeService;
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

        for(GroundDto groundDto : dtoList){
            long groundId = groundDto.getGroundId();
            int count = placeService.getPlaces(groundId).size();
            groundDto.setCount(count);
        }

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

        for(GroundDto groundDto : dtoList){
            long groundId = groundDto.getGroundId();
            int count = placeService.getPlaces(groundId).size();
            groundDto.setCount(count);
        }

        return dtoList;
    }

    @Override
    @Transactional
    public void saveGround(GroundDto groundDto, Long userId) {
        User userEntity = userDao.selectUserById(userId);

        Ground groundEntity = new Ground();
        groundEntity.setContent(groundDto.getContent());
        groundEntity.setHits(0);
        groundEntity.setLikes(0);
        groundEntity.setIcon(groundDto.getIcon());
        groundEntity.setRegtime(groundDto.getRegtime());
        groundEntity.setTitle(groundDto.getTitle());
        groundEntity.setUser(userEntity);

        groundDao.insertGround(groundEntity);

    }

    @Override
    @Transactional
    public boolean addGround(String placeId, Long groundId, Long userId) {
        Ground groundEntity = groundDao.selectGroundById(groundId);

        if(groundEntity.getUser().getUserId() != userId){
            return false;
        }

        Place placeEntity = placeDao.selectPlaceById(placeId);

        List<Conn_Ground> list = groundDao.selectConnGroundByGround(groundEntity);
        for(Conn_Ground connGround : list){
            if(connGround.getPlace().getPlaceId().equals(placeId)){
                return true;
            }
        }

        Conn_Ground connGroundEntity = new Conn_Ground();
        connGroundEntity.setGround(groundEntity);
        connGroundEntity.setPlace(placeEntity);
        groundDao.insertConnGround(connGroundEntity);
        return true;
    }

    @Override
    @Transactional
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
    @Transactional
    public String deleteGround(Long groundId, Long userId) {
        Ground groundEntity = groundDao.selectGroundById(groundId);

        if(groundEntity.getUser().getUserId() != userId){
            return "unauthorized";
        }

        List<Conn_Ground> list = groundDao.selectConnGroundByGround(groundEntity);

        for(Conn_Ground connGround : list){
            groundDao.deleteConnGroundById(connGround.getConnGroundId());
        }

        List<Like_Ground> likeGroundList = groundDao.selectLikeGroundByGround(groundEntity);

        for(Like_Ground likeGround : likeGroundList){
            groundDao.deleteLikeGroundById(likeGround.getLikeId());
        }

        groundDao.deleteGroundById(groundId);
        return "success";
    }

    @Override
    @Transactional(readOnly = true)
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

    @Override
    @Transactional
    public boolean likeGround(Long groundId, Long userId) {
        Like_Ground likeGround = new Like_Ground();
        User userEntity = userDao.selectUserById(userId);
        Ground groundEntity = groundDao.selectGroundById(groundId);

        if(groundDao.selectLikeGround(groundEntity, userEntity) == null){
            likeGround.setUser(userEntity);
            likeGround.setGround(groundEntity);
            groundDao.insertLikeGround(likeGround);
            groundEntity.setLikes(groundEntity.getLikes() + 1);
            groundDao.insertGround(groundEntity);
            return true;
        } else {
            deleteLikeGround(groundEntity, userEntity);
            groundEntity.setLikes(groundEntity.getLikes() - 1);
            groundDao.insertGround(groundEntity);
            return false;
        }

    }

    @Override
    public boolean getLikeGround(Long groundId, Long userId) {
        User userEntity = userDao.selectUserById(userId);
        Ground groundEntity = groundDao.selectGroundById(groundId);

        if(groundDao.selectLikeGround(groundEntity, userEntity) == null){
            return false;
        } else {
            return true;
        }
    }

    @Override
    @Transactional
    public void modifyGround(GroundDto groundDto, Long userId, Long groundId) {
        Optional<Ground> groundEntity = groundDao.findById(groundId);

        if(groundEntity.isPresent()){
            Ground updateGround = groundEntity.get();
            updateGround.setTitle(groundDto.getTitle());
            updateGround.setContent(groundDto.getContent());
            updateGround.setIcon(groundDto.getIcon());

            groundDao.modifyGround(updateGround);
        }

    }

    @Transactional
    public void deleteLikeGround(Ground groundEntity, User userEntity){
        groundDao.deleteLikeGround(groundEntity, userEntity);
    }

}
