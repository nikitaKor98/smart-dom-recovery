import { useState } from "react";

import { recoverElement } from "../api/recoveryApi";
import type { RecoveryResponse } from "../types";

type RecoverParams = {
  oldHtml: string;
  newHtml: string;
  selector: string;
};

export function useRecovery() {
  const [result, setResult] = useState<RecoveryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function recover({ oldHtml, newHtml, selector }: RecoverParams) {
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const data = await recoverElement({
        oldHtml,
        newHtml,
        selector,
      });

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
  }

  return {
    result,
    error,
    isLoading,
    recover,
  };
}
