import { useEffect, useState } from 'react';

const resourceName = 'users';
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
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
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

    fetchUsers();
  }, []);

  return (
    <section className="resource-panel container py-4">
      <h2>Users</h2>
      <p className="text-muted">Using endpoint: <code>{apiBaseUrl}</code></p>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">Error loading users: {String(error)}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Fitness Level</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No users found</td>
                </tr>
              )}
              {items.map((user) => (
                <tr key={user._id ?? user.id ?? Math.random()}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.fitnessLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
