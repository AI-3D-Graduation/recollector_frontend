
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../shared/Navigation';

export default function Loading() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  
  const steps = [
    { id: 0, label: 'Image uploaded', icon: 'ri-check-line', status: 'completed' },
    { id: 1, label: 'Analyzing structure', icon: 'ri-search-eye-line', status: 'processing' },
    { id: 2, label: 'Generating 3D mesh', icon: 'ri-3d-view', status: 'pending' },
    { id: 3, label: 'Finalizing model', icon: 'ri-check-double-line', status: 'pending' }
  ];
  
  useEffect(() => {
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
    
    // Step progression
    const stepTimer1 = setTimeout(() => setCurrentStep(1), 1000);
    const stepTimer2 = setTimeout(() => setCurrentStep(2), 2500);
    const stepTimer3 = setTimeout(() => setCurrentStep(3), 4000);
    
    // Navigate to result
    const navigationTimer = setTimeout(() => {
      navigate('/result');
    }, 5500);
    
    return () => {
      clearInterval(progressTimer);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);
  
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'processing';
    return 'pending';
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch('https://readdy.ai/api/form/d3egnc52v2m9odki5na0', {
        method: 'POST',
        body: new URLSearchParams({
          email: email
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.ok) {
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-2xl mx-auto">
          {/* Loading Text */}
          <div className="space-y-4 mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Converting photo into 3D model...
              </span>
            </h1>
            
            <p className="text-gray-200 text-lg">
              Our AI is analyzing your image and generating a detailed 3D model
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 animate-fade-in animation-delay-200">
            <div className="relative w-full max-w-md mx-auto">
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-3 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-white font-bold text-lg">
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Email Input Form */}
          <div className="mb-8 animate-fade-in animation-delay-400">
            <form 
              onSubmit={handleEmailSubmit}
              data-readdy-form
              id="email_notification"
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col space-y-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  disabled={emailSubmitted || !email.trim()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {emailSubmitted ? 'Email Saved!' : 'Save Email'}
                </button>
              </div>
            </form>
            
            {/* Notification Message */}
            <div className="mt-4 p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
              <p className="text-sm" style={{ color: '#ffffff' }}>
                The file address will be sent to your email address when the conversion is complete.
              </p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="space-y-6 animate-fade-in animation-delay-600">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              return (
                <div 
                  key={step.id}
                  className={`flex items-center justify-between max-w-md mx-auto p-4 rounded-lg transition-all duration-500 ${
                    status === 'completed' ? 'bg-green-500/10 border border-green-500/30' :
                    status === 'processing' ? 'bg-purple-500/10 border border-purple-500/30 animate-pulse' :
                    'bg-gray-800/50 border border-gray-600/30'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      status === 'completed' ? 'bg-green-500 text-white' :
                      status === 'processing' ? 'bg-purple-500 text-white' :
                      'bg-gray-600 text-gray-400'
                    }`}>
                      {status === 'completed' ? (
                        <i className="ri-check-line text-lg"></i>
                      ) : status === 'processing' ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <i className={`${step.icon} text-lg`}></i>
                      )}
                    </div>
                    <span className={`font-medium transition-colors duration-300 ${
                      status === 'completed' ? 'text-green-400' :
                      status === 'processing' ? 'text-purple-400' :
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  
                  {status === 'processing' && (
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Estimated Time */}
          <div className="mt-8 animate-fade-in animation-delay-800">
            <p className="text-gray-400 text-sm">
              Estimated time remaining: {Math.max(0, Math.ceil((100 - progress) / 20))} seconds
            </p>
          </div>
        </div>
        
        {/* Background Effects */}
        <div className="fixed top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" />
        <div className="fixed bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse animation-delay-700" />
        <div className="fixed top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full blur-lg animate-pulse animation-delay-300" />
      </div>
    </div>
  );
}
