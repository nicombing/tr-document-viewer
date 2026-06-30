import React, { useState } from 'react';
import { documentLibrary } from './data';
import { X, ChevronDown, ChevronRight, FileText, Folder, SplitSquareHorizontal } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, activeDocId, setActiveDocId, activeVersionId, setActiveVersionId, viewMode, setViewMode }) => {
  // Track which document folders are expanded
  const [expandedDocs, setExpandedDocs] = useState({ [activeDocId]: true });
  // Track which versions are expanded to show their TOC
  const [expandedVersions, setExpandedVersions] = useState({ [`${activeDocId}-${activeVersionId}`]: true });

  const toggleDoc = (docId) => {
    setExpandedDocs(prev => ({ ...prev, [docId]: !prev[docId] }));
  };

  const toggleVersion = (docId, versionId) => {
    const key = `${docId}-${versionId}`;
    setExpandedVersions(prev => ({ ...prev, [key]: !prev[key] }));
    
    // Set active document and version when clicking a version
    setActiveDocId(docId);
    setActiveVersionId(versionId);
    setViewMode('document');
  };

  const handleScroll = (id) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-3/4 max-w-sm lg:w-80 bg-gray-50 border-r border-gray-200 shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 shrink-0 bg-white">
          <h2 className="font-sans text-xl font-bold text-blue-700 tracking-tight">Transla</h2>
          <button 
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto flex-1">
          <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
            <button
              onClick={() => { setViewMode('comparison'); if(window.innerWidth < 1024) setIsOpen(false); }}
              className={`w-full flex items-center text-left font-sans text-sm font-semibold px-2 py-2 rounded-md transition-colors ${
                viewMode === 'comparison' ? 'bg-blue-100 text-blue-700' : 'text-gray-800 hover:bg-gray-200'
              }`}
            >
              <SplitSquareHorizontal size={16} className={`mr-2 ${viewMode === 'comparison' ? 'text-blue-600' : 'text-blue-500'}`} />
              Comparison Analysis
            </button>
          </div>

          <h3 className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Document Library</h3>
          <ul className="space-y-1">
            {Object.keys(documentLibrary).map((docId) => {
              const isDocExpanded = expandedDocs[docId];
              const docData = documentLibrary[docId];

              return (
                <li key={docId} className="mb-2">
                  <button
                    onClick={() => toggleDoc(docId)}
                    className="w-full flex items-center text-left font-sans text-sm font-semibold text-gray-800 hover:bg-gray-200 px-2 py-2 rounded-md transition-colors"
                  >
                    {isDocExpanded ? <ChevronDown size={16} className="mr-2 text-gray-500" /> : <ChevronRight size={16} className="mr-2 text-gray-500" />}
                    <Folder size={16} className="mr-2 text-blue-500" />
                    {docId}
                  </button>

                  {/* Versions List */}
                  {isDocExpanded && (
                    <ul className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-2">
                      {Object.keys(docData.versions).map((versionId) => {
                        const versionKey = `${docId}-${versionId}`;
                        const isVersionExpanded = expandedVersions[versionKey];
                        const isActive = activeDocId === docId && activeVersionId === versionId;
                        const sections = docData.versions[versionId];

                        return (
                          <li key={versionId}>
                            <button
                              onClick={() => toggleVersion(docId, versionId)}
                              className={`w-full flex items-center text-left font-sans text-sm px-2 py-1.5 rounded-md transition-colors ${
                                isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                            >
                              {sections.length > 0 ? (
                                isVersionExpanded ? <ChevronDown size={14} className="mr-2 shrink-0" /> : <ChevronRight size={14} className="mr-2 shrink-0" />
                              ) : (
                                <span className="w-5"></span> // spacer
                              )}
                              <FileText size={14} className="mr-2 shrink-0" />
                              {versionId}
                            </button>

                            {/* Table of Contents */}
                            {isVersionExpanded && sections.length > 0 && (
                              <ul className="ml-6 mt-1 mb-2 space-y-1">
                                {sections.map((section) => (
                                  <li key={section.id}>
                                    <button
                                      onClick={() => handleScroll(section.id)}
                                      className="w-full text-left font-sans text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors truncate"
                                    >
                                      {section.title}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
