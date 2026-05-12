import { useState } from "react";

import PageHeader from "./components/PageHeader";
import ExampleControls from "./components/ExampleControls";
import MatchedHtmlPreview from "./components/MatchedHtmlPreview";
import HtmlInputPanel from "./components/HtmlInputPanel";
import BestMatchCard from "./components/BestMatchCard";
import CandidatesList from "./components/CandidatesList";

import { useRecovery } from "./hooks/useRecovery";

import type { ExampleData } from "./types";

import "./styles.css";

function App() {
  const [oldHtml, setOldHtml] = useState(
    "<div><button class='btn primary'>Buy now</button></div>",
  );
  const [newHtml, setNewHtml] = useState(
    "<section><button class='button primary large'>Buy now</button><button class='secondary'>Cancel</button></section>",
  );
  const [selector, setSelector] = useState("button");

  const { result, error, isLoading, recover } = useRecovery();

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
    const ex: ExampleData = examples[key];
    setOldHtml(ex.oldHtml);
    setNewHtml(ex.newHtml);
    setSelector(ex.selector);
  };

  const clearAll = () => {
    setOldHtml("");
    setNewHtml("");
    setSelector("");
  };

  const handleSubmit = () => {
    recover({
      oldHtml,
      newHtml,
      selector,
    });
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        <PageHeader
          title="Smart DOM Recovery Tool"
          subtitle="Recover broken CSS selectors by comparing an old DOM against a new
            DOM."
        />

        <ExampleControls
          onClear={clearAll}
          onLoadLink={() => loadExample("link")}
          onLoadInput={() => loadExample("input")}
          onLoadButton={() => loadExample("button")}
        />

        <HtmlInputPanel
          oldHtml={oldHtml}
          newHtml={newHtml}
          selector={selector}
          isLoading={isLoading}
          onOldHtmlChange={setOldHtml}
          onNewHtmlChange={setNewHtml}
          onSelectorChange={setSelector}
          onSubmit={handleSubmit}
        />

        {error && (
          <div className="error-card">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="results-grid">
            <BestMatchCard result={result} />

            <div className="card">
              <MatchedHtmlPreview matchedHtml={result.matched_html} />
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0 }}>Top candidates</h2>

              {result.candidates.length === 0 ? (
                <p>No candidates returned.</p>
              ) : (
                <CandidatesList candidates={result.candidates} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
