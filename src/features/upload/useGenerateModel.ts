import { useState } from 'react';
import { GenerateResponse } from '../../entities/modelType';
import { generateModel } from '../../entities/modelGenerate';

interface UseGenerateModelReturn {
  taskId: string | null;
  isGenerating: boolean;
  error: string | null;
  startGeneration: (file: File) => Promise<void>;
  reset: () => void;
}

export function useGenerateModel(): UseGenerateModelReturn {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGeneration = async (file: File) => {
    try {
      setIsGenerating(true);
      setError(null);

      console.log('📤 3D 모델 생성 시작:', file.name);

      const response: GenerateResponse = await generateModel(file);

      console.log('✅ 생성 요청 성공! Task ID:', response.task_id);

      setTaskId(response.task_id);
    } catch (err: any) {
      console.error('❌ 생성 요청 실패:', err);
      
      const errorMessage = 
        err.response?.data?.detail || 
        err.response?.data?.error || 
        err.message || 
        'Failed to start generation';
      
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setTaskId(null);
    setError(null);
    setIsGenerating(false);
  };

  return {
    taskId,
    isGenerating,
    error,
    startGeneration,
    reset,
  };
}