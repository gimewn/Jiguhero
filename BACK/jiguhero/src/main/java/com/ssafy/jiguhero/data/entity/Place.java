package com.ssafy.jiguhero.data.entity;

import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Place")
public class Place {
    @Id
    @Column(name = "place_id")
    private String placeId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true, name = "road_address")
    private String roadAddress;

    @Column(nullable = true, name = "jibun_address")
    private String jibunAddress;

    @Column(nullable = true)
    private String phone;

    @Column(nullable = true)
    private String content;

    @Column(nullable = true)
    private String url;

    @Column(nullable = true)
    private Double lat;

    @Column(nullable = true)
    private Double lng;

    @OneToMany(mappedBy = "place")
    List<Review> review = new ArrayList<>();

    public static Place of(PlaceDto placeDto) {
        Place placeEntity = ModelMapperUtils.getModelMapper().map(placeDto, Place.class);

        return placeEntity;
    }
}
