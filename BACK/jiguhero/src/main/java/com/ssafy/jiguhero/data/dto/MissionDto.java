package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Mission;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MissionDto {

    private long missionId;
    private LocalDateTime regtime;
    private String title;
    private String content;
    private String startDate;
    private String endDate;
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
    private List<List<String>> imageURL = new ArrayList<>();

    private boolean likeCheck;
    private boolean joinCheck;
    private long userId;
    public static MissionDto of(Mission missionEntity) {
        MissionDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, MissionDto.class);

        return missionDto;
    }

}
