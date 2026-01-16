import { useState } from 'react';
import { MessageCircle, ThumbsUp, CornerDownRight } from 'lucide-react';

interface Reply {
  id: string;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
}

interface Question {
  id: string;
  author: string;
  title: string;
  content: string;
  likes: number;
  replyCount: number;
  timestamp: string;
  replies: Reply[];
}

interface QuestionCardProps {
  question: Question;
  onAddReply: (questionId: string, content: string) => void;
}

export function QuestionCard({ question, onAddReply }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onAddReply(question.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="py-6 border-b border-zinc-300 hover:bg-zinc-100 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#646669] text-sm">{question.author}</span>
            <span className="text-[#3a3c40] text-sm">·</span>
            <span className="text-[#646669] text-sm">{question.timestamp}</span>
          </div>
          
          <h3 className="text-black  mb-2 cursor-pointer hover:text-orange-500 transition-colors">
            {question.title}
          </h3>
          
          <p className="text-[#646669] text-sm mb-3 leading-relaxed">
            {question.content}
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <button className="flex items-center gap-2 text-[#646669] hover:text-orange-500 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>{question.likes}</span>
            </button>
            
            <div className="flex items-center gap-2 text-[#646669]">
              <MessageCircle className="w-4 h-4" />
              <span>{question.replyCount}</span>
            </div>

            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-2 text-[#646669] hover:text-orange-500 transition-colors"
            >
              <CornerDownRight className="w-4 h-4" />
              <span>answer</span>
            </button>
          </div>
        </div>
      </div>
      
      {isReplying && (
        <form onSubmit={handleSubmitReply} className="mt-4 pl-4 border-l-2 border-[#e2b714]">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="type your answer..."
            className="w-full px-3 py-2 bg-[#2c2e33] text-[#d1d0c5] placeholder:text-[#646669] border border-transparent focus:border-[#e2b714] focus:outline-none rounded transition-colors text-sm resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="px-3 py-1 bg-orange-400 text-[#323437] hover:bg-orange-200 rounded transition-colors text-sm"
            >
              submit
            </button>
            <button
              type="button"
              onClick={() => {
                setIsReplying(false);
                setReplyContent('');
              }}
              className="px-3 py-1 text-[#646669] hover:text-[#d1d0c5] transition-colors text-sm"
            >
              cancel
            </button>
          </div>
        </form>
      )}
      
      {isExpanded && question.replies.length > 0 && (
        <div className="mt-6 space-y-4 pl-4 border-l-2 border-[#3a3c40]">
          {question.replies.map((reply) => (
            <div key={reply.id} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 text-sm">{reply.author}</span>
                <span className="text-zinc-800 text-sm">·</span>
                <span className="text-zinc-800 text-sm">{reply.timestamp}</span>
              </div>
              
              <p className="text-black text-sm leading-relaxed">
                {reply.content}
              </p>
              
              <button className="flex items-center gap-2 text-[#646669] hover:text-[#e2b714] transition-colors text-sm">
                <ThumbsUp className="w-3 h-3" />
                <span>{reply.likes}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}