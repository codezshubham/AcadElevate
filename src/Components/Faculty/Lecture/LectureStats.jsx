import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLectures } from "../../../Redux/Faculty/LectureSlice";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#A28FD0"];

const LectureStats = () => {
    const dispatch = useDispatch();
    const { lectures, isLoading } = useSelector(state => state.lecture);

    useEffect(() => {
        dispatch(getAllLectures());
    }, [dispatch]);

    // 1. Bar Chart: Lectures Delivered Per Year
    const yearlyData = lectures.reduce((acc, lecture) => {
        const year = new Date(lecture.lectureDate).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});
    const barChartData = Object.keys(yearlyData).map(year => ({
        year,
        count: yearlyData[year],
    }));

    // 2. Pie Chart: Lecture Type Distribution
    const typeDataMap = lectures.reduce((acc, lecture) => {
        acc[lecture.lectureType] = (acc[lecture.lectureType] || 0) + 1;
        return acc;
    }, {});
    const pieChartData = Object.entries(typeDataMap).map(([type, value]) => ({
        name: type,
        value,
    }));

    // 3. Donut Chart: Completed vs Upcoming
    const now = new Date();
    const completed = lectures.filter(l => new Date(l.lectureDate) < now).length;
    const upcoming = lectures.length - completed;

    const donutChartData = [
        { name: "Completed", value: completed },
        { name: "Upcoming", value: upcoming },
    ];

    if (isLoading) {
        return (
            <p className="text-center text-blue-600 font-semibold animate-pulse">
                Loading lecture statistics...
            </p>
        );
    }

    return (
        <div className="p-6 space-y-16">
            <h1 className="text-5xl font-bold text-start bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text pb-10">
                Lecture Insights & Stats
            </h1>

            {/* Bar Chart */}
            <div className="w-full h-96">
                <h2 className="text-2xl font-semibold mb-4 text-white text-center">Lectures Delivered Per Year</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                        <XAxis dataKey="year" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#00C49F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie + Donut Charts Side-by-Side */}
            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-12 mt-16">
                {/* Pie Chart */}
                <div className="w-full lg:w-1/2 h-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-white">Lecture Type Distribution</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name} (${(percent * 100).toFixed(0)}%)`
                                }
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Donut Chart */}
                <div className="w-full lg:w-1/2 h-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-white">Completed vs Upcoming Lectures</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={donutChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {donutChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default LectureStats;
