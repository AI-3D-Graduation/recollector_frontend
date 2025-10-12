import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingProgress } from "../component/loading/loadingProgress";
import { useTaskPolling } from "../features";
import { Navigation } from "../shared";

export default function Loading() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();

  const { progress, error } = useTaskPolling({
    taskId,
    interval: 10000,
    onCompleted: () => {
      setTimeout(() => {
        navigate(`/result/${taskId}`, { replace: true });
      }, 1000);
    },
    onFailed: (errorMsg) => {
      alert(`Generation failed: ${errorMsg}`);
      navigate('/upload');
    }
  });

  useEffect(() => {
    if (!taskId) {
      navigate('/upload');
    }
  }, [taskId, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 flex items-center justify-center">
        <div className="text-center text-red-400">
          <i className="ri-error-warning-line text-5xl mb-4"></i>
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
      <Navigation />

      <div className="flex items-center justify-center min-h-screen px-6">
        <LoadingProgress taskId={taskId} progress={progress} />

        {/* Background Effects */}
        <div className="fixed top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" />
        <div className="fixed bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse animation-delay-700" />
        <div className="fixed top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full blur-lg animate-pulse animation-delay-300" />
      </div>
    </div>
  );
}