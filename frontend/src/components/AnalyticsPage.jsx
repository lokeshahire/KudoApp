import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../App.css";

function AnalyticsPage({ setPage }) {
  const [badgeLikes, setBadgeLikes] = useState({
    "Helping Hand": 0,
    Excellence: 0,
    "Above and Beyond": 0,
    "Client Focus": 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [mostLikedPost, setMostLikedPost] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const likesResponse = await fetch(
        "https://kudoappbackend.onrender.com/kudo/badgeLikes"
      );
      const likesData = await likesResponse.json();
      setBadgeLikes(likesData.badgeLikes);

      const userResponse = await fetch(
        "https://kudoappbackend.onrender.com/user"
      );
      const userData = await userResponse.json();

      const leaderboardData = userData.users.map((user) => ({
        name: user.name,
        count: user.kudos,
      }));
      setLeaderboard(leaderboardData);

      const mostLiked = await fetch(
        "https://kudoappbackend.onrender.com/kudo/analytics"
      );
      const mostLikedData = await mostLiked.json();
      setMostLikedPost(mostLikedData.mostLiked);
    };

    fetchAnalyticsData();
  }, []);

  const chartData = {
    labels: ["Helping Hand", "Excellence", "Above and Beyond", "Client Focus"],
    datasets: [
      {
        label: "Likes per Badge",
        data: [
          badgeLikes["Helping Hand"],
          badgeLikes["Excellence"],
          badgeLikes["Above and Beyond"],
          badgeLikes["Client Focus"],
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between mb-5">
        <h2></h2>
        <button onClick={() => setPage("landing")}>Langing Page</button>
      </div>

      <div className="d-flex justify-content-evenly">
        <div>
          <h4>Kudos Given</h4>
          <div className="barchart">
            <Bar data={chartData} />
          </div>
        </div>

        <div>
          <h4>Kudo Leaderboard</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Kudos Received</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.name}>
                  <td>{entry.name}</td>
                  <td>{entry.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-3">
        <h5>Most Liked Post</h5>
        {mostLikedPost ? (
          <div>
            <p>
              <strong>Post:</strong> {mostLikedPost.badge} badge to{" "}
              {mostLikedPost.recipient}
            </p>
            <p>
              <strong>Likes:</strong> {mostLikedPost.likes}
            </p>
          </div>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default AnalyticsPage;
