import React, { useState } from 'react';
import { documentLibrary } from './data';
import { CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { diffWords } from 'diff';
import CommentThread from './CommentThread';

const ComparisonView = ({ isSidebarOpen }) => {
  const docKeys = Object.keys(documentLibrary);
  const defaultBase = docKeys.length > 0 ? docKeys[0] : '';
  const defaultTarget = docKeys.length > 1 ? docKeys[1] : defaultBase;

  const [targetDocId, setTargetDocId] = useState(defaultTarget);
  const baseDocId = defaultBase;
  const version = 'V1';

  const baseSections = documentLibrary[baseDocId]?.versions[version] || [];
  const targetSections = documentLibrary[targetDocId]?.versions[version] || [];

  const getCorrespondingText = (sectionId, blockIndex, isBase, lang) => {
    const docs = isBase ? targetSections : baseSections;
    const sec = docs.find(s => s.id === sectionId);
    if (!sec) return null;
    const block = sec.content[blockIndex];
    if (!block || block.type !== 'paragraph') return null;
    return block[lang];
  };

  const handlePinkClick = (sectionId, blockIndex, isBaseClicked) => {
    const targetPrefix = isBaseClicked ? 'target' : 'base';
    const targetElementId = `${targetPrefix}-${sectionId}-block-${blockIndex}-id`;
    const element = document.getElementById(targetElementId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add a blinking highlight effect to draw attention
      element.classList.add('animate-blink-bg');
      
      setTimeout(() => {
        element.classList.remove('animate-blink-bg');
      }, 5000);
    }
  };

  const renderDiffText = (text, correspondingText, isBase, sectionId, blockIndex) => {
    if (!text) return null;
    
    // If no corresponding text, just render normally (no highlight)
    if (!correspondingText || correspondingText.length < 5) {
      return <span>{text}</span>;
    }

    const oldStr = isBase ? text : correspondingText;
    const newStr = isBase ? correspondingText : text;
    
    const diffs = diffWords(oldStr, newStr);
    
    // Calculate similarity to avoid diffing completely different paragraphs
    let sameChars = 0;
    diffs.forEach(part => {
      if (!part.added && !part.removed) {
        sameChars += part.value.length;
      }
    });
    
    const similarity = sameChars / Math.max(oldStr.length, newStr.length);
    
    // If similarity is low but it exists, it means it's a rewritten paragraph with similar context
    if (similarity < 0.4) {
      return (
        <span 
          className="bg-pink-200 text-pink-900 px-1 rounded cursor-pointer hover:bg-pink-300 transition-colors inline-block" 
          onClick={() => handlePinkClick(sectionId, blockIndex, isBase)}
          title="Click to scroll to corresponding paragraph"
        >
          {text}
        </span>
      );
    }

    return diffs.map((part, index) => {
      if (isBase) {
        // We are rendering the OLD string. Show parts that are NOT added.
        if (part.added) return null;
        if (part.removed) {
          return <span key={index} className="bg-red-200 text-red-900 px-1 rounded line-through decoration-red-500 mx-0.5">{part.value}</span>;
        }
        return <span key={index} className="bg-yellow-200 px-0.5 rounded">{part.value}</span>;
      } else {
        // We are rendering the NEW string. Show parts that are NOT removed.
        if (part.removed) return null;
        if (part.added) {
          return <span key={index} className="bg-green-200 text-green-900 px-1 rounded font-medium mx-0.5">{part.value}</span>;
        }
        return <span key={index} className="bg-yellow-200 px-0.5 rounded">{part.value}</span>;
      }
    });
  };

  const renderTextWithDiff = (text, sectionId, blockIndex, isBase, lang) => {
    if (!text) return null;
    const correspondingText = getCorrespondingText(sectionId, blockIndex, isBase, lang);
    const lines = text.split('\n');
    const correspondingLines = correspondingText ? correspondingText.split('\n') : [];

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={idx} />;
      
      const isBullet = trimmed.startsWith('•');
      const content = isBullet ? trimmed.substring(1).trim() : trimmed;
      
      const corrLine = correspondingLines[idx] || '';
      const corrContent = corrLine.trim().startsWith('•') ? corrLine.trim().substring(1).trim() : corrLine.trim();

      const renderedContent = renderDiffText(content, corrContent, isBase, sectionId, blockIndex);

      if (isBullet) {
        return (
          <div key={idx} className="flex mb-2">
            <span className="mr-3 font-bold text-blue-400">•</span>
            <div>{renderedContent}</div>
          </div>
        );
      }

      return (
        <span key={idx} className="block mb-3 last:mb-0">
          {renderedContent}
        </span>
      );
    });
  };

  const renderText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={idx} />;
      
      const isBullet = trimmed.startsWith('•');
      const content = isBullet ? trimmed.substring(1).trim() : trimmed;

      if (isBullet) {
        return (
          <div key={idx} className="flex mb-2">
            <span className="mr-3 font-bold text-blue-400">•</span>
            <div>{content}</div>
          </div>
        );
      }

      return (
        <span key={idx} className="block mb-3 last:mb-0">
          {content}
        </span>
      );
    });
  };

  const renderSection = (section, isBase) => {
    return (
      <section key={section.id} className="mb-12">
        <h3 className="text-xl font-sans font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          {section.title}
        </h3>
        <div>
          {section.content.map((block, index) => {
            if (block.type === 'paragraph') {
              return (
                <div key={index} className="mb-6">
                  {/* English text gets rendered normally (no diffing) */}
                  <div className="text-gray-900 font-serif text-sm leading-relaxed mb-2">
                    {renderText(block.en)}
                  </div>
                  {/* Translated text gets diffing applied */}
                  {block.id && (
                    <div 
                      id={`${isBase ? 'base' : 'target'}-${section.id}-block-${index}-id`}
                      className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-md transition-colors duration-500"
                    >
                      <div className="text-gray-700 font-serif text-sm leading-relaxed">
                        {renderTextWithDiff(block.id, section.id, index, isBase, 'id')}
                      </div>
                    </div>
                  )}
                  
                  {!isBase && block.id && (
                    <CommentThread 
                      docId={targetDocId}
                      versionId={version}
                      paragraphId={`${section.id}-block-${index}`}
                    />
                  )}
                </div>
              );
            }
            if (block.type === 'table') {
              return (
                <div key={index} className="mb-6 overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        {block.headers.map((h, i) => (
                          <th key={i} className="p-2 border border-gray-200">{h.en}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2 border border-gray-200">{cell.en}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {block.headers[0]?.id && (
                    <table className="w-full text-left border-collapse border border-blue-200 mt-2 bg-blue-50">
                      <thead className="bg-blue-100">
                        <tr>
                          {block.headers.map((h, i) => (
                            <th key={i} className="p-2 border border-blue-200 text-blue-900">{h.id}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2 border border-blue-200 text-blue-800">{cell.id}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            }
            if (block.type === 'image') {
              return (
                <div key={index} className="mb-6 bg-gray-100 p-2 text-center text-xs text-gray-500 rounded">
                  [Image: {block.caption?.en}]
                </div>
              );
            }
            return null;
          })}
        </div>
      </section>
    );
  };

  return (
    <main className={`w-full p-6 lg:p-8 overflow-y-auto h-full bg-white relative transition-all duration-300 ${isSidebarOpen ? 'lg:w-[calc(100%-20rem)] lg:ml-80' : 'lg:w-full lg:ml-0'}`}>
      <div className="max-w-7xl mx-auto mt-16 lg:mt-0">
        <header className="mb-8">
          <h1 className="text-3xl font-sans font-bold text-gray-900 mb-2">
            Translation Methodology Comparison
          </h1>
          <p className="text-gray-500 font-sans">
            A side-by-side analysis demonstrating the validity and consistency of the translation.
          </p>
        </header>

        {/* Analysis Section */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4 font-sans flex items-center">
            <CheckCircle2 className="text-green-500 mr-2" />
            Translation & Comparison Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 font-sans text-sm leading-relaxed">
            <div>
              <p className="mb-3">
                <strong>1. Stylistic Consistency:</strong> The syntactic structure and formal tone of the base document are maintained in the target translation. This ensures the intended meaning and formatting are strictly preserved.
              </p>
              <p className="mb-3">
                <strong>2. Exact Terminology:</strong> Critical industry-specific terms and keywords are translated consistently throughout the document to ensure regulatory and technical accuracy.
              </p>
            </div>
            <div>
              <p className="mb-3">
                <strong>3. Proper Noun Preservation:</strong> Specific entities, proprietary platforms, and global institutions generally remain untranslated to maintain legal and factual accuracy.
              </p>
              <p>
                <strong>4. Diff Analysis (Translations):</strong> We perform a structural comparison between the base document and the target translation.
                <br/>• <span className="bg-yellow-200 px-1 rounded shadow-sm border border-yellow-300 text-yellow-900">Yellow</span> indicates identical phrasing or untranslated terminology.
                <br/>• <span className="bg-red-200 text-red-900 px-1 rounded line-through decoration-red-500">Red strike</span> indicates text present in the base but missing/changed in the target.
                <br/>• <span className="bg-green-200 text-green-900 px-1 rounded font-medium">Green</span> indicates text unique to the target translation.
                <br/>• <span className="bg-pink-200 text-pink-900 px-1 rounded font-medium">Pink</span> highlights paragraphs with significant rewrites or localized adaptations. <strong>(Click to scroll!)</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Selector */}
        <div className="flex items-center mb-6 bg-white p-4 border border-gray-200 rounded-lg shadow-sm sticky top-0 z-10">
          <div className="flex items-center flex-1">
            <span className="font-bold text-lg text-gray-800 px-4 text-center bg-gray-100 py-2 rounded-md">{documentLibrary[baseDocId]?.name || 'Base Document'}</span>
          </div>
          <div className="px-4 text-gray-400">
            <ArrowRightLeft />
          </div>
          <div className="flex items-center flex-1 justify-end">
            <select 
              value={targetDocId}
              onChange={(e) => setTargetDocId(e.target.value)}
              className="bg-blue-50 border border-blue-300 text-blue-900 text-lg font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto min-w-[200px] p-2 text-center shadow-sm cursor-pointer hover:bg-blue-100 transition-colors"
            >
              {docKeys.map(key => (
                <option key={key} value={key}>{documentLibrary[key].name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side View */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Base Document (Left) */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm overflow-hidden flex flex-col h-[800px]">
            <h2 className="text-2xl font-bold font-sans text-gray-900 border-b-4 border-gray-800 pb-2 mb-4 shrink-0 inline-block w-fit">{documentLibrary[baseDocId]?.name || 'Base Document'}</h2>
            <div className="overflow-y-auto pr-4 flex-1 custom-scrollbar">
              {baseSections.map(sec => renderSection(sec, true))}
            </div>
          </div>

          {/* Target Document (Right) */}
          <div className="border border-blue-200 rounded-lg p-6 bg-blue-50/30 shadow-sm overflow-hidden flex flex-col h-[800px]">
            <h2 className="text-2xl font-bold font-sans text-blue-900 border-b-4 border-blue-800 pb-2 mb-4 shrink-0 inline-block w-fit">{documentLibrary[targetDocId]?.name || 'Target Document'} Translated</h2>
            <div className="overflow-y-auto pr-4 flex-1 custom-scrollbar">
              {targetSections.map(sec => renderSection(sec, false))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ComparisonView;
