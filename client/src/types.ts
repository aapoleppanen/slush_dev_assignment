export interface Summary {
  id: number;
  text: string;
  audience: string;
  purpose: string;
  result: string;
  revisionNumber: number;
  parent?: number;
}
