export interface Topic {
  id: string;
  title: string;
  content: string;
  examples?: Example[];
  diagram?: string;
  keyPoints?: string[];
}

export interface Example {
  title: string;
  description: string;
  code?: string;
  visual?: string;
}

export interface Unit {
  id: string;
  title: string;
  hours: number;
  topics: Topic[];
}
