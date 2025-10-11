
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../shared/Navigation';
import Button from '../shared/Button';
import Card from '../shared/Card';

export default function Result() {
  const navigate = useNavigate();
  const [isModelLoading, setIsModelLoading] = useState(true);
  
  useEffect(() => {
    // Simulate 3D model loading
    const timer = setTimeout(() => {
      setIsModelLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
      <Navigation />
      
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Your 3D Model is Ready!
              </span>
            </h1>
            <p className="text-gray-200 text-lg animate-fade-in animation-delay-200">
              Generated in 47 seconds • High quality mesh with 25,432 vertices
            </p>
          </div>
          
          {/* Centered 3D Model Viewer */}
          <div className="flex justify-center animate-fade-in animation-delay-400">
            <div className="w-full max-w-4xl">
              <Card className="h-96 lg:h-[700px] overflow-hidden">
                <div className="relative h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                  {/* Model Loading State */}
                  {isModelLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
                      <div className="text-center">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                          <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-cyan-400 rounded-full animate-spin"></div>
                          <div className="absolute inset-2 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full animate-pulse"></div>
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-2">Loading 3D Model</h3>
                        <p className="text-gray-400">Preparing interactive viewer...</p>
                        <div className="mt-4 w-48 mx-auto bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full animate-pulse" style={{width: '100%'}}></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Mock 3D Viewer */}
                      <div 
                        className="absolute inset-0 bg-center bg-cover opacity-80 animate-zoom-in"
                        style={{
                          backgroundImage: `url('https://readdy.ai/api/search-image?query=High-quality%203D%20rendered%20model%20of%20a%20realistic%20object%20displayed%20in%20a%20modern%203D%20viewer%20interface%20with%20dark%20background%2C%20purple%20and%20cyan%20accent%20colors%2C%20wireframe%20overlay%2C%20professional%20lighting%2C%20interactive%20viewport%2C%20futuristic%20design%20elements&width=800&height=600&seq=3d-model&orientation=landscape')`
                        }}
                      />
                      
                      {/* Viewer Controls */}
                      <div className="absolute top-4 right-4 space-y-2 animate-slide-in-right animation-delay-500">
                        <button className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white transition-all duration-200 transform hover:scale-110">
                          <i className="ri-zoom-in-line text-lg"></i>
                        </button>
                        <button className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white transition-all duration-200 transform hover:scale-110">
                          <i className="ri-zoom-out-line text-lg"></i>
                        </button>
                        <button className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white transition-all duration-200 transform hover:scale-110">
                          <i className="ri-refresh-line text-lg"></i>
                        </button>
                        <button className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white transition-all duration-200 transform hover:scale-110">
                          <i className="ri-fullscreen-line text-lg"></i>
                        </button>
                      </div>
                      
                      {/* Viewer Info */}
                      <div className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-lg px-4 py-3 animate-slide-in-left animation-delay-600">
                        <p className="text-white text-sm flex items-center">
                          <i className="ri-drag-move-2-line mr-2 animate-pulse"></i>
                          Drag to rotate • Scroll to zoom
                        </p>
                      </div>
                      
                      {/* Model Stats */}
                      <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-lg px-4 py-3 animate-slide-in-left animation-delay-700">
                        <div className="text-white text-sm space-y-1">
                          <div className="flex items-center">
                            <i className="ri-triangle-line mr-2 text-purple-400"></i>
                            <span>25,432 vertices</span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-grid-line mr-2 text-cyan-400"></i>
                            <span>48,864 faces</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-6 mt-12">
            <Button
              variant="primary"
              size="lg"
              className="shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-800"
              disabled={isModelLoading}
            >
              {isModelLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <i className="ri-download-cloud-2-line mr-2"></i>
                  Download Model
                </>
              )}
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/upload')}
              className="transform hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-900"
            >
              <i className="ri-upload-cloud-2-line mr-2"></i>
              Upload Another Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
