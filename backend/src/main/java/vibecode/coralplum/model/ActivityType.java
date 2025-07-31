package vibecode.coralplum.model;

public enum ActivityType {
    CLOUD_USAGE("Cloud Computing Usage"),
    CICD_USAGE("CI/CD Pipeline Usage"),
    EMAIL_USAGE("Email Usage"),
    DIGITAL_STORAGE("Digital Storage"),
    VIDEO_STREAMING("Video Streaming"),
    WEB_BROWSING("Web Browsing"),
    SOCIAL_MEDIA("Social Media"),
    ONLINE_MEETING("Online Meeting"),
    OTHER("Other Digital Activity");
    
    private final String displayName;
    
    ActivityType(String displayName) {
        this.displayName = displayName;
    }
    
    public String getDisplayName() {
        return displayName;
    }
}