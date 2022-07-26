package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.repository.GroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GroundDaoImpl implements GroundDao {

    private final GroundRepository groundRepository;

    @Autowired
    public GroundDaoImpl(GroundRepository groundRepository) {
        this.groundRepository = groundRepository;
    }

    @Override
    public List<Ground> selectTop5ByOrderByHits() {
        List<Ground> selectedGrounds = groundRepository.findTop5ByOrderByHitsDesc();
        return selectedGrounds;
    }

    @Override
    public List<Ground> selectTop5ByOrderByLikes() {
        List<Ground> selectedGrounds = groundRepository.findTop5ByOrderByLikesDesc();
        return selectedGrounds;
    }
}
