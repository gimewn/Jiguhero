package com.ssafy.jiguhero.data.entity;

import com.ssafy.jiguhero.data.dto.ReportDto;
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
@Table(name = "Report")
public class Report {
    @Id
    @Column(name = "report_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reportId;

    @Column(nullable = false)
    private int category;

    @Column(nullable = true)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeId")
    private Place place;

    public static Report of(ReportDto reportDto){
        Report report = ModelMapperUtils.getModelMapper().map(reportDto, Report.class);
        return report;
    }
}
