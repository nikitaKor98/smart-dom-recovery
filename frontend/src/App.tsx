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
  matched_html: string | null;
  score: number | null;
  reason: string | null;
  candidates: Candidate[];
};

const actionButtonStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  cursor: "pointer",
  fontWeight: 600,
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

  const examples = {
    button: {
      oldHtml: "<div><button class='btn primary'>Buy now</button></div>",
      newHtml:
        "<section><button class='button primary large'>Buy now</button><button class='secondary'>Cancel</button></section>",
      selector: "button",
    },
    link: {
      oldHtml: "<div><a class='link main-link' href='/buy'>Buy</a></div>",
      newHtml:
        "<main><a class='main-link cta' href='/buy'>Buy</a><a href='/help'>Help</a></main>",
      selector: "a",
    },
    input: {
      oldHtml:
        "<form><input class='input primary' placeholder='Enter name' /></form>",
      newHtml:
        "<form><input class='field main-input' placeholder='Enter name' /></form>",
      selector: "input",
    },
  };

  const loadExample = (key: keyof typeof examples) => {
    const ex = examples[key];
    setOldHtml(ex.oldHtml);
    setNewHtml(ex.newHtml);
    setSelector(ex.selector);
    setResult(null);
    setError(null);
  };

  const clearAll = () => {
    setOldHtml("");
    setNewHtml("");
    setSelector("");
    setResult(null);
    setError(null);
  };

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
          selector,
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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "32px 16px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: 32 }}>Smart DOM Recovery Tool</h1>
          <p style={{ marginTop: 8, color: "#4b5563" }}>
            Recover broken CSS selectors by comparing an old DOM against a new
            DOM.
          </p>
        </div>

        <div style={{ marginTop: 16, marginBottom: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            style={actionButtonStyle}
            onClick={() => loadExample("button")}>
            Load Button Example
          </button>
          <button
            style={actionButtonStyle}
            onClick={() => loadExample("link")}>
            Load Link Example
          </button>
          <button
            style={actionButtonStyle}
            onClick={() => loadExample("input")}>
            Load Input Example
          </button>
          <button
            style={actionButtonStyle}
            onClick={clearAll}>
            Clear
          </button>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            marginBottom: 20,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              Old HTML
            </label>
            <textarea
              value={oldHtml}
              onChange={(e) => setOldHtml(e.target.value)}
              rows={8}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #d1d5db",
                fontFamily: "monospace",
                fontSize: 14,
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              New HTML
            </label>
            <textarea
              value={newHtml}
              onChange={(e) => setNewHtml(e.target.value)}
              rows={8}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #d1d5db",
                fontFamily: "monospace",
                fontSize: 14,
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              Selector
            </label>
            <input
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #d1d5db",
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? "#9ca3af" : "#111827",
              color: "#ffffff",
              border: "none",
              borderRadius: 10,
              padding: "12px 18px",
              fontSize: 14,
              fontWeight: 700,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Finding..." : "Find element"}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              border: "1px solid #fecaca",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div
            style={{
              display: "grid",
              gap: 20,
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h2 style={{ marginTop: 0 }}>Best match</h2>
              <div style={{ lineHeight: 1.8 }}>
                <div>
                  <strong>Found:</strong> {String(result.found)}
                </div>
                <div>
                  <strong>Matched tag:</strong> {result.matched_tag ?? "-"}
                </div>
                <div>
                  <strong>Matched text:</strong> {result.matched_text ?? "-"}
                </div>
                <div>
                  <strong>Matched HTML:</strong> {result.matched_html ?? "-"}
                </div>
                <div>
                  <strong>Score:</strong> {result.score ?? "-"}
                </div>
                <div>
                  <strong>Reason:</strong> {result.reason ?? "-"}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h2 style={{ marginTop: 0 }}>Highlighted matched element</h2>

              {result.matched_html ? (
                <div
                  style={{
                    background: "#fff7ed",
                    border: "2px solid #fb923c",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <pre
                    style={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      fontFamily: "monospace",
                      fontSize: 14,
                    }}
                  >
                    {result.matched_html}
                  </pre>
                </div>
              ) : (
                <p>No matched HTML returned.</p>
              )}
            </div>

            <div
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h2 style={{ marginTop: 0 }}>Top candidates</h2>

              {result.candidates.length === 0 ? (
                <p>No candidates returned.</p>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {result.candidates.map((candidate, index) => (
                    <div
                      key={`${candidate.tag}-${index}`}
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        padding: 14,
                        background: "#f9fafb",
                      }}
                    >
                      <div>
                        <strong>#{index + 1}</strong>
                      </div>
                      <div>
                        <strong>Tag:</strong> {candidate.tag}
                      </div>
                      <div>
                        <strong>Text:</strong> {candidate.text ?? "-"}
                      </div>
                      <div>
                        <strong>Score:</strong> {candidate.score}
                      </div>
                      <div>
                        <strong>Reason:</strong> {candidate.reason}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;