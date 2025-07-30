# 🌱 Digital Carbon Footprint Tracker

A comprehensive full-stack application for tracking and analyzing your digital carbon footprint across various online activities including cloud usage, CI/CD operations, email communications, and more.

![Digital Carbon Footprint Tracker](https://img.shields.io/badge/Status-Active-green)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![Java](https://img.shields.io/badge/Java-17-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [💻 Usage](#-usage)
- [🔌 API Documentation](#-api-documentation)
- [📁 Project Structure](#-project-structure)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [🔮 Future Enhancements](#-future-enhancements)
- [📄 License](#-license)

## 🌟 Features

### Core Functionality
- **Multi-Activity Tracking**: Monitor carbon emissions from various digital activities
- **Real-time Calculations**: Automatic carbon footprint computation using industry standards
- **Interactive Dashboard**: Beautiful data visualization with charts and analytics
- **Activity Management**: Add, view, and manage your digital activities
- **Responsive Design**: Modern UI that works on desktop and mobile devices

### Supported Activities
- ☁️ **Cloud Usage**: AWS, Google Cloud, Azure compute/storage/transfer tracking
- 🔧 **CI/CD Operations**: Jenkins, GitHub Actions, GitLab CI build monitoring
- 📧 **Email Communications**: Email count and attachment size tracking
- 💾 **Digital Storage**: File storage and backup carbon footprint
- 📺 **Video Streaming**: Video calls and streaming services
- 🌐 **Web Browsing**: General web activity monitoring

### Analytics & Insights
- **Total Carbon Footprint**: Comprehensive emission calculations in kg CO₂
- **Activity Breakdown**: Detailed analysis by activity type with percentages
- **Visual Charts**: Interactive pie charts and bar graphs
- **Historical Tracking**: Monitor changes over time
- **Recent Activity Feed**: View latest entries with detailed information

## 🏗️ Architecture

### Technology Stack

**Backend (Spring Boot)**
- **Framework**: Spring Boot 3.2.0
- **Database**: H2 (in-memory) / PostgreSQL (production)
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven
- **Java Version**: 17

**Frontend (React)**
- **Framework**: React 18.0.0
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Custom CSS with responsive design

**Development Tools**
- **Version Control**: Git
- **Package Manager**: npm
- **Development Server**: React Scripts

### System Architecture

```
┌─────────────────┐    HTTP/REST API    ┌──────────────────┐
│   React Frontend│◄──────────────────►│ Spring Boot API  │
│   (Port 3000)   │                    │   (Port 8080)    │
└─────────────────┘                    └──────────────────┘
                                                 │
                                                 ▼
                                       ┌──────────────────┐
                                       │   H2 Database    │
                                       │  (In-memory)     │
                                       └──────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- **Java 17** or higher
- **Node.js 16** or higher
- **npm** or **yarn**
- **Maven 3.6** or higher

### Clone and Run
```bash
# Clone the repository
git clone https://github.com/your-repo/CoralPlum.git
cd CoralPlum

# Start Backend (Terminal 1)
cd backend
mvn spring-boot:run

# Start Frontend (Terminal 2)
cd frontend
npm install
npm start
```

**Application URLs:**
- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:8080/api
- 🗄️ **H2 Database Console**: http://localhost:8080/h2-console

## 📦 Installation

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
mvn clean install
```

3. **Run the application**
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080` with sample data pre-loaded.

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`.

### Database Configuration

**Development (H2 - Default)**
```properties
spring.datasource.url=jdbc:h2:mem:carbontracker
spring.h2.console.enabled=true
```

**Production (PostgreSQL)**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/carbontracker
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 💻 Usage

### Dashboard Overview
- View your total carbon footprint in kg CO₂
- Analyze activity breakdown with interactive charts
- Monitor recent activities and their emissions
- Track progress over time

### Adding New Activities

1. **Navigate to "Track Activity"** from the navigation menu
2. **Select Activity Type** (Cloud Usage, CI/CD, Email, etc.)
3. **Fill in Activity Details**:
   - For Cloud Usage: Provider, compute hours, storage GB, data transfer
   - For CI/CD: Platform, build minutes, project name
   - For Email: Email count, attachment size
4. **Submit** - Carbon emissions calculated automatically

### Sample Data
The application comes with pre-loaded sample data:
- **Cloud Usage**: AWS and Google Cloud instances
- **CI/CD**: Jenkins and GitHub Actions builds
- **Email**: Daily communications and document sharing

## 🔌 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Core Endpoints

#### Carbon Footprint Management

**Get User Entries**
```http
GET /carbon/entries/user/{userId}
```

**Create New Entry**
```http
POST /carbon/entries
Content-Type: application/json

{
  "activityType": "CLOUD_USAGE",
  "description": "AWS EC2 instances",
  "userId": "demo-user",
  "cloudProvider": "AWS",
  "computeHours": 24.0,
  "storageGB": 100.0,
  "dataTransferGB": 50.0
}
```

**Get Total Carbon Emission**
```http
GET /carbon/total/user/{userId}
```

**Get Activity Breakdown**
```http
GET /carbon/breakdown/user/{userId}
```

#### Analytics

**Get Entries by Date Range**
```http
GET /carbon/entries/user/{userId}/range?start=2024-01-01T00:00:00&end=2024-12-31T23:59:59
```

**Generate Daily Summary**
```http
POST /carbon/summary/user/{userId}?date=2024-07-30
```

### Carbon Calculation Factors

| Activity Type | Factor | Unit |
|---------------|--------|------|
| Cloud Compute | 0.5 kg CO₂ | per hour |
| Cloud Storage | 0.0036 kg CO₂ | per GB/month |
| Data Transfer | 0.006 kg CO₂ | per GB |
| CI/CD Build | 0.01 kg CO₂ | per minute |
| Email Base | 0.000004 kg CO₂ | per email |
| Email Attachment | 0.00005 kg CO₂ | per MB |

## 📁 Project Structure

```
CoralPlum/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/vibecode/coralplum/
│   │   ├── config/                   # Configuration classes
│   │   │   └── DataLoader.java       # Sample data loader
│   │   ├── controller/               # REST Controllers
│   │   │   └── CarbonFootprintController.java
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   └── CarbonFootprintRequest.java
│   │   ├── model/                    # JPA Entities
│   │   │   ├── ActivityType.java     # Activity type enum
│   │   │   ├── CarbonFootprintEntry.java
│   │   │   └── UserCarbonSummary.java
│   │   ├── repository/               # JPA Repositories
│   │   │   ├── CarbonFootprintEntryRepository.java
│   │   │   └── UserCarbonSummaryRepository.java
│   │   ├── service/                  # Business Logic
│   │   │   ├── CarbonCalculatorService.java
│   │   │   └── CarbonFootprintService.java
│   │   └── DemoApplication.java      # Main application class
│   ├── src/main/resources/
│   │   └── application.properties    # Application configuration
│   └── pom.xml                       # Maven dependencies
├── frontend/                         # React Frontend
│   ├── public/                       # Static assets
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/               # React Components
│   │   │   ├── ActivityBreakdown.js  # Activity analysis component
│   │   │   ├── CarbonChart.js        # Chart visualization
│   │   │   ├── Dashboard.js          # Main dashboard
│   │   │   ├── RecentEntries.js      # Activity feed
│   │   │   └── TrackingForm.js       # Activity input form
│   │   ├── services/                 # API integration
│   │   │   └── api.js                # Axios API client
│   │   ├── App.css                   # Global styles
│   │   ├── App.js                    # Main App component
│   │   ├── index.css                 # Base styles
│   │   └── index.js                  # React entry point
│   └── package.json                  # npm dependencies
└── README.md                         # Project documentation
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### API Testing with curl
```bash
# Test API health
curl http://localhost:8080/api/carbon/entries/user/demo-user

# Test carbon calculation
curl -X POST http://localhost:8080/api/carbon/entries \
  -H "Content-Type: application/json" \
  -d '{
    "activityType": "CLOUD_USAGE",
    "description": "Test cloud usage",
    "userId": "demo-user",
    "computeHours": 10.0
  }'
```

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **Backend**: Follow Spring Boot best practices and Java naming conventions
- **Frontend**: Use ESLint and Prettier for code formatting
- **Documentation**: Update README for any new features
- **Testing**: Include unit tests for new functionality

### Development Setup
```bash
# Install pre-commit hooks
npm install -g husky
husky install

# Format code
cd frontend && npm run format
cd backend && mvn spotless:apply
```

## 🔮 Future Enhancements

### 🔄 Planned Features
- [ ] **User Authentication**: Multi-user support with secure login
- [ ] **Cloud Provider Integration**: Direct API integration with AWS, GCP, Azure
- [ ] **Advanced Analytics**: Trend analysis and forecasting
- [ ] **Carbon Offset Marketplace**: Integration with carbon credit providers
- [ ] **Mobile App**: React Native mobile application
- [ ] **Notifications**: Alerts for high carbon usage
- [ ] **Team Dashboard**: Organization-level carbon tracking
- [ ] **Export Features**: PDF reports and data export
- [ ] **Third-party Integrations**: Slack, Microsoft Teams notifications
- [ ] **Gamification**: Achievement system and carbon reduction goals

### 🎯 Performance Improvements
- [ ] **Caching**: Redis implementation for better performance
- [ ] **Database Optimization**: PostgreSQL with connection pooling
- [ ] **CDN Integration**: Static asset optimization
- [ ] **Progressive Web App**: Offline capabilities

### 🔒 Security Enhancements
- [ ] **OAuth2 Integration**: Google, GitHub, Microsoft authentication
- [ ] **API Rate Limiting**: Prevent abuse and ensure fair usage
- [ ] **Data Encryption**: Sensitive data protection
- [ ] **Audit Logging**: Track all user activities

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌍 Environmental Impact

This application helps organizations and individuals understand and reduce their digital carbon footprint. Every small action counts towards a more sustainable digital future.

**Made with 🌱 by the Carbon-Conscious Development Team**

### 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/your-repo/CoralPlum/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/CoralPlum/discussions)
- **Email**: carbon-tracker@example.com

### 🙏 Acknowledgments

- Carbon emission factors based on research from various environmental organizations
- UI/UX inspiration from leading sustainability platforms
- Community contributions and feedback

---

*Together, we can make the digital world more sustainable! 🌱*