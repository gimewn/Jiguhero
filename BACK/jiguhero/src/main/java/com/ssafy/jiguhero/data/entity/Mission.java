package com.ssafy.jiguhero.data.entity;

import com.ssafy.jiguhero.data.dto.MissionDto;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Mission")
public class Mission {
    @Id
    @Column(name = "mission_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long missionId;
    
    private LocalDateTime regtime;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String content;

    @Column(nullable = false, name = "start_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Column(nullable = false, name = "end_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Column(nullable = false, name = "enrty_point")
    private int entryPoint;

    @Column(nullable = true, name = "sido_code")
    private String sidoCode;

    @Column(nullable = true, name = "gugun_code")
    private String gugunCode;

    @Column(nullable = true, name = "dong_code")
    private String dongCode;

    @Column(nullable = false, name = "now_person")
    private int nowPerson;

    @Column(nullable = false, name = "max_person")
    private int maxPerson;

    @Column(nullable = false, name = "failed_person")
    private int failedPerson;

    @Column(nullable = false)
    private int likes;

    @Column(nullable = false)
    private int hits;

    ///////////////////////////////////////////////////////////////////
    @OneToMany(mappedBy = "mission")
    List<Feed> feed = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
    ///////////////////////////////////////////////////////////////////
    public static Mission of(MissionDto missionDto) {
        Mission missionEntity = ModelMapperUtils.getModelMapper().map(missionDto, Mission.class);

        return missionEntity;
    }
}
