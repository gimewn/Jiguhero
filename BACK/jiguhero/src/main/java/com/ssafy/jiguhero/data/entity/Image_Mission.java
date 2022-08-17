package com.ssafy.jiguhero.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Image_Mission")
public class Image_Mission {

    @Id
    @Column(name = "image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @Column(nullable = true, name = "save_folder")
    private String saveFolder;

    @Column(nullable = true, name = "origin_file")
    private String originFile;

    @Column(nullable = true, name = "save_file")
    private String saveFile;

    @Column(nullable = true)
    private LocalDateTime regtime;

    @Column(nullable = false)
    private boolean rep;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missionId")
    private Mission mission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @OneToOne(mappedBy = "imageMission")
    private Feed feed;

}
