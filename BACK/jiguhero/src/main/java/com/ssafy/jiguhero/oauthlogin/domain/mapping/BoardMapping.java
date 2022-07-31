package com.ssafy.jiguhero.oauthlogin.domain.mapping;

import java.time.LocalDateTime;
/**
 * Mapping 예제
 */
public interface BoardMapping {
    Long getId();
    LocalDateTime getCreatedDate();
    String getTitle();
    String getSubtitle();
    String getUsername();
    String getMarkdown();
    String getHtml();
}
