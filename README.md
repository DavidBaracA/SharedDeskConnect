# SharedDeskConnect

**SharedDeskConnect** is a full-stack web application designed to connect people who need workspace with those who have space to share. It's a modern desk rental marketplace platform that enables users to list, discover, and book shared workspaces such as desks, offices, or co-working spaces.

## 🎯 Project Overview

SharedDeskConnect simplifies the process of finding and renting workspace by providing a seamless platform where:
- **Space Owners/Renters** can list their available workspaces with detailed descriptions, pricing, capacity, and amenities
- **Users** can browse available spaces, view details, and make rental requests
- Both parties receive notifications about rental requests and confirmations
- Users can manage their listings and track their rental history

## ✨ Key Features

### For Space Owners
- **List Your Space**: Create detailed listings with descriptions, pricing, capacity, location, and contact information
- **Upload Images**: Showcase your space with multiple photos using an intuitive image uploader
- **Amenities Selection**: Highlight features like WiFi, parking, coffee machines, printers, gaming areas, quiet zones, and 24/7 access
- **Manage Listings**: View and manage all your listed spaces
- **Rental Management**: Approve or decline rental requests
- **Custom Pricing**: Set custom prices for specific rentals

### For Space Seekers
- **Browse Spaces**: Explore available workspaces filtered by location and capacity
- **Detailed Views**: See comprehensive information about each space including images, amenities, pricing, and availability
- **Request Rentals**: Submit rental requests specifying dates and number of persons
- **Track Rentals**: View all your current and past rental bookings
- **Notifications**: Receive updates about your rental requests

### General Features
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Modern, mobile-friendly interface built with Material-UI
- **Email Notifications**: Automated email system for rental updates
- **FAQ Section**: Helpful information for new users
- **Real-time Updates**: Dynamic content updates using Redux state management

## 🏗️ Architecture

SharedDeskConnect follows a modern three-tier architecture:

### Frontend (WEB)
- **Technology**: React 18.2.0
- **State Management**: Redux Toolkit with Redux Persist
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Styling**: Emotion, Styled Components
- **Key Libraries**:
  - `react-datepicker` for date selection
  - `react-image-gallery` for image displays
  - `react-images-uploading` for file uploads
  - `date-fns` for date manipulation

### Backend (API)
- **Technology**: ASP.NET Core (C#)
- **Framework**: .NET with Entity Framework Core
- **Database**: Microsoft SQL Server
- **API Documentation**: Swagger/OpenAPI
- **Email Service**: SMTP integration for notifications
- **Key Features**:
  - RESTful API endpoints
  - Database-first approach with Entity Framework
  - CORS enabled for cross-origin requests
  - Email service for automated notifications

### Database Models
- **User**: Authentication and user management
- **Space**: Workspace listings with details
- **Rental**: Booking/rental transactions
- **Image**: Space image storage
- **NotificationPreference**: User notification settings

## 📁 Project Structure

```
SharedDeskConnect/
├── API/                          # Backend API
│   └── SharedDeskConnect/
│       ├── SharedDeskConnect/    # Main API project
│       │   ├── Controllers/      # API endpoints
│       │   ├── Models/          # Data models
│       │   ├── Services/        # Business logic (Email service, etc.)
│       │   ├── Program.cs       # Application entry point
│       │   └── appsettings.json # Configuration
│       └── SharedDeskConnect.sln
├── WEB/                         # Frontend application
│   └── SharedDeskConnect/
│       ├── public/              # Static assets
│       ├── src/
│       │   ├── Components/      # Reusable React components
│       │   ├── Pages/          # Page components
│       │   ├── Redux/          # State management
│       │   ├── Icons/          # Icon assets
│       │   └── App.js          # Main application component
│       └── package.json
├── Anexe/                       # Documentation/Attachments
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) and npm
- **.NET SDK** (v6.0 or higher)
- **SQL Server** (Local or Azure)
- **Visual Studio** or **Visual Studio Code** (recommended)

### Backend Setup

1. **Navigate to the API directory**:
   ```bash
   cd API/SharedDeskConnect
   ```

2. **Configure the database connection**:
   - Update `appsettings.json` with your SQL Server connection string:
     ```json
     "ConnectionStrings": {
       "sharedDeskConnectionDBCon": "Your-SQL-Server-Connection-String"
     }
     ```

3. **Configure SMTP settings** (for email notifications):
   - Update the `SmtpSettings` section in `appsettings.json`

4. **Run database migrations** (if applicable):
   ```bash
   dotnet ef database update
   ```

5. **Run the API**:
   ```bash
   dotnet run
   ```

   The API will start on `https://localhost:7XXX` (check console output for exact port)

### Frontend Setup

1. **Navigate to the WEB directory**:
   ```bash
   cd WEB/SharedDeskConnect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API endpoint** (if needed):
   - Update the API base URL in your Redux configuration or environment files

4. **Start the development server**:
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 🔧 API Endpoints

### User Endpoints
- `POST /api/User/register` - Register a new user
- `POST /api/User/login` - User authentication
- `GET /api/User/{id}` - Get user details

### Space Endpoints
- `GET /api/Space` - Get all spaces
- `GET /api/Space/{id}` - Get space by ID
- `POST /api/Space` - Create a new space listing
- `PUT /api/Space/{id}` - Update space details
- `DELETE /api/Space/{id}` - Delete a space

### Rental Endpoints
- `GET /api/Rental` - Get all rentals
- `GET /api/Rental/{id}` - Get rental by ID
- `POST /api/Rental` - Create a rental request
- `PUT /api/Rental/{id}` - Update rental status
- `DELETE /api/Rental/{id}` - Cancel a rental

### Notification Endpoints
- `POST /api/Notification/send` - Send email notification

## 📝 Usage

### Listing a Space
1. Register or log in to your account
2. Navigate to "List Your Space"
3. Fill in the space details (name, location, price, capacity, etc.)
4. Upload images of your space
5. Select available amenities
6. Submit your listing

### Renting a Space
1. Browse available spaces on the homepage
2. Click on a space to view details
3. Select rental dates and number of persons
4. Submit a rental request
5. Wait for owner approval
6. Receive email confirmation

## 🛠️ Development

### Running Tests

**Frontend**:
```bash
cd WEB/SharedDeskConnect
npm test
```

**Backend**:
```bash
cd API/SharedDeskConnect
dotnet test
```

### Building for Production

**Frontend**:
```bash
cd WEB/SharedDeskConnect
npm run build
```

**Backend**:
```bash
cd API/SharedDeskConnect
dotnet publish -c Release
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is part of an academic work. Please check with the repository owner for licensing information.

## 👤 Author

**David Barac-Antonescu**

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**Note**: This application is a learning project demonstrating full-stack development with React and ASP.NET Core.
