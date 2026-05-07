import type { RecoveryResponse } from "../types";

type BestMatchCardProps = {
    result: RecoveryResponse;
};

function BestMatchCard({ result }: BestMatchCardProps) {
    return (
        <div className="card">
            <h2 style={{ marginTop: 0 }}>Best match</h2>

            <div className="result-row">
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
    );
}

export default BestMatchCard;