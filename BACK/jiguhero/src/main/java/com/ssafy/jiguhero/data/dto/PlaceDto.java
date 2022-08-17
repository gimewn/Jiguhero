package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDto implements Comparable<PlaceDto> {

    private String placeId;
    private String name;
    private String roadAddress;
    private String jibunAddress;
    private String phone;
    private String content;
    private String url;
    private Double lat;
    private Double lng;
    private Double radius;
    private List<String> imageURL = new ArrayList<>();

    public static PlaceDto of(Place placeEntity) {
        PlaceDto placeDto = ModelMapperUtils.getModelMapper().map(placeEntity, PlaceDto.class);

        return placeDto;
    }

    @Override
    public int compareTo(PlaceDto o) {
        return this.radius.compareTo(o.radius);
    }
}
