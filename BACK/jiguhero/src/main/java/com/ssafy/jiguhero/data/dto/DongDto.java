package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Dong;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DongDto {

    private String dongCode;
    private String dongName;
    private String sidoCode;
    private String gugunCode;

    public static DongDto of(Dong dongEntity) {
        DongDto dongDto = ModelMapperUtils.getModelMapper().map(dongEntity, DongDto.class);

        return dongDto;
    }

}
