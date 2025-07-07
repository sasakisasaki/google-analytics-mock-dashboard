# Google Analytics Dashboard

:warning: THIS REPOSITORY IS FEASIBILITY STUDY PURPOSE MADE BY CLAUDE CODE FOR PRIVATE DEVELOPMENT :warning:

A React-based dashboard for visualizing Google Analytics data with interactive charts and metrics.

## Features

- **Real-time Analytics Overview**: Display key metrics including users, sessions, page views, and bounce rate
- **Interactive Time Range Selection**: Switch between 7, 30, and 90-day views
- **Multiple Visualization Types**:
  - Line charts for trends over time
  - Bar charts for page views and demographics
  - Pie charts for traffic sources and device distribution
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **TypeScript Support**: Full type safety for better development experience

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd google-analytics-dashboard
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx       # Main dashboard component
│   └── Dashboard.css       # Dashboard styling
├── services/
│   └── mockData.ts        # Mock data generator
├── types/
│   └── analytics.ts       # TypeScript interfaces
├── App.tsx                # Root component
├── App.css                # Global styles
└── index.tsx              # Application entry point
```

## Data Integration

Currently, the dashboard uses mock data for demonstration purposes. To integrate with real Google Analytics:

1. **Set up Google Analytics Data API**:
   - Enable the Google Analytics Data API in Google Cloud Console
   - Create credentials (OAuth2 or Service Account)
   - Install the Google Analytics Data API client library

2. **Replace Mock Data Service**:
   ```typescript
   // Example API integration
   import { BetaAnalyticsDataClient } from '@google-analytics/data';
   
   const analyticsDataClient = new BetaAnalyticsDataClient();
   ```

3. **Update Data Fetching**:
   - Replace `mockData.ts` with actual API calls
   - Handle authentication
   - Map API responses to the existing data interfaces

## Customization

### Adding New Metrics

1. Update the `analytics.ts` file with new interfaces
2. Add visualization components in `Dashboard.tsx`
3. Style with corresponding CSS classes

### Changing Color Schemes

Modify the `COLORS` array in `Dashboard.tsx`:
```typescript
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
```

### Adjusting Time Ranges

Add new time range options in the `Dashboard.tsx` component:
```typescript
<button onClick={() => setTimeRange(365)}>1 Year</button>
```

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Recharts** - Chart library
- **Axios** - HTTP client (ready for API integration)
- **CSS3** - Styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Real Google Analytics API integration
- [ ] User authentication
- [ ] Custom date range picker
- [ ] Export functionality (PDF/CSV)
- [ ] Real-time data updates
- [ ] Dark mode support
- [ ] Additional chart types
- [ ] Performance optimization for large datasets