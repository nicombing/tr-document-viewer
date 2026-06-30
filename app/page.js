"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DocumentView from '../components/DocumentView';
import ComparisonView from '../components/ComparisonView';
import UploadView from '../components/UploadView';
import { Menu } from 'lucide-react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeDocId, setActiveDocId] = useState('AcmeCorp_2023');
  const [activeVersionId, setActiveVersionId] = useState('V1');
  const [viewMode, setViewMode] = useState('upload'); // default to 'upload' for new users

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 1024);
  }, []);

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full bg-white border-b border-gray-200 z-10 flex items-center p-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <span className="ml-4 font-bold text-gray-800 font-sans truncate">
          {viewMode === 'upload' ? 'Upload Document' : viewMode === 'comparison' ? 'Comparison Analysis' : `Transla - ${activeDocId}`}
        </span>
      </header>

      {/* Desktop Menu Button (visible when sidebar is closed) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="hidden lg:flex fixed top-6 left-6 z-20 bg-white p-2 rounded-md shadow-md border border-gray-200 text-gray-600 hover:text-gray-900 focus:outline-none transition-all duration-300"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      )}

      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeDocId={activeDocId}
        setActiveDocId={setActiveDocId}
        activeVersionId={activeVersionId}
        setActiveVersionId={setActiveVersionId}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      {viewMode === 'upload' ? (
        <UploadView isSidebarOpen={isSidebarOpen} />
      ) : viewMode === 'comparison' ? (
        <ComparisonView isSidebarOpen={isSidebarOpen} />
      ) : (
        <DocumentView 
          activeDocId={activeDocId}
          activeVersionId={activeVersionId}
          isSidebarOpen={isSidebarOpen}
        />
      )}
    </div>
  );
}
