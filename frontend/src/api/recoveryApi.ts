import type { RecoveryResponse } from "../types";

type RecoverElementParams = {
  oldHtml: string;
  newHtml: string;
  selector: string;
};

export async function recoverElement({
  oldHtml,
  newHtml,
  selector,
}: RecoverElementParams): Promise<RecoveryResponse> {
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

  return response.json();
}