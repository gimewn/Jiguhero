package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
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
    private int count;

    public static GroundDto of(Ground groundEntity) {
        GroundDto groundDto = ModelMapperUtils.getModelMapper().map(groundEntity, GroundDto.class);

        return groundDto;
    }

}
