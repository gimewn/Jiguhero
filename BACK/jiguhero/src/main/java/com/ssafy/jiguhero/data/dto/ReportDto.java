package com.ssafy.jiguhero.data.dto;

import com.ssafy.jiguhero.data.entity.Report;
import com.ssafy.jiguhero.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReportDto {
    private long reportId;
    private int category;
    private String content;

    public static ReportDto of(Report reportEntity){
        ReportDto reportDto = ModelMapperUtils.getModelMapper().map(reportEntity, ReportDto.class);
        return reportDto;
    }
}
