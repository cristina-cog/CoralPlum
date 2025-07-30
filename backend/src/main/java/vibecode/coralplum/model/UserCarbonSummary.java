package vibecode.coralplum.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Map;

@Entity
@Table(name = "user_carbon_summary")
public class UserCarbonSummary {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String userId;
    private LocalDate summaryDate;
    private Double totalCarbonEmissionKg;
    
    @ElementCollection
    @CollectionTable(name = "carbon_by_activity_type")
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "carbon_emission")
    private Map<ActivityType, Double> carbonByActivityType;
    
    // Constructors
    public UserCarbonSummary() {}
    
    public UserCarbonSummary(String userId, LocalDate summaryDate, 
                            Double totalCarbonEmissionKg, Map<ActivityType, Double> carbonByActivityType) {
        this.userId = userId;
        this.summaryDate = summaryDate;
        this.totalCarbonEmissionKg = totalCarbonEmissionKg;
        this.carbonByActivityType = carbonByActivityType;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public LocalDate getSummaryDate() { return summaryDate; }
    public void setSummaryDate(LocalDate summaryDate) { this.summaryDate = summaryDate; }
    
    public Double getTotalCarbonEmissionKg() { return totalCarbonEmissionKg; }
    public void setTotalCarbonEmissionKg(Double totalCarbonEmissionKg) { this.totalCarbonEmissionKg = totalCarbonEmissionKg; }
    
    public Map<ActivityType, Double> getCarbonByActivityType() { return carbonByActivityType; }
    public void setCarbonByActivityType(Map<ActivityType, Double> carbonByActivityType) { this.carbonByActivityType = carbonByActivityType; }
}