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
    private static final double DIGITAL_STORAGE_GB_MONTH_KG = 0.004; // kg CO2 per GB per month (general digital storage)
    private static final double VIDEO_STREAMING_HOUR_KG = 0.36; // kg CO2 per hour of HD video streaming
    private static final double WEB_BROWSING_MINUTE_KG = 0.0002; // kg CO2 per minute of web browsing
    private static final double SOCIAL_MEDIA_MINUTE_KG = 0.00015; // kg CO2 per minute of social media usage
    private static final double ONLINE_MEETING_HOUR_KG = 0.055; // kg CO2 per hour of online meeting (video call)
    
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

    public double calculateDigitalStorageCarbon(Double storageGB, Integer months) {
        if (storageGB == null || months == null) return 0.0;
        return storageGB * DIGITAL_STORAGE_GB_MONTH_KG * months;
    }

    public double calculateVideoStreamingCarbon(Double hours) {
        if (hours == null) return 0.0;
        return hours * VIDEO_STREAMING_HOUR_KG;
    }

    public double calculateWebBrowsingCarbon(Double hours) {
        if (hours == null) return 0.0;
        return hours * WEB_BROWSING_MINUTE_KG * 60;
    }

    public double calculateSocialMediaCarbon(Double hours) {
        if (hours == null) return 0.0;
        return hours * SOCIAL_MEDIA_MINUTE_KG * 60;
    }

    public double calculateOnlineMeetingCarbon(Double hours) {
        if (hours == null) return 0.0;
        return hours * ONLINE_MEETING_HOUR_KG;
    }
    
    public double calculateCarbonEmission(ActivityType activityType, 
                                         Double computeHours, Double storageGB, Double dataTransferGB,
                                         Integer buildMinutes, Integer emailCount, Double attachmentSizeMB,
                                         Integer digitalStorageMonths) {
        
        return switch (activityType) {
            case CLOUD_USAGE -> calculateCloudUsageCarbon(computeHours, storageGB, dataTransferGB);
            case CICD_USAGE -> calculateCicdUsageCarbon(buildMinutes);
            case EMAIL_USAGE -> calculateEmailUsageCarbon(emailCount, attachmentSizeMB);
            case DIGITAL_STORAGE -> calculateDigitalStorageCarbon(storageGB, digitalStorageMonths);
            case VIDEO_STREAMING -> calculateVideoStreamingCarbon(computeHours);
            case WEB_BROWSING -> calculateWebBrowsingCarbon(computeHours);
            case SOCIAL_MEDIA -> calculateSocialMediaCarbon(computeHours);
            case ONLINE_MEETING -> calculateOnlineMeetingCarbon(computeHours);
            default -> 0.0;
        };
    }
}