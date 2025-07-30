package vibecode.coralplum.service;

import org.springframework.stereotype.Service;
import vibecode.coralplum.model.ActivityType;

@Service
public class CarbonCalculatorService {
    
    // Carbon emission factors (kg CO2 per unit)
    private static final double CLOUD_COMPUTE_HOUR_KG = 0.5; // kg CO2 per compute hour
    private static final double CLOUD_STORAGE_GB_KG = 0.0036; // kg CO2 per GB per month
    private static final double CLOUD_DATA_TRANSFER_GB_KG = 0.006; // kg CO2 per GB transferred
    private static final double CICD_BUILD_MINUTE_KG = 0.01; // kg CO2 per build minute
    private static final double EMAIL_BASE_KG = 0.000004; // kg CO2 per email
    private static final double EMAIL_ATTACHMENT_MB_KG = 0.00005; // kg CO2 per MB attachment
    
    public double calculateCloudUsageCarbon(Double computeHours, Double storageGB, Double dataTransferGB) {
        double carbon = 0.0;
        
        if (computeHours != null) {
            carbon += computeHours * CLOUD_COMPUTE_HOUR_KG;
        }
        
        if (storageGB != null) {
            // Assuming monthly storage usage
            carbon += storageGB * CLOUD_STORAGE_GB_KG;
        }
        
        if (dataTransferGB != null) {
            carbon += dataTransferGB * CLOUD_DATA_TRANSFER_GB_KG;
        }
        
        return carbon;
    }
    
    public double calculateCicdUsageCarbon(Integer buildMinutes) {
        if (buildMinutes == null) return 0.0;
        return buildMinutes * CICD_BUILD_MINUTE_KG;
    }
    
    public double calculateEmailUsageCarbon(Integer emailCount, Double attachmentSizeMB) {
        double carbon = 0.0;
        
        if (emailCount != null) {
            carbon += emailCount * EMAIL_BASE_KG;
        }
        
        if (attachmentSizeMB != null) {
            carbon += attachmentSizeMB * EMAIL_ATTACHMENT_MB_KG;
        }
        
        return carbon;
    }
    
    public double calculateCarbonEmission(ActivityType activityType, 
                                         Double computeHours, Double storageGB, Double dataTransferGB,
                                         Integer buildMinutes, Integer emailCount, Double attachmentSizeMB) {
        
        return switch (activityType) {
            case CLOUD_USAGE -> calculateCloudUsageCarbon(computeHours, storageGB, dataTransferGB);
            case CICD_USAGE -> calculateCicdUsageCarbon(buildMinutes);
            case EMAIL_USAGE -> calculateEmailUsageCarbon(emailCount, attachmentSizeMB);
            default -> 0.0;
        };
    }
}