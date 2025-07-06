export interface AnalyticsData {
  date: string;
  users: number;
  sessions: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface PageViewData {
  page: string;
  views: number;
  avgTimeOnPage: number;
}

export interface UserDemographics {
  country: string;
  users: number;
  percentage: number;
}

export interface DeviceData {
  device: string;
  sessions: number;
  percentage: number;
}

export interface TrafficSource {
  source: string;
  users: number;
  sessions: number;
  percentage: number;
}