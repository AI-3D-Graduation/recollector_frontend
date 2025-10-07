
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-gray-900/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            {/* Camera Icon */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="w-8 h-6 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg relative group-hover:scale-110 transition-transform duration-300">
                {/* Camera body */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg shadow-lg">
                  {/* Lens */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full border-2 border-white/30">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-purple-300 to-cyan-300 rounded-full animate-pulse"></div>
                  </div>
                  {/* Flash */}
                  <div className="absolute top-0.5 right-1 w-1 h-1 bg-white rounded-full opacity-80"></div>
                  {/* Viewfinder */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-t"></div>
                </div>
              </div>
            </div>
            {/* Brand Name */}
            <div className="text-2xl font-bold" style={{ fontFamily: '"Pacifico", serif' }}>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
                Recollector
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}