package vibecode.coralplum.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;

@Entity
@Table(name = "carbon_footprint_entries")
public class CarbonFootprintEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private ActivityType activityType;
    
    @NotNull
    private String description;
    
    @PositiveOrZero
    private Double carbonEmissionKg;

    @NotNull
    private LocalDateTime timestamp;

    private Integer digitalStorageMonths;

    @PositiveOrZero
    private Double computeHours;
    
    private String userId;
    
    // Cloud usage specific fields
    private String cloudProvider;
    private Double storageGB;
    private Double dataTransferGB;
    
    // CI/CD specific fields
    private String cicdPlatform;
    private Integer buildMinutes;
    private String projectName;
    
    // Email specific fields
    private Integer emailCount;
    private Double attachmentSizeMB;
    
    // Constructors
    public CarbonFootprintEntry() {}
    
    public CarbonFootprintEntry(ActivityType activityType, String description, 
                               Double carbonEmissionKg, Double computeHours,
                               Integer digitalStorageMonths, LocalDateTime timestamp,
                               String userId) {

        this.activityType = activityType;
        this.description = description;
        this.carbonEmissionKg = carbonEmissionKg;
        this.computeHours = computeHours;
        this.digitalStorageMonths = digitalStorageMonths;
        this.timestamp = timestamp;
        this.userId = userId;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public ActivityType getActivityType() { return activityType; }
    public void setActivityType(ActivityType activityType) { this.activityType = activityType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Double getCarbonEmissionKg() { return carbonEmissionKg; }
    public void setCarbonEmissionKg(Double carbonEmissionKg) { this.carbonEmissionKg = carbonEmissionKg; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Integer getDigitalStorageMonths() { return digitalStorageMonths; }
    public void setDigitalStorageMonths(Integer digitalStorageMonths) {
        this.digitalStorageMonths = digitalStorageMonths;
    }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getCloudProvider() { return cloudProvider; }
    public void setCloudProvider(String cloudProvider) { this.cloudProvider = cloudProvider; }
    
    public Double getComputeHours() { return computeHours; }
    public void setComputeHours(Double computeHours) { this.computeHours = computeHours; }
    
    public Double getStorageGB() { return storageGB; }
    public void setStorageGB(Double storageGB) { this.storageGB = storageGB; }
    
    public Double getDataTransferGB() { return dataTransferGB; }
    public void setDataTransferGB(Double dataTransferGB) { this.dataTransferGB = dataTransferGB; }
    
    public String getCicdPlatform() { return cicdPlatform; }
    public void setCicdPlatform(String cicdPlatform) { this.cicdPlatform = cicdPlatform; }
    
    public Integer getBuildMinutes() { return buildMinutes; }
    public void setBuildMinutes(Integer buildMinutes) { this.buildMinutes = buildMinutes; }
    
    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }
    
    public Integer getEmailCount() { return emailCount; }
    public void setEmailCount(Integer emailCount) { this.emailCount = emailCount; }
    
    public Double getAttachmentSizeMB() { return attachmentSizeMB; }
    public void setAttachmentSizeMB(Double attachmentSizeMB) { this.attachmentSizeMB = attachmentSizeMB; }
}