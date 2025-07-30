package vibecode.coralplum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vibecode.coralplum.model.ActivityType;
import vibecode.coralplum.model.CarbonFootprintEntry;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CarbonFootprintEntryRepository extends JpaRepository<CarbonFootprintEntry, Long> {
    
    List<CarbonFootprintEntry> findByUserId(String userId);
    
    List<CarbonFootprintEntry> findByUserIdOrderByTimestampDesc(String userId);
    
    List<CarbonFootprintEntry> findByUserIdAndActivityType(String userId, ActivityType activityType);
    
    List<CarbonFootprintEntry> findByUserIdAndTimestampBetween(String userId, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(c.carbonEmissionKg) FROM CarbonFootprintEntry c WHERE c.userId = :userId")
    Double getTotalCarbonEmissionByUserId(@Param("userId") String userId);
    
    @Query("SELECT SUM(c.carbonEmissionKg) FROM CarbonFootprintEntry c WHERE c.userId = :userId AND c.timestamp BETWEEN :start AND :end")
    Double getTotalCarbonEmissionByUserIdAndDateRange(@Param("userId") String userId, 
                                                     @Param("start") LocalDateTime start, 
                                                     @Param("end") LocalDateTime end);
    
    @Query("SELECT c.activityType, SUM(c.carbonEmissionKg) FROM CarbonFootprintEntry c WHERE c.userId = :userId GROUP BY c.activityType")
    List<Object[]> getCarbonEmissionByActivityType(@Param("userId") String userId);
}