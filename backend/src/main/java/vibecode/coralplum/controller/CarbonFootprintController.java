package vibecode.coralplum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vibecode.coralplum.model.ActivityType;
import vibecode.coralplum.model.CarbonFootprintEntry;
import vibecode.coralplum.model.UserCarbonSummary;
import vibecode.coralplum.service.CarbonFootprintService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/carbon")
@CrossOrigin(origins = "http://localhost:3000")
public class CarbonFootprintController {
    
    @Autowired
    private CarbonFootprintService carbonFootprintService;
    
    @PostMapping("/entries")
    public ResponseEntity<CarbonFootprintEntry> createEntry(@RequestBody CarbonFootprintEntry entry) {
        CarbonFootprintEntry savedEntry = carbonFootprintService.createEntry(entry);
        return ResponseEntity.ok(savedEntry);
    }
    
    @GetMapping("/entries/user/{userId}")
    public ResponseEntity<List<CarbonFootprintEntry>> getUserEntries(@PathVariable String userId) {
        List<CarbonFootprintEntry> entries = carbonFootprintService.getUserEntries(userId);
        return ResponseEntity.ok(entries);
    }
    
    @GetMapping("/entries/user/{userId}/range")
    public ResponseEntity<List<CarbonFootprintEntry>> getUserEntriesByDateRange(
            @PathVariable String userId,
            @RequestParam String start,
            @RequestParam String end) {
        
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        
        List<CarbonFootprintEntry> entries = carbonFootprintService.getUserEntriesByDateRange(userId, startDate, endDate);
        return ResponseEntity.ok(entries);
    }
    
    @GetMapping("/total/user/{userId}")
    public ResponseEntity<Double> getTotalCarbonEmission(@PathVariable String userId) {
        Double total = carbonFootprintService.getTotalCarbonEmission(userId);
        return ResponseEntity.ok(total);
    }
    
    @GetMapping("/total/user/{userId}/range")
    public ResponseEntity<Double> getTotalCarbonEmissionByDateRange(
            @PathVariable String userId,
            @RequestParam String start,
            @RequestParam String end) {
        
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        
        Double total = carbonFootprintService.getTotalCarbonEmissionByDateRange(userId, startDate, endDate);
        return ResponseEntity.ok(total);
    }
    
    @GetMapping("/breakdown/user/{userId}")
    public ResponseEntity<Map<ActivityType, Double>> getCarbonBreakdown(@PathVariable String userId) {
        Map<ActivityType, Double> breakdown = carbonFootprintService.getCarbonEmissionByActivityType(userId);
        return ResponseEntity.ok(breakdown);
    }
    
    @PostMapping("/summary/user/{userId}")
    public ResponseEntity<UserCarbonSummary> generateDailySummary(
            @PathVariable String userId,
            @RequestParam String date) {
        
        LocalDate summaryDate = LocalDate.parse(date);
        UserCarbonSummary summary = carbonFootprintService.generateDailySummary(userId, summaryDate);
        return ResponseEntity.ok(summary);
    }
    
    @GetMapping("/summaries/user/{userId}")
    public ResponseEntity<List<UserCarbonSummary>> getUserSummaries(@PathVariable String userId) {
        List<UserCarbonSummary> summaries = carbonFootprintService.getUserSummaries(userId);
        return ResponseEntity.ok(summaries);
    }
    
    @DeleteMapping("/entries/{entryId}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long entryId) {
        carbonFootprintService.deleteEntry(entryId);
        return ResponseEntity.noContent().build();
    }
}