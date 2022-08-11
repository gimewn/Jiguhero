package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Promotion;
import com.ssafy.jiguhero.data.repository.ImagePromotionRepository;
import com.ssafy.jiguhero.data.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class PromotionDaoImpl implements PromotionDao {

    private final PromotionRepository promotionRepository;
    private final ImagePromotionRepository imagePromotionRepository;

    @Autowired
    public PromotionDaoImpl(PromotionRepository promotionRepository, ImagePromotionRepository imagePromotionRepository) {
        this.promotionRepository = promotionRepository;
        this.imagePromotionRepository = imagePromotionRepository;
    }

    @Override
    public List<Promotion> selectTop3Regtime() {
        List<Promotion> selectedPromotions = promotionRepository.findTop3ByOrderByRegtimeDesc();

        return selectedPromotions;
    }

    @Override
    public List<Promotion> selectPromotions() {
        List<Promotion> selectedPromotions = promotionRepository.findAllByOrderByRegtimeDesc();
        return selectedPromotions;
    }

    @Override
    public Promotion selectPromotion(Long promotionId) {
        Promotion selectedPromotion = promotionRepository.getById(promotionId);
        return selectedPromotion;
    }

    @Override
    public Promotion insertPromotion(Promotion promotion) {
        Promotion savedPromotion = promotionRepository.save(promotion);
        return savedPromotion;
    }

    @Override
    public void deletePromotion(Long promotionId) {
        promotionRepository.deleteById(promotionId);
    }

    @Override
    public List<Promotion> selectPromotionsByKeyword(String keyword) {
        List<Promotion> selectedPromotions = promotionRepository.findByTitleContaining(keyword);
        return selectedPromotions;
    }

}
