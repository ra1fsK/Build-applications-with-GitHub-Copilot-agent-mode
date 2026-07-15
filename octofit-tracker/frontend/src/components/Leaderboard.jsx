import { useEffect, useState } from 'react';

const resourceName = 'leaderboard';
const apiBaseUrl = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';
})();

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiBaseUrl}/${resourceName}`);
        const data = await response.json();
        setItems(normalizeResponse(data));
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <section className="resource-panel container py-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">Using endpoint: <code>{`${apiBaseUrl}/${resourceName}`}</code></p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">Error loading leaderboard: {String(error)}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">No leaderboard data found</td>
                </tr>
              )}
              {items.map((entry) => (
                <tr key={entry._id ?? entry.id ?? Math.random()}>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                  <td>{entry.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
