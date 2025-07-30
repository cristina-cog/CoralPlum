package vibecode.coralplum.dto;

import vibecode.coralplum.model.ActivityType;

public class CarbonFootprintRequest {
    
    private ActivityType activityType;
    private String description;
    private String userId;
    
    // Cloud usage fields
    private String cloudProvider;
    private Double computeHours;
    private Double storageGB;
    private Double dataTransferGB;
    
    // CI/CD fields
    private String cicdPlatform;
    private Integer buildMinutes;
    private String projectName;
    
    // Email fields
    private Integer emailCount;
    private Double attachmentSizeMB;
    
    // Constructors
    public CarbonFootprintRequest() {}
    
    // Getters and Setters
    public ActivityType getActivityType() { return activityType; }
    public void setActivityType(ActivityType activityType) { this.activityType = activityType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
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