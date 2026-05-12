import { useEffect, useMemo, useState } from "react";
import { fetchEndpoint } from "./services/api";
import Table from "./components/Table";

type Endpoint = {
  label: string;
  path: string;
  enabled: boolean;
};

const endpoints: Endpoint[] = [
  { label: "Classes", path: "api/classes", enabled: true },
  { label: "Bookings", path: "api/bookings", enabled: false },
  { label: "Users", path: "api/users", enabled: false },
  { label: "Instructors", path: "api/instructors", enabled: false },
  { label: "Locations", path: "api/locations", enabled: false },
];

function App() {
  const [selected, setSelected] = useState<Endpoint>(endpoints[0]);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const activePath = useMemo(() => selected.path, [selected]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      setData([]);

      try {
        const result = await fetchEndpoint(activePath);
        if (Array.isArray(result)) {
          setData(result.map((item) => item as Record<string, unknown>));
        } else if (result && typeof result === "object") {
          setData([result as Record<string, unknown>]);
        } else {
          setError("Ingen giltig data mottagen från servern.");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Okänt fel vid hämtning.",
        );
      } finally {
        setLoading(false);
      }
    }

    if (selected.enabled) {
      loadData();
    }
  }, [activePath, selected.enabled]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Gym Scheduler</h1>
          <p>Read-only data viewer för backend-api.</p>
        </div>
      </header>

      <nav className="endpoint-nav">
        {endpoints.map((endpoint) => (
          <button
            key={endpoint.path}
            className={endpoint.path === selected.path ? "active" : ""}
            disabled={!endpoint.enabled}
            onClick={() => setSelected(endpoint)}
          >
            {endpoint.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {!selected.enabled ? (
          <div className="status-message">
            Den här endpointen är inte implementerad i backend än.
          </div>
        ) : loading ? (
          <div className="status-message">Laddar data…</div>
        ) : error ? (
          <div className="status-message status-error">{error}</div>
        ) : (
          <>
            <div className="status-message">
              Visar endpoint: <strong>{selected.label}</strong>
            </div>
            <Table data={data} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
