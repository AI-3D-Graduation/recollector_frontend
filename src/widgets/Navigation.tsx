
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../shared/Button';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/upload', label: 'Upload' },
    { path: '/result', label: 'Result' }
  ];
  
  return (
    <nav className="w-full bg-gray-900/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold cursor-pointer" 
            style={{ fontFamily: '"Pacifico", serif' }}
            onClick={() => navigate('/')}
          >
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              3D Genesis
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}