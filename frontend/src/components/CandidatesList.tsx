import type { Candidate } from "../types";

type CandidatesListProps = {
  candidates: Candidate[];
};

function CandidatesList({ candidates }: CandidatesListProps) {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Top candidates</h2>

      {candidates.length === 0 ? (
        <p>No candidates returned.</p>
      ) : (
        <div className="candidates-grid">
          {candidates.map((candidate, index) => (
            <div
              key={`${candidate.tag}-${index}`}
              className="candidate-item"
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
  );
}

export default CandidatesList;