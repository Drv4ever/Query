import { useState,useEffect } from 'react';
import { TopBar } from '@/app/components/TopBar';
import { QuestionCard } from '@/app/components/QuestionCard';
import { AddQuestionDialog } from '@/app/components/AddQuestionDialog';

import api from "@/api/api";
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



export default function App() {



  const [questions, setQuestions] = useState<Question[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);


   useEffect(() => {
 const fetchQuestions = async () => {
  try {
    setLoading(true);
    const res = await api.get("/questions");

    const questionsWithReplies = await Promise.all(
      res.data.map(async (q: any) => {
        const repliesRes = await api.get(`/answers/${q._id}`);
        return {
          id: q._id,
          author: "anonymous",
          title: q.title,
          content: q.description,
          likes: 0,
          replyCount: repliesRes.data.length,
          timestamp: "now",
          replies: repliesRes.data.map((r: any) => ({
            id: r._id,
            author: r.author,
            content: r.content,
            likes: r.likes,
            timestamp: r.createdAt,
          })),
        };
      })
    );

    setQuestions(questionsWithReplies);
  } catch (err: any) {
    setError("Failed to load questions");
  } finally {
    setLoading(false);
  }
};
  fetchQuestions();
}, []);



  const handleAddQuestion = async (title: string, content: string) => {
    const res = await api.post("/questions",{
      title,
      description:content,
    });

    const savedQuestion: Question = {
      id: res.data._id,
      author: 'you',
      title : res.data.title,
      content : res.data.description,
      likes: 0,
      replyCount: 0,
      timestamp: 'now',
      replies: [],
    };
    
    setQuestions( prev => [savedQuestion, ...prev]);
  };

  const handleAddReply = async (questionId: string, content: string) => {

    const res = await api.post("/answers",{
      questionId,
      content,
      author : "you"
    })
    const newReply: Reply = {
      id: res.data._id,
      author: res.data.author,
      content: res.data.content,
      likes: res.data.likes,
      timestamp: 'now',
    };

    setQuestions(prev =>
    prev.map(q =>
      q.id === questionId
        ? {
            ...q,
            replies: [...q.replies, newReply],
            replyCount: q.replyCount + 1,
          }
        : q
    )
  );
  };

  return ( 
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center">
  <div className="w-full max-w-2xl"> {/* <-- limit whole page width */}
    <TopBar onAddQuestion={() => setIsDialogOpen(true)} />
    
    <main className="px-6">
      {loading && <p className="text-center mt-6">Loading questions...</p>}

      {error && (
        <p className="text-center text-red-500 mt-6">{error}</p>
      )}

      {!loading && !error && questions.map(question => (
        <QuestionCard
          key={question.id}
          question={question}
          onAddReply={handleAddReply}
        />
      ))}
    </main>

    <AddQuestionDialog
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      onSubmit={handleAddQuestion}
    />
  </div>
</div>

  );
}