import { AnalyticsData, PageViewData, UserDemographics, DeviceData, TrafficSource, RealTimeData } from '../types/analytics';

export const generateMockAnalyticsData = (days: number): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 500) + 100,
      sessions: Math.floor(Math.random() * 800) + 200,
      pageviews: Math.floor(Math.random() * 2000) + 500,
      bounceRate: Math.random() * 40 + 30,
      avgSessionDuration: Math.random() * 180 + 60
    });
  }
  
  return data;
};

export const mockPageViewData: PageViewData[] = [
  { page: '/home', views: 4523, avgTimeOnPage: 125 },
  { page: '/products', views: 3421, avgTimeOnPage: 189 },
  { page: '/about', views: 2134, avgTimeOnPage: 98 },
  { page: '/contact', views: 1876, avgTimeOnPage: 156 },
  { page: '/blog', views: 1654, avgTimeOnPage: 234 }
];

export const mockUserDemographics: UserDemographics[] = [
  { country: 'United States', users: 4532, percentage: 35.2 },
  { country: 'United Kingdom', users: 2134, percentage: 16.6 },
  { country: 'Germany', users: 1876, percentage: 14.6 },
  { country: 'France', users: 1543, percentage: 12.0 },
  { country: 'Canada', users: 1234, percentage: 9.6 },
  { country: 'Others', users: 1543, percentage: 12.0 }
];

export const mockDeviceData: DeviceData[] = [
  { device: 'Desktop', sessions: 5432, percentage: 45.8 },
  { device: 'Mobile', sessions: 4876, percentage: 41.1 },
  { device: 'Tablet', sessions: 1554, percentage: 13.1 }
];

export const mockTrafficSources: TrafficSource[] = [
  { source: 'Organic Search', users: 4532, sessions: 5643, percentage: 38.2 },
  { source: 'Direct', users: 3421, sessions: 4231, percentage: 28.9 },
  { source: 'Social Media', users: 2134, sessions: 2654, percentage: 18.0 },
  { source: 'Referral', users: 1234, sessions: 1543, percentage: 10.4 },
  { source: 'Email', users: 543, sessions: 654, percentage: 4.5 }
];

export const generateRealTimeData = (): RealTimeData => {
  const baseActiveUsers = Math.floor(Math.random() * 50) + 20;
  
  return {
    activeUsers: baseActiveUsers + Math.floor(Math.random() * 10),
    newUsersLastHour: Math.floor(Math.random() * 20) + 5,
    pageViewsLastHour: Math.floor(Math.random() * 200) + 50,
    topPages: [
      { page: '/home', activeUsers: Math.floor(baseActiveUsers * 0.3) },
      { page: '/products', activeUsers: Math.floor(baseActiveUsers * 0.25) },
      { page: '/about', activeUsers: Math.floor(baseActiveUsers * 0.15) },
      { page: '/blog', activeUsers: Math.floor(baseActiveUsers * 0.2) },
      { page: '/contact', activeUsers: Math.floor(baseActiveUsers * 0.1) }
    ]
  };
};