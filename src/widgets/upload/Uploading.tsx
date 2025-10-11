export function UploadingView() {
  return (
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
        <div 
          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full animate-pulse" 
          style={{width: '100%'}}
        ></div>
      </div>
    </div>
  );
}