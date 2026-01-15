import { useState } from 'react';
import { TopBar } from '@/app/components/TopBar';
import { QuestionCard } from '@/app/components/QuestionCard';
import { AddQuestionDialog } from '@/app/components/AddQuestionDialog';

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

const initialQuestions: Question[] = [
  {
    id: '1',
    author: 'sarah_chen',
    title: 'what are the best practices for react state management in 2026?',
    content: 'working on a large-scale react application and wondering what the current best practices are for state management. should i use context api, redux, or something else?',
    likes: 42,
    replyCount: 5,
    timestamp: '2h',
    replies: [
      {
        id: 'r1',
        author: 'michael_park',
        content: 'for most applications, react context with useReducer is sufficient. only reach for redux if you have very complex state logic.',
        likes: 18,
        timestamp: '1h',
      },
      {
        id: 'r2',
        author: 'emily_rodriguez',
        content: 'i would recommend checking out zustand or jotai. they are much simpler than redux but still powerful enough for complex apps.',
        likes: 24,
        timestamp: '1h',
      },
      {
        id: 'r3',
        author: 'david_kim',
        content: 'don\'t forget about react query for server state! it handles caching and synchronization beautifully.',
        likes: 31,
        timestamp: '45m',
      },
      {
        id: 'r4',
        author: 'lisa_wang',
        content: 'the best choice really depends on your team\'s familiarity and the app\'s complexity. start simple and add complexity only when needed.',
        likes: 12,
        timestamp: '30m',
      },
      {
        id: 'r5',
        author: 'james_miller',
        content: 'i have been using the new useOptimistic hook for optimistic updates. game changer for ux!',
        likes: 15,
        timestamp: '15m',
      },
    ],
  },
  {
    id: '2',
    author: 'alex_thompson',
    title: 'how do i optimize website performance for mobile devices?',
    content: 'my website loads fine on desktop but is quite slow on mobile. what are some techniques to improve mobile performance?',
    likes: 28,
    replyCount: 3,
    timestamp: '4h',
    replies: [
      {
        id: 'r6',
        author: 'nina_patel',
        content: 'start by optimizing your images - use modern formats like webp and implement lazy loading.',
        likes: 15,
        timestamp: '3h',
      },
      {
        id: 'r7',
        author: 'robert_lee',
        content: 'minimize javascript bundles and consider code splitting. also, use a cdn for faster content delivery.',
        likes: 22,
        timestamp: '2h',
      },
      {
        id: 'r8',
        author: 'sophie_martin',
        content: 'don\'t forget to test with real devices and use chrome devtools\' throttling to simulate slower connections.',
        likes: 11,
        timestamp: '1h',
      },
    ],
  },
  {
    id: '3',
    author: 'jessica_brown',
    title: 'what is the difference between typescript and javascript?',
    content: 'i keep hearing about typescript but i am comfortable with javascript. is it worth learning typescript and what advantages does it offer?',
    likes: 65,
    replyCount: 4,
    timestamp: '6h',
    replies: [
      {
        id: 'r9',
        author: 'chris_anderson',
        content: 'typescript is a superset of javascript that adds static typing. it helps catch errors before runtime and improves ide support.',
        likes: 38,
        timestamp: '5h',
      },
      {
        id: 'r10',
        author: 'maria_garcia',
        content: 'absolutely worth learning! typescript makes refactoring safer and your code more maintainable in large projects.',
        likes: 29,
        timestamp: '4h',
      },
      {
        id: 'r11',
        author: 'tom_wilson',
        content: 'the learning curve is gentle if you already know javascript. start by adding types gradually to existing projects.',
        likes: 18,
        timestamp: '3h',
      },
      {
        id: 'r12',
        author: 'rachel_green',
        content: 'modern frameworks like next.js and remix have great typescript support out of the box. it is becoming the standard.',
        likes: 25,
        timestamp: '2h',
      },
    ],
  },
  {
    id: '4',
    author: 'marcus_johnson',
    title: 'best resources for learning web accessibility?',
    content: 'i want to make my websites more accessible but don\'t know where to start. can anyone recommend good resources?',
    likes: 19,
    replyCount: 2,
    timestamp: '8h',
    replies: [
      {
        id: 'r13',
        author: 'hannah_lee',
        content: 'the webaim resources are excellent! also check out the a11y project for practical guidelines.',
        likes: 12,
        timestamp: '7h',
      },
      {
        id: 'r14',
        author: 'kevin_zhang',
        content: 'mdn has great accessibility docs. also, use tools like axe devtools to audit your sites.',
        likes: 16,
        timestamp: '6h',
      },
    ],
  },
  {
    id: '5',
    author: 'olivia_martinez',
    title: 'should i learn vanilla javascript before react?',
    content: 'i am new to web development and wondering if i should master javascript first before jumping into react, or can i learn them together?',
    likes: 53,
    replyCount: 6,
    timestamp: '10h',
    replies: [
      {
        id: 'r15',
        author: 'daniel_cooper',
        content: 'definitely get comfortable with javascript fundamentals first. understanding closures, promises, and array methods will make react much easier.',
        likes: 31,
        timestamp: '9h',
      },
      {
        id: 'r16',
        author: 'grace_turner',
        content: 'you don\'t need to be an expert, but understand the basics like functions, objects, and es6 features before diving into react.',
        likes: 27,
        timestamp: '8h',
      },
      {
        id: 'r17',
        author: 'ryan_foster',
        content: 'i learned them together and it worked fine. just make sure you understand which features are javascript and which are react-specific.',
        likes: 14,
        timestamp: '7h',
      },
      {
        id: 'r18',
        author: 'sophia_adams',
        content: 'build a few vanilla js projects first - a todo app, calculator, etc. it will give you a solid foundation.',
        likes: 22,
        timestamp: '6h',
      },
      {
        id: 'r19',
        author: 'brandon_scott',
        content: 'understanding the dom and event handling in vanilla js is crucial before moving to react\'s declarative approach.',
        likes: 19,
        timestamp: '5h',
      },
      {
        id: 'r20',
        author: 'ella_mitchell',
        content: 'there are great javascript courses on freecodecamp and javascript.info. spend 2-3 weeks there before react.',
        likes: 16,
        timestamp: '4h',
      },
    ],
  },
];

export default function App() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddQuestion = (title: string, content: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      author: 'you',
      title,
      content,
      likes: 0,
      replyCount: 0,
      timestamp: 'now',
      replies: [],
    };
    
    setQuestions([newQuestion, ...questions]);
  };

  const handleAddReply = (questionId: string, content: string) => {
    const newReply: Reply = {
      id: Date.now().toString(),
      author: 'you',
      content,
      likes: 0,
      timestamp: 'now',
    };

    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          replies: [...q.replies, newReply],
          replyCount: q.replyCount + 1,
        };
      }
      return q;
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar onAddQuestion={() => setIsDialogOpen(true)} />
      
      <main className="max-w-5xl mx-auto px-6">
        <div>
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} onAddReply={handleAddReply} />
          ))}
        </div>
      </main>
      
      <AddQuestionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddQuestion}
      />
    </div>
  );
}