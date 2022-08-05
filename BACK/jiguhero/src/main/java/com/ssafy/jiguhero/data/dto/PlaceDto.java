package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDto {
    private long placeId;
    private String name;
    private String roadAddress;
    private String jibunAddress;
    private String phone;
    private String content;
    private String url;
    private long lat;
    private long lng;

    public static PlaceDto of(Place placeEntity){
        PlaceDto placeDto = ModelMapperUtils.getModelMapper().map(placeEntity, PlaceDto.class);
        return placeDto;
    }
}
