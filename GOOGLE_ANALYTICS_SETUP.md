# Setting Up Real Google Analytics Data

This guide will help you connect your dashboard to real Google Analytics data.

## Prerequisites

1. A Google Analytics account with a property set up
2. A Google Cloud Platform account
3. Your Google Analytics Property ID (found in GA Admin → Property Settings)

## Step 1: Enable Google Analytics Data API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" → "Library"
4. Search for "Google Analytics Data API"
5. Click on it and press "Enable"

## Step 2: Create Service Account Credentials

1. In Google Cloud Console, go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in the service account details:
   - Name: `ga-dashboard-service`
   - Role: `Viewer`
4. Click "Done"
5. Click on the service account you just created
6. Go to "Keys" tab → "Add Key" → "Create New Key"
7. Choose JSON format and download the file

## Step 3: Grant Access to Google Analytics

1. Copy the service account email (ends with `@...iam.gserviceaccount.com`)
2. Go to Google Analytics Admin
3. Under "Property Access Management", click "+"
4. Add the service account email with "Viewer" permissions

## Step 4: Set Up Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_GA_PROPERTY_ID=your-property-id
REACT_APP_GA_CLIENT_EMAIL=your-service-account-email
REACT_APP_GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Step 5: Install Required Dependencies

```bash
npm install @google-analytics/data dotenv
```

## Step 6: Update Your Code

Replace the mock data service with the real Google Analytics service:

```typescript
// In Dashboard.tsx
import { GoogleAnalyticsService } from '../services/googleAnalytics';

const gaService = new GoogleAnalyticsService(process.env.REACT_APP_GA_PROPERTY_ID!);

// In your useEffect:
useEffect(() => {
  const fetchRealTimeData = async () => {
    try {
      const data = await gaService.getRealTimeData();
      setRealTimeData(data);
    } catch (error) {
      console.error('Failed to fetch GA data:', error);
      // Fall back to mock data
      setRealTimeData(generateRealTimeData());
    }
  };

  fetchRealTimeData();
  const interval = setInterval(fetchRealTimeData, 30000); // Update every 30 seconds

  return () => clearInterval(interval);
}, []);
```

## Step 7: Handle CORS and Security

For production use, you should:

1. **Create a backend API** to handle GA requests (recommended)
   - Keeps your credentials secure
   - Avoids CORS issues
   - Better control over data caching

2. **Example backend endpoint**:
```javascript
// Express.js example
app.get('/api/analytics/realtime', async (req, res) => {
  const data = await gaService.getRealTimeData();
  res.json(data);
});
```

## Step 8: Test Your Integration

1. Make sure your website has Google Analytics tracking code installed
2. Visit your website in multiple browser tabs
3. Check if the real-time visitor count updates in your dashboard

## Troubleshooting

### Common Issues:

1. **"Permission denied"**: Make sure the service account has access to your GA property
2. **"Invalid credentials"**: Check that your private key is properly formatted in the .env file
3. **"Property not found"**: Verify your property ID is correct (format: `123456789`)

### API Limits:

- Real-time API: 10,000 requests per day per project
- Core reporting API: 50,000 requests per day per project

## Alternative: Using Google Analytics Embed API

For a simpler setup, you can use the Google Analytics Embed API which handles authentication in the browser:

```html
<!-- In public/index.html -->
<script>
(function(w,d,s,g,js,fs){
  g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}};
  js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
  js.src='https://apis.google.com/js/platform.js';
  fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');};
}(window,document,'script'));
</script>
```

Then use the Embed API in your React components. This requires users to authenticate with their Google account.

## Security Best Practices

1. **Never expose service account credentials in frontend code**
2. **Use environment variables for sensitive data**
3. **Implement proper error handling**
4. **Consider implementing data caching to reduce API calls**
5. **Use a backend server for production deployments**

## Next Steps

1. Implement error handling and loading states
2. Add data caching to reduce API calls
3. Create more detailed analytics views
4. Add user authentication for multi-tenant support