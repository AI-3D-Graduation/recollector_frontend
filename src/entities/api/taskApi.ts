
import { apiClient } from '../../shared/api';
import { TaskStatusResponse } from '../taskType';

export const taskApi = {
  /**
   * Task 상태 조회
   */
  async getStatus(taskId: string): Promise<TaskStatusResponse> {
    const { data } = await apiClient.get<TaskStatusResponse>(
      `/api/status/${taskId}`,
      {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );
    return data;
  },

  /**
   * Task 상세 정보 조회
   */
  async getTask(taskId: string): Promise<TaskStatusResponse> {
    const { data } = await apiClient.get<TaskStatusResponse>(`/api/task/${taskId}`);
    return data;
  }
};