import { useEffect, useState } from 'react';

const apiBaseUrl = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';
})();

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data?.data && Array.isArray(data.data)) return data.data;
  return [];
}

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
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

    fetchActivities();
  }, []);

  return (
    <section className="resource-panel container py-4">
      <h2>Activities</h2>
      <p className="text-muted">Using endpoint: <code>{apiBaseUrl}</code></p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">Error loading activities: {String(error)}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Intensity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No activities found</td>
                </tr>
              )}
              {items.map((activity) => (
                <tr key={activity._id ?? activity.id ?? Math.random()}>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.intensity}</td>
                  <td>{new Date(activity.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
