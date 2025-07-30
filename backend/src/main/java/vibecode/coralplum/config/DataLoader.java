package vibecode.coralplum.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import vibecode.coralplum.model.ActivityType;
import vibecode.coralplum.model.CarbonFootprintEntry;
import vibecode.coralplum.service.CarbonFootprintService;

import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private CarbonFootprintService carbonFootprintService;
    
    @Override
    public void run(String... args) throws Exception {
        loadSampleData();
    }
    
    private void loadSampleData() {
        System.out.println("Loading sample carbon footprint data...");
        
        // Sample cloud usage entries
        CarbonFootprintEntry cloudEntry1 = new CarbonFootprintEntry();
        cloudEntry1.setUserId("demo-user");
        cloudEntry1.setActivityType(ActivityType.CLOUD_USAGE);
        cloudEntry1.setDescription("AWS EC2 instances for development");
        cloudEntry1.setCloudProvider("AWS");
        cloudEntry1.setComputeHours(24.0);
        cloudEntry1.setStorageGB(100.0);
        cloudEntry1.setDataTransferGB(50.0);
        cloudEntry1.setTimestamp(LocalDateTime.now().minusDays(2));
        
        CarbonFootprintEntry cloudEntry2 = new CarbonFootprintEntry();
        cloudEntry2.setUserId("demo-user");
        cloudEntry2.setActivityType(ActivityType.CLOUD_USAGE);
        cloudEntry2.setDescription("Google Cloud storage and compute");
        cloudEntry2.setCloudProvider("Google Cloud");
        cloudEntry2.setComputeHours(12.0);
        cloudEntry2.setStorageGB(200.0);
        cloudEntry2.setDataTransferGB(25.0);
        cloudEntry2.setTimestamp(LocalDateTime.now().minusDays(1));
        
        // Sample CI/CD entries
        CarbonFootprintEntry cicdEntry1 = new CarbonFootprintEntry();
        cicdEntry1.setUserId("demo-user");
        cicdEntry1.setActivityType(ActivityType.CICD_USAGE);
        cicdEntry1.setDescription("Jenkins pipeline builds");
        cicdEntry1.setCicdPlatform("Jenkins");
        cicdEntry1.setBuildMinutes(120);
        cicdEntry1.setProjectName("CoralPlum");
        cicdEntry1.setTimestamp(LocalDateTime.now().minusDays(1));
        
        CarbonFootprintEntry cicdEntry2 = new CarbonFootprintEntry();
        cicdEntry2.setUserId("demo-user");
        cicdEntry2.setActivityType(ActivityType.CICD_USAGE);
        cicdEntry2.setDescription("GitHub Actions workflows");
        cicdEntry2.setCicdPlatform("GitHub Actions");
        cicdEntry2.setBuildMinutes(80);
        cicdEntry2.setProjectName("Frontend Deployment");
        cicdEntry2.setTimestamp(LocalDateTime.now());
        
        // Sample email entries
        CarbonFootprintEntry emailEntry1 = new CarbonFootprintEntry();
        emailEntry1.setUserId("demo-user");
        emailEntry1.setActivityType(ActivityType.EMAIL_USAGE);
        emailEntry1.setDescription("Daily email communications");
        emailEntry1.setEmailCount(50);
        emailEntry1.setAttachmentSizeMB(25.0);
        emailEntry1.setTimestamp(LocalDateTime.now().minusDays(1));
        
        CarbonFootprintEntry emailEntry2 = new CarbonFootprintEntry();
        emailEntry2.setUserId("demo-user");
        emailEntry2.setActivityType(ActivityType.EMAIL_USAGE);
        emailEntry2.setDescription("Project documentation sharing");
        emailEntry2.setEmailCount(15);
        emailEntry2.setAttachmentSizeMB(100.0);
        emailEntry2.setTimestamp(LocalDateTime.now());
        
        // Save all sample entries
        carbonFootprintService.createEntry(cloudEntry1);
        carbonFootprintService.createEntry(cloudEntry2);
        carbonFootprintService.createEntry(cicdEntry1);
        carbonFootprintService.createEntry(cicdEntry2);
        carbonFootprintService.createEntry(emailEntry1);
        carbonFootprintService.createEntry(emailEntry2);
        
        System.out.println("Sample data loaded successfully!");
    }
}