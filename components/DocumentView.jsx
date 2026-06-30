import React from 'react';
import DocumentSection from './DocumentSection';
import { documentLibrary } from './data';
import { FileQuestion } from 'lucide-react';

const DocumentView = ({ activeDocId, activeVersionId, isSidebarOpen }) => {
  const sections = documentLibrary[activeDocId]?.versions[activeVersionId] || [];

  return (
    <main className={`w-full p-6 lg:p-12 overflow-y-auto h-full bg-white relative transition-all duration-300 ${isSidebarOpen ? 'lg:w-[calc(100%-20rem)] lg:ml-80' : 'lg:w-full lg:ml-0'}`}>
      <div className="max-w-3xl mx-auto mt-16 lg:mt-0">
        <header className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-sans font-bold text-gray-900 mb-4">
            Transfer Pricing Document {activeDocId}
          </h1>
          <div className="flex items-center text-gray-500 font-sans text-sm space-x-4">
            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">Version: {activeVersionId}</span>
            <span>Bilingual Edition: English & Indonesian</span>
          </div>
        </header>

        {sections.length > 0 ? (
          sections.map((section) => (
            <DocumentSection key={section.id} section={section} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 mt-10">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <FileQuestion size={32} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans">Translation Pending</h3>
            <p className="text-gray-500 max-w-md font-sans">
              The content for {activeDocId} {activeVersionId} has not been uploaded yet. We are getting ready to translate this document soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default DocumentView;
