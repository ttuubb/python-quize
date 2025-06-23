'use client';

import { useState, type FC } from 'react';
import { Lightbulb, CheckCircle, XCircle, LoaderCircle, Sparkles } from 'lucide-react';

import { questions } from '@/lib/questions';
import { getAIHint } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const Quiz: FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleAnswerSubmit = () => {
    if (isAnswered) return;

    const isCorrect = userAnswer.trim().toLowerCase().includes(currentQuestion.answer.toLowerCase());

    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setIsAnswered(false);
      setFeedback(null);
      setHint(null);
    } else {
      setIsQuizFinished(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswer('');
    setIsAnswered(false);
    setFeedback(null);
    setHint(null);
    setIsQuizFinished(false);
  };

  const handleGetHint = async () => {
    if (hint || isHintLoading) return;
    setIsHintLoading(true);
    try {
      const generatedHint = await getAIHint({
        questionText: currentQuestion.question,
        category: currentQuestion.category,
      });
      setHint(generatedHint);
    } catch (error) {
      console.error(error);
      setHint('Could not fetch a hint at this time.');
    } finally {
      setIsHintLoading(false);
    }
  };
  
  if (isQuizFinished) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-2xl animate-in fade-in-50 zoom-in-95">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
          <CardDescription className="text-lg">You've reached the end of the quiz.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-headline mb-4">Your Final Score: <span className="text-primary font-bold">{score} / {questions.length}</span></p>
          <p className="text-muted-foreground">Great job! Keep practicing to master Python.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestartQuiz} className="w-full text-lg py-6">
            Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="shadow-2xl animate-in fade-in-50">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
              <CardTitle className="text-2xl font-headline mt-1">{currentQuestion.question}</CardTitle>
            </div>
            <Badge variant="secondary">{currentQuestion.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.code && (
            <pre className="bg-muted p-4 rounded-md font-code text-sm overflow-x-auto">
              <code>{currentQuestion.code}</code>
            </pre>
          )}
          <Textarea
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isAnswered}
            className="font-code text-base"
            rows={3}
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleGetHint} disabled={isAnswered || isHintLoading}>
            {isHintLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Lightbulb />
            )}
            Get a Hint
          </Button>
          {isAnswered ? (
            <Button onClick={handleNextQuestion} className="w-full sm:w-auto flex-grow">
              Next Question
            </Button>
          ) : (
            <Button onClick={handleAnswerSubmit} className="w-full sm:w-auto flex-grow">
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {isHintLoading && !hint && (
        <Alert>
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertTitle>Generating Hint</AlertTitle>
          <AlertDescription>
            <Skeleton className="h-4 w-3/4 mt-2" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </AlertDescription>
        </Alert>
      )}

      {hint && !isHintLoading && (
        <Alert>
          <Lightbulb className="h-4 w-4 text-accent" />
          <AlertTitle className="font-bold text-accent">AI Hint</AlertTitle>
          <AlertDescription>{hint}</AlertDescription>
        </Alert>
      )}

      {isAnswered && feedback && (
        <Alert variant={feedback === 'correct' ? 'default' : 'destructive'} className={feedback === 'correct' ? 'border-chart-2' : ''}>
          {feedback === 'correct' ? <CheckCircle className="h-4 w-4 text-chart-2" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle className={feedback === 'correct' ? 'text-chart-2' : ''}>{feedback === 'correct' ? 'Correct!' : 'Incorrect'}</AlertTitle>
          <AlertDescription>
            <strong>The correct answer is:</strong>
            <pre className="mt-2 bg-background/50 p-2 rounded-md font-code text-sm">
              <code>{currentQuestion.answer}</code>
            </pre>
            <p className="mt-2">{currentQuestion.explanation}</p>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>Score: {score}/{questions.length}</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
};

export default Quiz;
