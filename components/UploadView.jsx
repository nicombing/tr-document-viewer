import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

const UploadView = ({ isSidebarOpen }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(data.message + "\nFile Name: " + data.fileName + "\nSize: " + data.fileSize + " bytes\n\nNext Step: AI Parsing integration!");
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to connect to the backend.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className={`w-full p-6 lg:p-8 overflow-y-auto h-full bg-slate-50 relative transition-all duration-300 ${isSidebarOpen ? 'lg:w-[calc(100%-20rem)] lg:ml-80' : 'lg:w-full lg:ml-0'}`}>
      <div className="max-w-4xl mx-auto mt-16 lg:mt-0">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-sans font-bold text-slate-900 mb-4 tracking-tight">
            Upload & Translate
          </h1>
          <p className="text-slate-600 font-sans text-lg max-w-2xl mx-auto">
            Upload any document (PDF, Word, or Text). Transla's AI Engine will automatically translate it and generate a beautiful side-by-side comparison for your review.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              onChange={handleChange} 
              accept=".pdf,.docx,.txt"
            />
            
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-slate-800 font-semibold text-lg font-sans mb-1">{selectedFile.name}</p>
                <p className="text-slate-500 text-sm font-sans mb-6">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <button 
                  className={`text-white font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors text-lg ${isUploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading to API...' : 'Start Translation Process'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center pointer-events-none">
                <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <Upload size={36} />
                </div>
                <p className="text-slate-700 font-semibold text-xl font-sans mb-2">Drag and drop your file here</p>
                <p className="text-slate-500 text-sm font-sans mb-6">Supports PDF, DOCX, and TXT files</p>
                <span className="bg-white border border-slate-300 text-slate-700 font-medium py-2 px-6 rounded-lg shadow-sm">
                  Browse Files
                </span>
              </div>
            )}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText size={20} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">1. Upload</h3>
              <p className="text-slate-500 text-sm">Upload your original document in its native format.</p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-bold font-serif">AI</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">2. AI Translation</h3>
              <p className="text-slate-500 text-sm">Our AI engine accurately translates and preserves formatting.</p>
            </div>
            <div className="p-4">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">3. Review</h3>
              <p className="text-slate-500 text-sm">Analyze the result in our side-by-side smart viewer.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UploadView;
