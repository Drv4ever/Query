import { useState } from 'react';
import { X } from 'lucide-react';

interface AddQuestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
}

export function AddQuestionDialog({ isOpen, onClose, onSubmit }: AddQuestionDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
      setTitle('');
      setContent('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-[#2c2e33] rounded max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[#2c2e33]">
          <h2 className="text-[#d1d0c5]">add question</h2>
          <button
            onClick={onClose}
            className="text-[#646669] hover:text-[#e2b714] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label htmlFor="title" className="block text-[#646669] text-sm mb-2">
              title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="what would you like to know?"
              className="w-full px-3 py-2 bg-[#2c2e33] text-[#d1d0c5] placeholder:text-[#646669] border border-transparent focus:border-orange-500 focus:outline-none rounded transition-colors"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-[#646669] text-sm mb-2">
              details
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="provide more details..."
              className="w-full px-3 py-2 bg-[#2c2e33] text-[#d1d0c5] placeholder:text-[#646669] border border-transparent focus:border-orange-500 focus:outline-none rounded transition-colors min-h-[150px] resize-none"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#646669] hover:text-[#d1d0c5] transition-colors"
            >
              cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-400 text-[#323437] hover:bg-[#f0c75e] rounded transition-colors"
            >
              post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
