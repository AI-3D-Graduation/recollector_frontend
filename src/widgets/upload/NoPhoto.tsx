import { useDragAndDrop } from "../../features";
import { Button } from "../../shared";

interface EmptyUploadZoneProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileSelect: (file: File) => void;
}

export function EmptyUploadZone({ fileInputRef, onFileSelect }: EmptyUploadZoneProps) {
  const { isDragging, handleDragOver, handleDragLeave, handleDrop } = useDragAndDrop({
    onFileDrop: onFileSelect,
  });

  const handleClickToUpload = (e?: React.MouseEvent) => {
    // ✅ 이벤트가 있으면 전파 중지 (Button 클릭 시)
    if (e) {
      e.stopPropagation();
    }
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        isDragging 
          ? 'border-purple-500 bg-purple-500/10 scale-105' 
          : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClickToUpload}  // 전체 영역 클릭 시
    >
      <div className={`w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 ${
        isDragging ? 'animate-bounce' : 'hover:rotate-12'
      }`}>
        <i className="ri-upload-cloud-2-line text-4xl text-white"></i>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        Drag &amp; Drop Your Photo Here
      </h3>
      <p className="text-gray-400 mb-6">
        Or click to browse your files
      </p>
      
      {/* ✅ Button에 onClick 전달 + stopPropagation으로 이중 클릭 방지 */}
      <Button 
        variant="secondary" 
        size="md"
        onClick={handleClickToUpload}  // 명시적으로 onClick 전달
        className="transform hover:scale-105 transition-transform duration-200"
      >
        <i className="ri-folder-open-line mr-2"></i>
        Choose File
      </Button>
      
      <p className="text-sm text-gray-500 mt-4">
        Supported formats: JPG, PNG, WEBP • Max size: 10MB
      </p>
    </div>
  );
}