import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57', '#a4de6c', '#ffbb28'];

const ProjectStats = ({ projects }) => {
  // 📅 Projects per Year (based on startDate)
  const yearData = projects.reduce((acc, project) => {
    const year = new Date(project.startDate).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(yearData).map(([year, count]) => ({
    year,
    count,
  }));

  // 📊 Status-wise Distribution
  const statusData = projects.reduce((acc, project) => {
    const status = project.projectStatus || 'UNKNOWN';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusData).map(([status, value]) => ({
    name: status.replace(/_/g, ' ').toUpperCase(),
    value,
  }));

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-10 text-white">
      <h2 className="text-2xl font-bold mb-6">📊 Project Statistics</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Bar Chart: Projects per Year */}
        <div>
          <h3 className="text-xl font-semibold mb-4">📅 Projects per Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="year" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Status-wise Distribution */}
        <div>
          <h3 className="text-xl font-semibold mb-4">📘 Status-wise Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
