package com.ssafy.jiguhero.data.entity;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Like_Feed")
public class Like_Feed {

    @Id
    @Column(name = "like_feed_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeFeedId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedId")
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

}
