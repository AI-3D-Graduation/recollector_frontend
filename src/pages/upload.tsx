import { PhotoUploadWidget } from "../widgets/upload/PhotoUpload";
import Navigation from "../widgets/Navigation";

export default function UploadPage() {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/main_background.jpg')",
        }}
      />

      {/* 블랙 오버레이 (70%) */}
      <div className="absolute inset-0 bg-black opacity-75" />

      {/* 실제 내용 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />

        {/* 중앙 정렬 영역 */}
        <div className="flex-grow flex items-center justify-center">
          <PhotoUploadWidget />
        </div>
      </div>
    </div>
  );
}
