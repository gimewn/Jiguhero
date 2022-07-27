package com.ssafy.jiguhero;

import com.ssafy.jiguhero.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class JiguheroApplication {

	public static void main(String[] args) {
		SpringApplication.run(JiguheroApplication.class, args);
	}

}
