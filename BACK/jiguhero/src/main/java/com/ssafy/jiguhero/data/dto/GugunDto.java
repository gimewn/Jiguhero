package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Gugun;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GugunDto {

    private String gugunCode;
    private String gugunName;
    private String sidoCode;

    public static GugunDto of(Gugun gugunEntity) {
        GugunDto gugunDto = ModelMapperUtils.getModelMapper().map(gugunEntity, GugunDto.class);

        return gugunDto;
    }

}
