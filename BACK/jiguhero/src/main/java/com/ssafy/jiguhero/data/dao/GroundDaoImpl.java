package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.entity.Like_Ground;
import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.GroundRepository;
import com.ssafy.jiguhero.data.repository.LikeGroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GroundDaoImpl implements GroundDao {

    private final GroundRepository groundRepository;
    private final LikeGroundRepository likeGroundRepository;

    @Autowired
    public GroundDaoImpl(GroundRepository groundRepository, LikeGroundRepository likeGroundRepository) {
        this.groundRepository = groundRepository;
        this.likeGroundRepository = likeGroundRepository;
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
}
