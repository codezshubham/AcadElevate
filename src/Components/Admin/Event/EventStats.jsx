import React, { useEffect } from "react";
import { BarChart4 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventStats } from "../../../Redux/Faculty/EventSlice";
import FullScreenLoader from "../../Home/Pages/FullScreenLoader";

const colorPalette = [
  "bg-pink-400",
  "bg-purple-400",
  "bg-emerald-400",
  "bg-orange-400",
];

const EventStatsCards = () => {
  const dispatch = useDispatch();
  const { stats, isLoading, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEventStats());
  }, [dispatch]);

  const renderStats = () => {
    if (!stats) return [];

    const requiredKeys = [
      "totalEvents",
      "upcomingEvents",
      "completedEvents",
      "totalParticipants",
    ];
    if (!requiredKeys.every((key) => key in stats)) return [];

    return Object.entries(stats).map(([key, value], idx) => ({
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      value: value.toString(),
      color: colorPalette[idx % colorPalette.length],
      time: new Date().toLocaleTimeString(),
    }));
  };

  if (isLoading) return <FullScreenLoader />;

  if (error) {
    return (
      <div className="text-red-500 text-center font-medium p-4">
        Failed to load event stats: {error}
      </div>
    );
  }

  const dynamicStats = renderStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {dynamicStats.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No stats available
        </div>
      ) : (
        dynamicStats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-xl text-white p-5 shadow-md ${stat.color} flex flex-col justify-between`}
          >
            <div className="text-2xl font-semibold">{stat.value}</div>
            <div className="text-sm mb-3">{stat.label}</div>
            <div className="flex justify-between items-center text-xs opacity-90">
              <div className="flex items-center gap-1">update: {stat.time}</div>
              <BarChart4 className="h-5 w-5" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventStatsCards;
