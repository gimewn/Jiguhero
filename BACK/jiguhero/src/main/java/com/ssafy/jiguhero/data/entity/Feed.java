package com.ssafy.jiguhero.data.entity;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Feed")
public class Feed {

    @Id
    @Column(name = "feed_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long feedId;

    @Column(nullable = true)
    private LocalDate regtime;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missionId")
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "imageId")
    private Image_Mission imageMission;

    @OneToMany(mappedBy = "feed")
    List<Like_Feed> like_feed = new ArrayList<>();

    public static Feed of(FeedDto feedDto) {
        Feed feedEntity = ModelMapperUtils.getModelMapper().map(feedDto, Feed.class);

        return feedEntity;
    }
}
