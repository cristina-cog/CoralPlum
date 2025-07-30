package vibecode.coralplum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vibecode.coralplum.model.UserCarbonSummary;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserCarbonSummaryRepository extends JpaRepository<UserCarbonSummary, Long> {
    
    List<UserCarbonSummary> findByUserId(String userId);
    
    List<UserCarbonSummary> findByUserIdOrderBySummaryDateDesc(String userId);
    
    Optional<UserCarbonSummary> findByUserIdAndSummaryDate(String userId, LocalDate summaryDate);
    
    List<UserCarbonSummary> findByUserIdAndSummaryDateBetween(String userId, LocalDate start, LocalDate end);
}