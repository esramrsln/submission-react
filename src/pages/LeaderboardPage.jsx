import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboards } from "../features/leaderboard/leaderboardSlice";
import Loading from "../components/Loading";

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message || "Failed to fetch data"}</p>;

  return (
    <main className="container page-card leaderboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Apresiasi Kontributor</p>
          <h1>Leaderboard</h1>
          <p className="subhead">
            Lihat siapa saja yang paling aktif membantu komunitas minggu ini.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="empty-state">Belum ada data leaderboard.</p>
      ) : (
        <div className="table-card">
          <div className="table-wrapper">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Nama</th>
                  <th>Skor</th>
                </tr>
              </thead>
              <tbody>
                {items.map((entry, index) => (
                  <tr key={entry.user.id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="avatar-ring">
                        <img src={entry.user.avatar} alt={entry.user.name} />
                      </span>
                    </td>
                    <td>{entry.user.name}</td>
                    <td className="score">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
