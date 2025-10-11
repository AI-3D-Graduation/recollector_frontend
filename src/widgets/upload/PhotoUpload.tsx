import { useNavigate } from 'react-router-dom';
import { usePhotoUpload } from '../../features';
import { EmptyUploadZone } from './NoPhoto';
import { PreviewUploadedPhoto } from './Preview';
import { UploadTips } from './UploadTips';
import { Button, Card } from '../../shared';
import { UploadingView } from './Uploading';

export function PhotoUploadWidget() {
  const navigate = useNavigate();
  const {
    selectedFile,
    previewUrl,
    isUploading,
    fileInputRef,
    handleFileSelect,
    handleFileInputChange,  // 🔍 이것도 가져와야 합니다!
    clearFile,
  } = usePhotoUpload();

  const handleNextStep = () => {
    if (selectedFile) {
      navigate('/loading');
    }
  };

  console.log('🔍 Widget - fileInputRef:', fileInputRef);
  console.log('🔍 Widget - fileInputRef.current:', fileInputRef.current);

  return (
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

        {/* Upload Card - 상태별로 다른 컴포넌트 렌더링 */}
        <Card className="mb-8 animate-fade-in animation-delay-400">
          {isUploading && <UploadingView />}
          
          {!isUploading && !selectedFile && (
            <EmptyUploadZone
              fileInputRef={fileInputRef}
              onFileSelect={handleFileSelect}
            />
          )}
          
          {!isUploading && selectedFile && previewUrl && (
            <PreviewUploadedPhoto
              file={selectedFile}
              previewUrl={previewUrl}
              fileInputRef={fileInputRef}
              onClear={clearFile}
            />
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
        <UploadTips />
      </div>
    </div>
  );
}