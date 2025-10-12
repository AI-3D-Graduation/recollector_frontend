import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModelViewer } from '../component/result/ModelViewer';
import { taskApi } from '../entities';
import { TaskDetailResponse } from '../entities/api/taskApi';
import { Button } from '../shared';

export default function Result() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();

  const [isModelLoading, setIsModelLoading] = useState(true);
  const [modelData, setModelData] = useState<TaskDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(50);
  const BASE_BLACK_OPACITY = 0.5;

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

  const overlayStyle = () => {
    if (brightness === 50) {
      return { backgroundColor: `rgba(0,0,0,${BASE_BLACK_OPACITY})` };
    }

    if (brightness > 50) {
      const whiteOpacity = (brightness - 50) / 50;
      return { backgroundColor: `rgba(255,255,255,${whiteOpacity})` };
    } else {
      const blackOpacity = BASE_BLACK_OPACITY + ((50 - brightness) / 50) * (1 - BASE_BLACK_OPACITY);
      return { backgroundColor: `rgba(0,0,0,${blackOpacity})` };
    }
  };

  const navTextColor = brightness > 50 ? 'text-black' : 'text-white';

  if (error) {
    return (
      <div className="min-h-screen bg-purple-500/70 flex items-center justify-center px-4">
        <div className="text-center">
          <i className="ri-error-warning-line text-5xl text-red-400 mb-4"></i>
          <p className="text-white text-xl mb-6">{error}</p>
          <Button onClick={() => navigate('/upload')}>Try Again</Button>
        </div>
      </div>
    );
  }

  const modelUrl = modelData?.model_url
    ? `http://localhost:8000${modelData.model_url}`
    : null;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/exhibition_background.png"
          className="w-full h-full object-cover"
          alt="background"
        />
      </div>

      {/* 화이트/블랙 오버레이 */}
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={overlayStyle()}
      />

      {/* 3D 모델 뷰어 */}
      <div className="absolute inset-0 z-10">
        {isModelLoading ? (
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center">
              <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-400 border-r-purple-300 rounded-full animate-spin"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-purple-300 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-white text-lg md:text-xl font-semibold mb-2">Loading 3D Model</h3>
              <p className="text-gray-300 text-sm md:text-base">Preparing your model...</p>
            </div>
          </div>
        ) : modelUrl ? (
          <ModelViewer modelUrl={modelUrl} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <p className="text-white text-lg md:text-xl">No model data available</p>
          </div>
        )}
      </div>

      {/* 모델 정보 우측 상단 */}
      {(modelData?.vertices || modelData?.faces) && (
        <div className="absolute top-16 md:top-20 right-2 md:right-4 z-20 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3">
          <div className="text-white text-xs md:text-sm space-y-1">
            {modelData.vertices && (
              <div className="flex items-center">
                <i className="ri-triangle-line mr-1 md:mr-2 text-purple-300"></i>
                <span>{modelData.vertices.toLocaleString()} vertices</span>
              </div>
            )}
            {modelData.faces && (
              <div className="flex items-center">
                <i className="ri-grid-line mr-1 md:mr-2 text-purple-300"></i>
                <span>{modelData.faces.toLocaleString()} faces</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 버튼 하단 중앙 */}
      <div className="absolute bottom-8 md:bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-3 sm:gap-6 z-20 px-4 w-full sm:w-auto">
        <Button
          variant="primary"
          size="lg"
          onClick={handleDownload}
          className="w-full sm:w-auto"
          disabled={isModelLoading || !modelUrl}
        >
          Download Model
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={handleUploadAnother}
          className="w-full sm:w-auto"
        >
          Upload Another Picture
        </Button>
      </div>

      {/* 우측 세로 슬라이더 - 모든 화면 크기 */}
      <div className="absolute top-1/2 right-4 md:right-14 transform -translate-y-1/2 z-40">
        <div className="flex flex-col items-center">
          <span className="text-white font-semibold text-xs md:text-sm mb-3 whitespace-nowrap md:mb-10">
            Brightness
          </span>

          <div className="relative" style={{ width: '20px', height: '180px' }}>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="absolute top-1/2 left-1/2 w-48 md:w-60 h-5 md:h-6 accent-purple-500 -rotate-90 origin-center -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="w-full bg-transparent absolute top-0 left-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
          <div className={`cursor-pointer group ${navTextColor}`} onClick={() => navigate('/')}>
            <h2 className="text-xl md:text-2xl font-serif tracking-wide">{'Recollector'}</h2>
          </div>
          <div className="flex items-center space-x-3 md:space-x-8">
            <button
              onClick={() => navigate('/')}
              className={`${navTextColor} text-xs md:text-sm font-light tracking-wide hover:text-gray-500 transition-colors duration-300`}
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/')}
              className={`px-3 md:px-5 py-1.5 md:py-2 border rounded-full text-xs md:text-sm font-light tracking-wide hover:bg-gray-200 hover:text-black transition-all duration-300 ${navTextColor}`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}