import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { MessageSquare, Send, Trash2 } from 'lucide-react';

const CommentThread = ({ docId, versionId, paragraphId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Listen for comments unconditionally so we can show accurate count on the button

    // Listen for comments specifically for this paragraph
    const q = query(
      collection(db, 'comments'),
      where('docId', '==', docId),
      where('versionId', '==', versionId),
      where('paragraphId', '==', paragraphId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort comments client-side to avoid requiring a composite index in Firestore.
      // Use Date.now() fallback for optimistic local updates where serverTimestamp is not yet populated.
      fetchedComments.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || Date.now();
        const timeB = b.createdAt?.toMillis() || Date.now();
        return timeA - timeB;
      });
      
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [docId, versionId, paragraphId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textToSubmit = newComment.trim();
    if (!textToSubmit) return;

    // Clear UI immediately for instant responsive feedback
    setNewComment('');

    try {
      await addDoc(collection(db, 'comments'), {
        docId,
        versionId,
        paragraphId,
        text: textToSubmit,
        createdAt: serverTimestamp(),
        // For a real app, this would be the logged-in user's name/avatar
        author: 'Anonymous Reviewer', 
      });
    } catch (error) {
      console.error('Error adding comment: ', error);
      // Revert if failed
      setNewComment(textToSubmit);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  return (
    <div className="mt-2 mb-4">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
      >
        <MessageSquare size={14} className="mr-1" />
        {comments.length > 0 ? `${comments.length} Comments` : 'Add Comment'}
      </button>

      {isExpanded && (
        <div className="mt-3 pl-4 border-l-2 border-blue-100 bg-gray-50 p-3 rounded-r-lg shadow-inner">
          <div className="space-y-3 mb-3 max-h-60 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No comments yet. Start the discussion!</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="relative group bg-white p-2 rounded border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-1 pr-8">
                    <span className="text-xs font-semibold text-gray-700">{comment.author}</span>
                  </div>
                  <p className="text-sm text-gray-600 pr-8 break-words">{comment.text}</p>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-red-200 text-red-500 hover:text-red-700 rounded-md p-1.5 shadow-sm focus:outline-none z-10"
                    title="Erase comment"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="flex items-center">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..." 
              className="flex-1 text-sm border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="bg-blue-600 text-white px-3 py-2 rounded-r-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentThread;
