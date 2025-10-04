
import { useNavigate } from 'react-router-dom';
import Navigation from '../widgets/Navigation';
import Button from '../shared/Button';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%203D%20modeling%20laboratory%20with%20holographic%20displays%2C%20advanced%20computers%2C%20floating%20geometric%20shapes%2C%20purple%20and%20cyan%20neon%20lights%2C%20dark%20ambient%20lighting%2C%20modern%20minimalist%20design%2C%20high-tech%20workspace%20environment&width=1920&height=1080&seq=hero-bg&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/40 to-cyan-900/40" />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                3D Model Generation
              </span>
              <br />
              <span className="text-white">Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Upload a photo and generate a 3D model instantly using advanced AI technology
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="space-y-6">
            <Button
              variant="primary"
              size="lg"
              className="text-xl px-12 py-5 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105"
              onClick={() => navigate('/upload')}
            >
              <i className="ri-upload-cloud-2-line text-2xl mr-3"></i>
              Upload Photo
            </Button>
            
            <div className="flex justify-center space-x-8 text-gray-400 text-sm">
              <div className="flex items-center">
                <i className="ri-check-line text-green-400 mr-2"></i>
                AI-Powered Generation
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-400 mr-2"></i>
                Multiple Export Formats
              </div>
              <div className="flex items-center">
                <i className="ri-check-line text-green-400 mr-2"></i>
                Instant Processing
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-full blur-lg animate-pulse delay-500" />
      </div>
    </div>
  );
}
