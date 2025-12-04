import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { videos, quizzes } from '@/lib/data';
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

export default function Quiz() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { user, completeQuiz } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const video = videos.find(v => v.id === videoId);
  const quiz = quizzes.find(q => q.videoId === videoId);

  if (!video || !quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl">Quiz not found</p>
          <Link to="/explore">
            <Button className="mt-4">Back to Videos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      completeQuiz(quiz.id);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / quiz.questions.length) * 100);

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="shadow-hover animate-scale-in">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-hero rounded-full flex items-center justify-center animate-bounce-gentle">
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div>
                <div className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                  {score}/{quiz.questions.length}
                </div>
                <p className="text-xl text-muted-foreground">
                  {percentage >= 80 ? "Amazing work! 🌟" : 
                   percentage >= 60 ? "Great job! 🎉" : 
                   "Good try! Keep learning! 💪"}
                </p>
              </div>

              <div className="space-y-3">
                {quiz.questions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correctAnswer;
                  return (
                    <div 
                      key={question.id}
                      className={cn(
                        "p-4 rounded-lg border-2 text-left",
                        isCorrect ? "border-accent bg-accent/10" : "border-destructive bg-destructive/10"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-1">{question.question}</p>
                          <p className="text-sm text-muted-foreground">
                            {isCorrect ? "Correct!" : `Correct answer: ${question.options[question.correctAnswer]}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Link to={`/video/${videoId}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Watch Again
                  </Button>
                </Link>
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={() => navigate('/explore')}
                >
                  More Videos
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to={`/video/${videoId}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Video
          </Button>
        </Link>

        <Card className="shadow-hover animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Question {currentQuestion + 1} of {quiz.questions.length}</CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-2xl font-bold">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={cn(
                    "w-full p-4 text-left rounded-lg border-2 transition-all hover:scale-[1.02]",
                    selectedAnswers[currentQuestion] === index
                      ? "border-primary bg-primary/10 shadow-card"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      selectedAnswers[currentQuestion] === index
                        ? "border-primary bg-primary"
                        : "border-border"
                    )}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
