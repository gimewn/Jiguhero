package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.PromotionDao;
import com.ssafy.jiguhero.data.dto.PromotionDto;
import com.ssafy.jiguhero.data.entity.Image_Promotion;
import com.ssafy.jiguhero.data.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionServiceImpl implements PromotionService {

    private final PromotionDao promotionDao;
    private final ImageDao imageDao;

    @Autowired
    public PromotionServiceImpl(PromotionDao promotionDao, ImageDao imageDao) {
        this.promotionDao = promotionDao;
        this.imageDao = imageDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PromotionDto> getTop3Regtime() {
        List<Promotion> entityList = promotionDao.selectTop3Regtime();
        List<PromotionDto> dtoList = entityList.stream().map(entity -> PromotionDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PromotionDto> getPromotions() {
        List<Promotion> entityList = promotionDao.selectPromotions();
        List<PromotionDto> dtoList = entityList.stream().map(entity -> PromotionDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public PromotionDto getPromotion(Long promotionId) {
        Promotion entity = promotionDao.selectPromotion(promotionId);
        PromotionDto dto = PromotionDto.of(entity);
        return dto;
    }

    @Override
    public PromotionDto savePromotion(PromotionDto promotionDto) {
        Promotion promotionEntity = Promotion.of(promotionDto);
        Promotion savedPromotion = promotionDao.insertPromotion(promotionEntity);
        return PromotionDto.of(savedPromotion);
    }

    @Override
    public void deletePromotion(Long promotionId) {
        Promotion promotionEntity = promotionDao.selectPromotion(promotionId);
        Image_Promotion imagePromotion = imageDao.selectImagePromotion(promotionEntity);
        if (imagePromotion != null) {
            try {
                imageDao.deleteImagePromotion(imagePromotion);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        promotionDao.deletePromotion(promotionId);
    }
}
