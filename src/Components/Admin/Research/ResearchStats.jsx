import React, { useEffect } from "react";
import { BarChart4 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResearchStats } from "../../../Redux/Faculty/ResearchSlice"; // adjust path if needed
import FullScreenLoader from "../../Home/Pages/FullScreenLoader";

const colorPalette = [
  "bg-orange-400",
  "bg-purple-400",
  "bg-green-400",
  "bg-pink-400",
];

const ResearchStatsCards = () => {
  const dispatch = useDispatch();

  const { stats, loading, error } = useSelector((state) => state.publication);

  useEffect(() => {
    dispatch(fetchResearchStats());
  }, [dispatch]);

  // Ensure stats is available and structured properly before rendering
  const renderStats = () => {
    if (!stats) return [];

    // Check if stats is an object and has required keys
    const requiredKeys = ['totalPublications', 'totalFaculty', 'ongoingResearch', 'peerReviewedJournals'];
    if (!requiredKeys.every(key => key in stats)) return [];

    return Object.entries(stats).map(([key, value], idx) => ({
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      value: value.toString(),
      color: colorPalette[idx % colorPalette.length],
      time: new Date().toLocaleTimeString(),
    }));
  };

  // Handle loading state
  if (loading) return <FullScreenLoader />;

  // Handle error state
  if (error) {
    return (
      <div className="text-red-500 text-center font-medium p-4">
        Failed to load stats: {error}
      </div>
    );
  }

  // Render stats cards
  const dynamicStats = renderStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {dynamicStats.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">No stats available</div>
      ) : (
        dynamicStats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-xl text-white p-5 shadow-md ${stat.color} flex flex-col justify-between`}
          >
            <div className="text-2xl font-semibold">{stat.value}</div>
            <div className="text-sm mb-3">{stat.label}</div>
            <div className="flex justify-between items-center text-xs opacity-90">
              <div className="flex items-center gap-1">
                {/* <span className="material-icons text-sm">schedule</span> */}
                update: {stat.time}
              </div>
              <BarChart4 className="h-5 w-5" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ResearchStatsCards;
