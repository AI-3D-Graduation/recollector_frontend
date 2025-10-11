import { PhotoUploadWidget } from "../widgets/upload/PhotoUpload";
import Navigation from "../widgets/Navigation";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
      <Navigation />
      <PhotoUploadWidget />
    </div>
  );
}