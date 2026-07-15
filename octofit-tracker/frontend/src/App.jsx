import { NavLink, Routes, Route } from 'react-router-dom'
import './App.css'
import Users from './components/Users.jsx'
import Teams from './components/Teams.jsx'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Workouts from './components/Workouts.jsx'

const getApiBaseNote = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? null
    : 'Set VITE_CODESPACE_NAME in .env.local to build the Codespaces API URL.';
};

function App() {
  const note = getApiBaseNote();

  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/teams">
              Teams
            </NavLink>
            <NavLink className="nav-link" to="/activities">
              Activities
            </NavLink>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="nav-link" to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="lead">
            A multi-tier React presentation layer using React Router and Codespaces-aware API
            routing.
          </p>
          <p className="text-muted">
            {note ?? `API base URL: https://${import.meta.env.VITE_CODESPACE_NAME?.trim() || 'localhost'}-8000.app.github.dev/api`}
          </p>
        </div>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
