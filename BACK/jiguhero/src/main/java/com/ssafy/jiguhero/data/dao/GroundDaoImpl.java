package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Conn_Ground;
import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.entity.Like_Ground;
import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.ConnGroundRepository;
import com.ssafy.jiguhero.data.repository.GroundRepository;
import com.ssafy.jiguhero.data.repository.LikeGroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class GroundDaoImpl implements GroundDao {

    private final GroundRepository groundRepository;
    private final LikeGroundRepository likeGroundRepository;
    private final ConnGroundRepository connGroundRepository;

    @Autowired
    public GroundDaoImpl(GroundRepository groundRepository, LikeGroundRepository likeGroundRepository, ConnGroundRepository connGroundRepository) {
        this.groundRepository = groundRepository;
        this.likeGroundRepository = likeGroundRepository;
        this.connGroundRepository = connGroundRepository;
    }

    @Override
    public List<Ground> selectTop5HitsLikes() {
        List<Ground> selectedGrounds = groundRepository.findTop5ByOrderByHitsDescLikesDesc();
        return selectedGrounds;
    }

    @Override
    public List<Like_Ground> selectLikeGroundByUser(User user) {
        List<Like_Ground> selectedLikeGrounds = likeGroundRepository.findAllByUser(user);

        return selectedLikeGrounds;
    }

    @Override
    public Ground selectGroundById(Long groundId) {
        Ground selectedGround = groundRepository.getById(groundId);

        return selectedGround;
    }

    @Override
    public List<Ground> selectGrounds() {
        List<Ground> selectedGrounds = groundRepository.findAll();
        return selectedGrounds;
    }

    @Override
    public Ground selectGround(Long groundId) {
        Ground selected = groundRepository.getById(groundId);
        return selected;
    }

    @Override
    public List<Ground> selectGroundByUser(User userEntity) {
        List<Ground> selectedGrounds = groundRepository.findAllByUser(userEntity);
        return selectedGrounds;
    }

    @Override
    public void insertGround(Ground groundEntity) {
        groundRepository.save(groundEntity);
    }

    @Override
    public void insertConnGround(Conn_Ground connGroundEntity) {
        connGroundRepository.save(connGroundEntity);
    }

    @Override
    public List<Conn_Ground> selectConnGroundByGround(Ground groundEntity) {
        List<Conn_Ground> selectedConnGrounds = connGroundRepository.findAllByGround(groundEntity);
        return selectedConnGrounds;
    }

    @Override
    public void deleteConnGroundById(long connGroundId) {
        connGroundRepository.deleteById(connGroundId);
    }
}
