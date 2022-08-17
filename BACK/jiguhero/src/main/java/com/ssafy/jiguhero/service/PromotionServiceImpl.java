package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.PromotionDao;
import com.ssafy.jiguhero.data.dto.PromotionDto;
import com.ssafy.jiguhero.data.entity.Image_Mission;
import com.ssafy.jiguhero.data.entity.Image_Promotion;
import com.ssafy.jiguhero.data.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
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
    public List<PromotionDto> getTop3Regtime(HttpServletRequest request) {
        List<Promotion> entityList = promotionDao.selectTop3Regtime();
        List<PromotionDto> dtoList = entityList.stream().map(entity -> PromotionDto.of(entity)).collect(Collectors.toList());
        for (PromotionDto dto : dtoList) {
            dto.setImageURL(getPromotionImageURL(dto.getPromotionId(), request));
        }

        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PromotionDto> getPromotions(HttpServletRequest request) {
        List<Promotion> entityList = promotionDao.selectPromotions();
        List<PromotionDto> dtoList = entityList.stream().map(entity -> PromotionDto.of(entity)).collect(Collectors.toList());
        for (PromotionDto dto : dtoList) {
            dto.setImageURL(getPromotionImageURL(dto.getPromotionId(), request));
        }

        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public PromotionDto getPromotion(Long promotionId, HttpServletRequest request) {
        Promotion entity = promotionDao.selectPromotion(promotionId);
        PromotionDto dto = PromotionDto.of(entity);
        dto.setImageURL(getPromotionImageURL(dto.getPromotionId(), request));
        return dto;
    }

    @Override
    @Transactional
    public PromotionDto savePromotion(PromotionDto promotionDto) {
        Promotion promotionEntity = Promotion.of(promotionDto);
        promotionEntity.setRegtime(LocalDateTime.now());
        Promotion savedPromotion = promotionDao.insertPromotion(promotionEntity);
        return PromotionDto.of(savedPromotion);
    }

    @Override
    @Transactional
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

    @Override
    @Transactional(readOnly = true)
    public List<PromotionDto> searchByKeyword(String keyword, HttpServletRequest request) {
        List<Promotion> entityList = promotionDao.selectPromotionsByKeyword(keyword);
        List<PromotionDto> dtoList = entityList.stream().map(entity -> PromotionDto.of(entity)).collect(Collectors.toList());
        for (PromotionDto dto : dtoList) {
            dto.setImageURL(getPromotionImageURL(dto.getPromotionId(), request));
        }

        return dtoList;
    }

    @Override
    public String getPromotionImageURL(Long promotionId, HttpServletRequest request) {
        Image_Promotion imagePromotion = imageDao.selectImagePromotion(promotionDao.selectPromotion(promotionId));

        if (imagePromotion == null) return null; // 이미지가 없을 경우 null 반환

        String saveFile = imagePromotion.getSaveFile();
        String saveFolder = imagePromotion.getSaveFolder();
        String sep = saveFolder.substring(0,1);
        if (sep.equals("\\")) sep = "\\\\";
        String target = saveFolder.split(sep)[1];
        String date = saveFolder.split(sep)[2];
        String url = request.getRequestURL().toString().replace(request.getRequestURI(),"") + "/image/" + saveFile + "?target=" + target + "&date=" + date;

        return url;
    }

}
