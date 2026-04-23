type MatchedHtmlPreviewProps = {
  matchedHtml: string | null;
};

function MatchedHtmlPreview({ matchedHtml }: MatchedHtmlPreviewProps) {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Highlighted matched element</h2>

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