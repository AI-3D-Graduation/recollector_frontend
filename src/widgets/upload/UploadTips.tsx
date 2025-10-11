import { Card } from "../../shared";

export function UploadTips() {
  return (
    <div className="mt-12 grid md:grid-cols-2 gap-6">
      <Card padding="sm" className="border-green-500/30 animate-slide-in-left animation-delay-600">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 animate-pulse">
            <i className="ri-check-line text-green-400"></i>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Best Results</h4>
            <p className="text-sm text-gray-400">
              Use well-lit photos with clear subjects and minimal background
            </p>
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
            <p className="text-sm text-gray-400">
              Most models are generated within 30-60 seconds
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}