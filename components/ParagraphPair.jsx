import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const ParagraphPair = ({ en, id }) => {
  const [copiedLang, setCopiedLang] = useState(null);

  const handleCopy = (text, lang) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLang(lang);
      setTimeout(() => setCopiedLang(null), 2000);
    });
  };

  const renderText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•')) {
        return (
          <div key={index} className="flex mb-2">
            <span className="mr-3 font-bold text-blue-400">•</span>
            <span>{trimmedLine.substring(1).trim()}</span>
          </div>
        );
      }
      return (
        <span key={index} className="block mb-3 last:mb-0">
          {trimmedLine}
        </span>
      );
    });
  };

  return (
    <div className="mb-8">
      {/* English Paragraph */}
      <div className="relative group text-gray-900 font-serif text-base leading-relaxed mb-3">
        {renderText(en)}
        <button
          onClick={() => handleCopy(en, 'en')}
          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 text-gray-500 hover:text-blue-600 rounded-md p-1.5 shadow-sm focus:outline-none z-10"
          title="Copy text"
        >
          {copiedLang === 'en' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      
      {/* Indonesian Translation Paragraph (Optional) */}
      {id && (
        <div className="relative group bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-md mt-3">
          <div className="text-gray-700 font-serif text-base leading-relaxed pr-6">
            {renderText(id)}
          </div>
          <button
            onClick={() => handleCopy(id, 'id')}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-blue-200 text-blue-500 hover:text-blue-700 rounded-md p-1.5 shadow-sm focus:outline-none z-10"
            title="Copy translated text"
          >
            {copiedLang === 'id' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ParagraphPair;
