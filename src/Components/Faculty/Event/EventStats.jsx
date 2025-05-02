import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParticipatedEvents } from "../../../Redux/Faculty/EventSlice";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import FullScreenLoader from "../../Home/Pages/FullScreenLoader";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#6a5acd"];

const EventStats = () => {
    const dispatch = useDispatch();
    const { participatedEvents, isLoading } = useSelector(state => state.event);

    useEffect(() => {
        dispatch(getParticipatedEvents());
    }, [dispatch]);

    // 1. Bar Chart Data: Events Participated Per Year
    const yearlyData = participatedEvents.reduce((acc, event) => {
        const year = new Date(event.eventDate).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});
    const barChartData = Object.keys(yearlyData).map(year => ({
        year,
        count: yearlyData[year],
    }));

    // 2. Pie Chart Data: Event Type Distribution
    const typeDataMap = participatedEvents.reduce((acc, event) => {
        acc[event.eventType] = (acc[event.eventType] || 0) + 1;
        return acc;
    }, {});
    const pieChartData = Object.entries(typeDataMap).map(([type, value]) => ({
        name: type,
        value,
    }));

    // 3. Donut Chart Data: Completed vs Ongoing
    const now = new Date();
    const completed = participatedEvents.filter(e => new Date(e.eventDate) < now).length;
    const ongoing = participatedEvents.length - completed;

    const donutChartData = [
        { name: "Completed", value: completed },
        { name: "Ongoing", value: ongoing },
    ];

    if (isLoading) {
        return (
           <FullScreenLoader/>
        );
    }

    return (
        <div className="p-6 space-y-16">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text py-6">
                Event Insights & Stats
            </h1>

            <div className="w-full h-96">
                <h2 className="text-2xl font-semibold mb-4 text-white text-center">Events Participated Per Year</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                        <XAxis dataKey="year" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie + Donut Charts Side-by-Side */}
            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-12 mt-16">
                {/* Pie Chart */}
                <div className="w-full lg:w-1/2 h-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-white">Event Type Distribution</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
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
                    <h2 className="text-2xl font-semibold mb-4 text-center text-white">Completed vs Ongoing Events</h2>
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

export default EventStats;
