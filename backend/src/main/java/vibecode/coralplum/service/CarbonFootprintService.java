package vibecode.coralplum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vibecode.coralplum.model.ActivityType;
import vibecode.coralplum.model.CarbonFootprintEntry;
import vibecode.coralplum.model.UserCarbonSummary;
import vibecode.coralplum.repository.CarbonFootprintEntryRepository;
import vibecode.coralplum.repository.UserCarbonSummaryRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CarbonFootprintService {
    
    @Autowired
    private CarbonFootprintEntryRepository entryRepository;
    
    @Autowired
    private UserCarbonSummaryRepository summaryRepository;
    
    @Autowired
    private CarbonCalculatorService calculatorService;
    
    public CarbonFootprintEntry createEntry(CarbonFootprintEntry entry) {
        // Auto-calculate carbon emission if not provided
        if (entry.getCarbonEmissionKg() == null || entry.getCarbonEmissionKg() == 0) {
            double carbonEmission = calculatorService.calculateCarbonEmission(
                entry.getActivityType(),
                entry.getComputeHours(),
                entry.getStorageGB(),
                entry.getDataTransferGB(),
                entry.getBuildMinutes(),
                entry.getEmailCount(),
                entry.getAttachmentSizeMB()
            );
            entry.setCarbonEmissionKg(carbonEmission);
        }
        
        if (entry.getTimestamp() == null) {
            entry.setTimestamp(LocalDateTime.now());
        }
        
        return entryRepository.save(entry);
    }
    
    public List<CarbonFootprintEntry> getUserEntries(String userId) {
        return entryRepository.findByUserIdOrderByTimestampDesc(userId);
    }
    
    public List<CarbonFootprintEntry> getUserEntriesByDateRange(String userId, LocalDateTime start, LocalDateTime end) {
        return entryRepository.findByUserIdAndTimestampBetween(userId, start, end);
    }
    
    public Double getTotalCarbonEmission(String userId) {
        Double total = entryRepository.getTotalCarbonEmissionByUserId(userId);
        return total != null ? total : 0.0;
    }
    
    public Double getTotalCarbonEmissionByDateRange(String userId, LocalDateTime start, LocalDateTime end) {
        Double total = entryRepository.getTotalCarbonEmissionByUserIdAndDateRange(userId, start, end);
        return total != null ? total : 0.0;
    }
    
    public Map<ActivityType, Double> getCarbonEmissionByActivityType(String userId) {
        List<Object[]> results = entryRepository.getCarbonEmissionByActivityType(userId);
        Map<ActivityType, Double> emissions = new HashMap<>();
        
        for (Object[] result : results) {
            ActivityType activityType = (ActivityType) result[0];
            Double emission = (Double) result[1];
            emissions.put(activityType, emission);
        }
        
        return emissions;
    }
    
    public UserCarbonSummary generateDailySummary(String userId, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();
        
        Double totalEmission = getTotalCarbonEmissionByDateRange(userId, start, end);
        Map<ActivityType, Double> emissionsByType = getCarbonEmissionByActivityType(userId);
        
        UserCarbonSummary summary = new UserCarbonSummary(userId, date, totalEmission, emissionsByType);
        
        // Save or update existing summary
        Optional<UserCarbonSummary> existing = summaryRepository.findByUserIdAndSummaryDate(userId, date);
        if (existing.isPresent()) {
            UserCarbonSummary existingSummary = existing.get();
            existingSummary.setTotalCarbonEmissionKg(totalEmission);
            existingSummary.setCarbonByActivityType(emissionsByType);
            return summaryRepository.save(existingSummary);
        } else {
            return summaryRepository.save(summary);
        }
    }
    
    public List<UserCarbonSummary> getUserSummaries(String userId) {
        return summaryRepository.findByUserIdOrderBySummaryDateDesc(userId);
    }
    
    public void deleteEntry(Long entryId) {
        entryRepository.deleteById(entryId);
    }
}