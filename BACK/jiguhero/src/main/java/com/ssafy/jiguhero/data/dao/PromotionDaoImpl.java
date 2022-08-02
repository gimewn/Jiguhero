package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Promotion;
import com.ssafy.jiguhero.data.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PromotionDaoImpl implements PromotionDao {

    private final PromotionRepository promotionRepository;

    @Autowired
    public PromotionDaoImpl(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    @Override
    public List<Promotion> selectTop3Regtime() {
        List<Promotion> selectedPromotions = promotionRepository.findTop3ByOrderByRegtimeDesc();

        return selectedPromotions;
    }
}
