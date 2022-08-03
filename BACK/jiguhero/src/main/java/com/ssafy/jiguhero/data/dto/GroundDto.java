package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroundDto {

    private long groundId;
    private String title;
    private String icon;
    private String content;
    private int likes;
    private int hits;
    private LocalDateTime regtime;
    private Long userId;

    public static GroundDto of(Ground groundEntity) {
        GroundDto groundDto = ModelMapperUtils.getModelMapper().map(groundEntity, GroundDto.class);

        return groundDto;
    }

}
