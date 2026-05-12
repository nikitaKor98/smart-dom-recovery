export type Candidate = {
  tag: string;
  text: string | null;
  score: number;
  reason: string;
  html?: string | null;
};

export type RecoveryResponse = {
  found: boolean;
  matched_tag: string | null;
  matched_text: string | null;
  matched_html: string | null;
  score: number | null;
  reason: string | null;
  candidates: Candidate[];
};

export type ExampleData = {
  oldHtml: string;
  newHtml: string;
  selector: string;
};
