import { useState } from "react";

type Candidate = {
  tag: string;
  text: string | null;
  score: number;
  reason: string;
};

type RecoveryResponse = {
  found: boolean;
  matched_tag: string | null;
  matched_text: string | null;
  score: number | null;
  reason: string | null;
  candidates: Candidate[];
};

function App() {
  const [oldHtml, setOldHtml] = useState(
    "<div><button class='btn primary'>Buy now</button></div>"
  );
  const [newHtml, setNewHtml] = useState(
    "<section><button class='button primary large'>Buy now</button><button class='secondary'>Cancel</button></section>"
  );
  const [selector, setSelector] = useState("button");

  const [result, setResult] = useState<RecoveryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/recover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_html: oldHtml,
          new_html: newHtml,
          selector: selector,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: RecoveryResponse = await response.json();
      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1>Smart DOM Recovery Tool</h1>

      <div style={{ marginBottom: 12 }}>
        <label>Old HTML</label>
        <textarea
          value={oldHtml}
          onChange={(e) => setOldHtml(e.target.value)}
          rows={8}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>New HTML</label>
        <textarea
          value={newHtml}
          onChange={(e) => setNewHtml(e.target.value)}
          rows={8}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Selector</label>
        <input
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Finding..." : "Find element"}
      </button>

      {error && (
        <div style={{ marginTop: 20, color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 24 }}>
          <h2>Best match</h2>
          <pre
            style={{
              padding: 12,
              background: "#f4f4f4",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(
              {
                found: result.found,
                matched_tag: result.matched_tag,
                matched_text: result.matched_text,
                score: result.score,
                reason: result.reason,
              },
              null,
              2
            )}
          </pre>

          <h2>Top candidates</h2>
          <pre
            style={{
              padding: 12,
              background: "#f4f4f4",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(result.candidates, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;