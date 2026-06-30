import React from 'react';

const ImagePair = ({ src, alt, caption }) => {
  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Image Container */}
      <div className="bg-gray-100 p-4 flex justify-center items-center border-b border-gray-200 min-h-[200px]">
        {/* We use an onError handler just in case the user hasn't uploaded the image yet to show a nice fallback */}
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[600px] object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden flex-col items-center justify-center text-gray-400 p-8 text-center">
          <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <p className="font-sans font-medium">Image not found</p>
          <p className="font-sans text-sm mt-1">Please save your screenshot as <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">{src}</code></p>
        </div>
      </div>

      {/* Captions */}
      <div className="divide-y divide-gray-100">
        <div className="p-4">
          <p className="text-gray-900 font-sans font-medium text-center">
            {caption.en}
          </p>
        </div>
        {caption?.id && (
          <div className="p-4 bg-blue-50/50">
            <p className="text-blue-700 font-sans font-medium text-center">
              {caption.id}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePair;
