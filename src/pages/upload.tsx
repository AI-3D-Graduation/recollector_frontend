
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../widgets/Navigation';
import Button from '../shared/Button';
import Card from '../shared/Card';

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setIsUploading(false);
      }, 1000);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  
  const handleNextStep = () => {
    if (selectedFile) {
      navigate('/loading');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
      <Navigation />
      
      <div className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Upload Your Photo
              </span>
            </h1>
            <p className="text-gray-200 text-lg animate-fade-in animation-delay-200">
              Choose a high-quality photo to convert into 3D model
            </p>
          </div>
          
          {/* Upload Card */}
          <Card className="mb-8 animate-fade-in animation-delay-400">
            {isUploading ? (
              <div className="border-2 border-dashed border-purple-500 rounded-2xl p-12 text-center bg-purple-500/10">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Uploading Photo...
                </h3>
                <p className="text-gray-300">
                  Please wait while we process your image
                </p>
                <div className="mt-6 w-64 mx-auto bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full animate-pulse" style={{width: '100%'}}></div>
                </div>
              </div>
            ) : !selectedFile ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  isDragging 
                    ? 'border-purple-500 bg-purple-500/10 scale-105' 
                    : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className={`w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 ${isDragging ? 'animate-bounce' : 'hover:rotate-12'}`}>
                  <i className="ri-upload-cloud-2-line text-4xl text-white"></i>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  Drag &amp; Drop Your Photo Here
                </h3>
                <p className="text-gray-400 mb-6">
                  Or click to browse your files
                </p>
                
                <Button variant="secondary" size="md" className="transform hover:scale-105 transition-transform duration-200">
                  <i className="ri-folder-open-line mr-2"></i>
                  Choose File
                </Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: JPG, PNG, WEBP • Max size: 10MB
                </p>
              </div>
            ) : (
              <div className="text-center animate-fade-in">
                <div className="mb-6">
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-64 h-64 object-cover rounded-2xl border-2 border-gray-600 animate-zoom-in"
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl('');
                      }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all duration-200 transform hover:scale-110 animate-fade-in animation-delay-300"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 animate-fade-in animation-delay-100">
                  {selectedFile.name}
                </h3>
                <p className="text-gray-400 mb-6 animate-fade-in animation-delay-200">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-6 transform hover:scale-105 transition-transform duration-200 animate-fade-in animation-delay-300"
                >
                  <i className="ri-refresh-line mr-2"></i>
                  Choose Different File
                </Button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </Card>
          
          {/* Next Step Button */}
          {selectedFile && !isUploading && (
            <div className="text-center animate-fade-in animation-delay-500">
              <Button
                variant="primary"
                size="lg"
                onClick={handleNextStep}
                className="px-12 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <i className="ri-arrow-right-line mr-2"></i>
                Generate 3D Model
              </Button>
            </div>
          )}
          
          {/* Tips */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card padding="sm" className="border-green-500/30 animate-slide-in-left animation-delay-600">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-pulse">
                  <i className="ri-check-line text-green-400"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Best Results</h4>
                  <p className="text-sm text-gray-400">Use well-lit photos with clear subjects and minimal background</p>
                </div>
              </div>
            </Card>
            
            <Card padding="sm" className="border-blue-500/30 animate-slide-in-right animation-delay-700">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-pulse animation-delay-500">
                  <i className="ri-information-line text-blue-400"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Processing Time</h4>
                  <p className="text-sm text-gray-400">Most models are generated within 30-60 seconds</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
