package com.ssafy.jiguhero.data.repository;


import com.ssafy.jiguhero.data.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
}
