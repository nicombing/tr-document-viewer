import React from 'react';
import ParagraphPair from './ParagraphPair';
import TablePair from './TablePair';
import ImagePair from './ImagePair';

const DocumentSection = ({ section }) => {
  return (
    <section id={section.id} className="mb-16 scroll-mt-8">
      <h2 className="text-2xl font-sans font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        {section.title}
      </h2>
      <div>
        {section.content.map((block, index) => {
          if (block.type === 'table') {
            return <TablePair key={index} headers={block.headers} rows={block.rows} />;
          }
          if (block.type === 'image') {
            return <ImagePair key={index} src={block.src} alt={block.alt} caption={block.caption} />;
          }
          return <ParagraphPair key={index} en={block.en} id={block.id} />;
        })}
      </div>
    </section>
  );
};

export default DocumentSection;
