import { useEffect, useState } from 'react';

const apiBaseUrl = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';
})();

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiBaseUrl);
        const data = await response.json();
        setItems(normalizeResponse(data));
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <section className="resource-panel container py-4">
      <h2>Teams</h2>
      <p className="text-muted">Using endpoint: <code>{apiBaseUrl}</code></p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">Error loading teams: {String(error)}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sport</th>
                <th>Members</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No teams found</td>
                </tr>
              )}
              {items.map((team) => (
                <tr key={team._id ?? team.id ?? Math.random()}>
                  <td>{team.name}</td>
                  <td>{team.sport}</td>
                  <td>{team.members}</td>
                  <td>{team.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Teams;
