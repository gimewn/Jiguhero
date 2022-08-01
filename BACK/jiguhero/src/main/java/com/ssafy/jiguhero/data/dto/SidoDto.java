package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Sido;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SidoDto {

    private String sidoCode;
    private String sidoName;

    public static SidoDto of(Sido sidoEntity) {
        SidoDto sidoDto = ModelMapperUtils.getModelMapper().map(sidoEntity, SidoDto.class);

        return sidoDto;
    }
}
