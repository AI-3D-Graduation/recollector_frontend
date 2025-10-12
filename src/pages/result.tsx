import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModelViewer } from '../component/result/ModelViewer';
import { taskApi } from '../entities';
import { TaskDetailResponse } from '../entities/api/taskApi';
import { Button, Navigation } from '../shared';

export default function Result() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [modelData, setModelData] = useState<TaskDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskId) {
      navigate('/upload');
      return;
    }

    const fetchModelData = async () => {
      try {
        const data = await taskApi.getTask(taskId);
        
        if (data.status !== 'completed') {
          navigate(`/loading/${taskId}`, { replace: true });
          return;
        }

        setModelData(data);
        setIsModelLoading(false);
      } catch (err) {
        console.error('Failed to fetch model data:', err);
        setError('Failed to load 3D model');
        setIsModelLoading(false);
      }
    };

    fetchModelData();
  }, [taskId, navigate]);

  const handleDownload = () => {
    if (modelData?.model_url) {
      const fullUrl = `http://localhost:8000${modelData.model_url}`;
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = `model_${taskId}.glb`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUploadAnother = () => {
    navigate('/upload');
  };

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen bg-purple-500/70 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-5xl text-red-400 mb-4"></i>
          <p className="text-white text-xl mb-6">{error}</p>
          <Button onClick={() => navigate('/upload')}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const modelUrl = modelData?.model_url 
    ? `http://localhost:8000${modelData.model_url}` 
    : null;

  return (
    <div className="min-h-screen bg-gray-500/70 flex flex-col">
      {/*네비게이션*/}
        <nav className="w-full bg-transparent absolute top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              {/* Left - Brand Name */}
              <div
                className="cursor-pointer group"
                onClick={() => navigate('/')}
              >
                <h2 className="text-2xl font-serif tracking-wide text-white">
                  Recollector
                </h2>
                
              </div>
              
              {/* Right - Menu Items */}
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => navigate('/')}
                  className="text-sm font-light tracking-wide text-white hover:text-white/70 transition-colors duration-300"
                >
                  About Us
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-5 py-2 border border-white/40 rounded-full text-sm font-light tracking-wide text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </nav>
      
      {/* 3D Model Viewer - 화면 전체 */}
      <div className="flex-1 relative">
        {isModelLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-400 border-r-purple-300 rounded-full animate-spin"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-purple-300 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Loading 3D Model</h3>
              <p className="text-gray-300">Preparing your model...</p>
            </div>
          </div>
        ) : modelUrl ? (
          <>
            {/* 실제 3D 뷰어 - 전체 화면 */}
            <div className="absolute inset-0">
              <ModelViewer modelUrl={modelUrl} />
            </div>

            {/* 모델 정보 - 우측 상단 */}
            {(modelData?.vertices || modelData?.faces) && (
              <div className="absolute top-20 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 z-10">
                <div className="text-white text-sm space-y-1">
                  {modelData.vertices && (
                    <div className="flex items-center">
                      <i className="ri-triangle-line mr-2 text-purple-300"></i>
                      <span>{modelData.vertices.toLocaleString()} vertices</span>
                    </div>
                  )}
                  {modelData.faces && (
                    <div className="flex items-center">
                      <i className="ri-grid-line mr-2 text-purple-300"></i>
                      <span>{modelData.faces.toLocaleString()} faces</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-xl">No model data available</p>
          </div>
        )}
      </div>
      

 {/* Buttons overlay on top of the model */}
<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-50">
  <Button
    variant="primary"
    size="lg"
    onClick={handleDownload}
    className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold shadow-lg transition-all duration-300 transform"
    disabled={isModelLoading || !modelUrl}
  >
    Download Model
  </Button>

  <Button
    variant="secondary"
    size="lg"
    onClick={handleUploadAnother}
    className="bg-purple-600/80 text-white font-semibold shadow-lg transition-all duration-300 transform"
  >
    Upload Another Picture
  </Button>
</div>

</div>

  );
}