export type TaskStatus = 'processing' | 'completed' | 'failed';

export interface Task {
  task_id: string;
  status: TaskStatus;
  progress: number;
  current_step?: string;
  model_url?: string;
  error?: string;
}

export interface TaskResponse {
  status: TaskStatus;
  progress: number;
  current_step?: string;
  model_url?: string;
  error?: string;
}