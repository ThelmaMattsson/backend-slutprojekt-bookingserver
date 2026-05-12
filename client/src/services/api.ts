const API_BASE =
  (import.meta as ImportMeta).env.VITE_API_BASE || "http://localhost:3000";

export async function fetchEndpoint(path: string): Promise<unknown> {
  const response = await fetch(`${API_BASE}/${path}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Serverfel: ${response.status} ${response.statusText} - ${body}`,
    );
  }

  return response.json();
}
