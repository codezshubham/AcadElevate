import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const ResearchStats = ({ publications }) => {
  // 📊 Publications per Year
  const yearData = publications.reduce((acc, pub) => {
    const year = new Date(pub.publicationDate).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(yearData).map(([year, count]) => ({
    year,
    count,
  }));

  // 🥧 Type-wise Distribution
  const typeData = publications.reduce((acc, pub) => {
    acc[pub.publicationType] = (acc[pub.publicationType] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(typeData).map(([type, value]) => ({
    name: type,
    value,
  }));

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-10 text-white">
      <h2 className="text-2xl font-bold mb-6">📈 Research Statistics</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Bar Chart: Publications per Year */}
        <div>
          <h3 className="text-xl font-semibold mb-4">🗓️ Publications per Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="year" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Type-wise Distribution */}
        <div>
          <h3 className="text-xl font-semibold mb-4">📘 Type-wise Distribution</h3>
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

export default ResearchStats;
