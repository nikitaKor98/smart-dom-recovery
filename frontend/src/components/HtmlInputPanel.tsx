type HtmlInputPanelProps = {
  oldHtml: string;
  newHtml: string;
  selector: string;
  isLoading: boolean;
  onOldHtmlChange: (value: string) => void;
  onNewHtmlChange: (value: string) => void;
  onSelectorChange: (value: string) => void;
  onSubmit: () => void;
};

function HtmlInputPanel({
  oldHtml,
  newHtml,
  selector,
  isLoading,
  onOldHtmlChange,
  onNewHtmlChange,
  onSelectorChange,
  onSubmit,
}: HtmlInputPanelProps) {
  return (
    <div className="card form-card">
      <div className="field-group">
        <label className="field-label">Old HTML</label>

        <textarea
          value={oldHtml}
          onChange={(e) => onOldHtmlChange(e.target.value)}
          rows={8}
          className="textarea-input"
        />
      </div>

      <div className="field-group">
        <label className="field-label">New HTML</label>

        <textarea
          value={newHtml}
          onChange={(e) => onNewHtmlChange(e.target.value)}
          rows={8}
          className="textarea-input"
        />
      </div>

      <div className="field-group">
        <label className="field-label">Selector</label>

        <input
          value={selector}
          onChange={(e) => onSelectorChange(e.target.value)}
          className="text-input"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="primary-button"
      >
        {isLoading ? "Finding..." : "Find element"}
      </button>
    </div>
  );
}

export default HtmlInputPanel;