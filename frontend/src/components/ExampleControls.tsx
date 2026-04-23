type ExampleControlsProps = {
  onLoadButton: () => void;
  onLoadLink: () => void;
  onLoadInput: () => void;
  onClear: () => void;
};

function ExampleControls({
  onLoadButton,
  onLoadLink,
  onLoadInput,
  onClear,
}: ExampleControlsProps) {
  return (
    <div className="example-controls">
      <button className="secondary-button" onClick={onLoadButton}>
        Button
      </button>
      <button className="secondary-button" onClick={onLoadLink}>
        Link
      </button>
      <button className="secondary-button" onClick={onLoadInput}>
        Input
      </button>
      <button className="secondary-button" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}

export default ExampleControls;