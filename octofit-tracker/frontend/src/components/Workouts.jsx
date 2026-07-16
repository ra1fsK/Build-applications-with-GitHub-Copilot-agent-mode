import { useEffect, useState } from 'react';

const resourceName = 'workouts';
const apiBaseUrl = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${resourceName}/`
    : `http://localhost:8000/api/${resourceName}/`;
})();

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
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

    fetchWorkouts();
  }, []);

  return (
    <section className="resource-panel container py-4">
      <h2>Workouts</h2>
      <p className="text-muted">Using endpoint: <code>{apiBaseUrl}</code></p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">Error loading workouts: {String(error)}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Level</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No workouts found</td>
                </tr>
              )}
              {items.map((workout) => (
                <tr key={workout._id ?? workout.id ?? Math.random()}>
                  <td>{workout.title}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.level}</td>
                  <td>{workout.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
