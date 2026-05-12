import { useState } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";

type MatchedHtmlPreviewProps = {
  matchedHtml: string | null;
};

function MatchedHtmlPreview({ matchedHtml }: MatchedHtmlPreviewProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!matchedHtml) return;

    const success = await copyToClipboard(matchedHtml);

    if (success) {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <div className="card">
      <div className="section-header">
        <h2 className="section-title">Highlighted matched element</h2>

        <button
          onClick={handleCopy}
          className="secondary-button"
          disabled={!matchedHtml}
        >
          {copied ? "Copied!" : "Copy HTML"}
        </button>
      </div>

      {matchedHtml ? (
        <div className="highlight-box">
          <pre className="code-preview">{matchedHtml}</pre>
        </div>
      ) : (
        <p>No matched HTML returned.</p>
      )}
    </div>
  );
}

export default MatchedHtmlPreview;
