"use client";

import { useState, useEffect } from "react";

type Activity = {
  id: string;
  title: string;
  activity: "FAVORITED" | "WATCH_LATER";
  timestamp: string;
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const res = await fetch("/api/activities?page=1");
        if (!res.ok) throw new Error("Failed to fetch activities");

        const data = await res.json();

        setActivities(data.activities || []);
      } catch (error) {
        console.error("Error fetching activites:", error);
      }
    };

    fetchActivites();
  }, []);

  return (
    <div className="flex flex-col text-left p-4 bg-accentTeal rounded-xl ">
      <p className="text-navyBlue text-center font-bold font-poppins pb-2 text-lg">
        Latest Activities
      </p>
      {activities.length === 0 ? (
        ""
      ) : (
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li key={activity.id}>
              <div className="text-navyBlue">
                {new Date(activity.timestamp).toLocaleString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </div>
              <div className="text-navyBlue">
                {activity.activity === "FAVORITED" ? (
                  <span>
                    Favorited
                    <span className="font-bold"> {activity.title}</span>
                  </span>
                ) : (
                  <span>
                    Added <span className="font-bold">{activity.title}</span> to
                    watch later
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
