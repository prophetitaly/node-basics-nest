export interface HeavyTaskResponse {
  taskId: string;
  status: "processing" | "completed" | "error";
  iterations: number;
  result?: number;
  duration?: number;
}
