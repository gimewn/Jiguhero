package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MissionDto {

    private long missionId;
    private LocalDateTime regtime;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int entryPoint;
    private String sidoCode;
    private String gugunCode;
    private String dongCode;
    private int nowPerson;
    private int maxPerson;
    private int failedPerson;
    private int likes;
    private int hits;
    private String repImageURL;
    private List<String> imageURL = new ArrayList<>();

    private boolean likeCheck;
    private boolean joinCheck;

    public static MissionDto of(Mission missionEntity) {
        MissionDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, MissionDto.class);

        return missionDto;
    }


}
