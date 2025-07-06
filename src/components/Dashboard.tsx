import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsData, PageViewData, UserDemographics, DeviceData, TrafficSource } from '../types/analytics';
import { generateMockAnalyticsData, mockPageViewData, mockUserDemographics, mockDeviceData, mockTrafficSources } from '../services/mockData';
import './Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Dashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [timeRange, setTimeRange] = useState<number>(7);

  useEffect(() => {
    setAnalyticsData(generateMockAnalyticsData(timeRange));
  }, [timeRange]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Google Analytics Dashboard</h1>
        <div className="time-range-selector">
          <button className={timeRange === 7 ? 'active' : ''} onClick={() => setTimeRange(7)}>7 Days</button>
          <button className={timeRange === 30 ? 'active' : ''} onClick={() => setTimeRange(30)}>30 Days</button>
          <button className={timeRange === 90 ? 'active' : ''} onClick={() => setTimeRange(90)}>90 Days</button>
        </div>
      </header>

      <div className="metrics-summary">
        <div className="metric-card">
          <h3>Total Users</h3>
          <p className="metric-value">{analyticsData.reduce((sum, d) => sum + d.users, 0).toLocaleString()}</p>
        </div>
        <div className="metric-card">
          <h3>Total Sessions</h3>
          <p className="metric-value">{analyticsData.reduce((sum, d) => sum + d.sessions, 0).toLocaleString()}</p>
        </div>
        <div className="metric-card">
          <h3>Total Page Views</h3>
          <p className="metric-value">{analyticsData.reduce((sum, d) => sum + d.pageviews, 0).toLocaleString()}</p>
        </div>
        <div className="metric-card">
          <h3>Avg Bounce Rate</h3>
          <p className="metric-value">
            {analyticsData.length > 0 
              ? (analyticsData.reduce((sum, d) => sum + d.bounceRate, 0) / analyticsData.length).toFixed(1) + '%'
              : '0%'}
          </p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h2>Users & Sessions Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" />
              <Line type="monotone" dataKey="sessions" stroke="#82ca9d" name="Sessions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Page Views</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockPageViewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockTrafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.source}: ${entry.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
              >
                {mockTrafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Device Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockDeviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.device}: ${entry.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
              >
                {mockDeviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container full-width">
          <h2>User Demographics by Country</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockUserDemographics} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;