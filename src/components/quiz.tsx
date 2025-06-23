'use client';

import { useState, type FC, useEffect, useCallback } from 'react';
import { Lightbulb, CheckCircle, XCircle, LoaderCircle, Sparkles } from 'lucide-react';

import type { Question } from '@/lib/types';
import { getAIHint, getAIQuestion } from '@/app/actions';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const TOTAL_QUESTIONS = 10;
const CATEGORIES = ['数据结构', '算法', '语法与语义', '错误调试', '标准库', '列表操作', '字典', '函数', '模块', '面向对象'];

const QuestionLoader: FC = () => (
  <Card className="shadow-2xl">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-3/4 mt-2" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row gap-2">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 flex-grow" />
    </CardFooter>
  </Card>
);

const Quiz: FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isQuestionLoading, setIsQuestionLoading] = useState(true);
  
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const progress = (questionsAnswered / TOTAL_QUESTIONS) * 100;

  const fetchQuestion = useCallback(async () => {
    setIsQuestionLoading(true);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedback(null);
    setHint(null);
    
    try {
      const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const question = await getAIQuestion({ category: randomCategory });
      setCurrentQuestion(question);
    } catch (error) {
      console.error(error);
      // You could implement a retry mechanism or show an error message here
    } finally {
      setIsQuestionLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleAnswerSelect = (option: string) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = questionsAnswered + 1;
    if (nextQuestionIndex < TOTAL_QUESTIONS) {
      setQuestionsAnswered(nextQuestionIndex);
      fetchQuestion();
    } else {
      setQuestionsAnswered(nextQuestionIndex);
      setIsQuizFinished(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setQuestionsAnswered(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setFeedback(null);
    setHint(null);
    setIsQuizFinished(false);
    fetchQuestion();
  };

  const handleGetHint = async () => {
    if (hint || isHintLoading || !currentQuestion) return;
    setIsHintLoading(true);
    try {
      const generatedHint = await getAIHint({
        questionText: currentQuestion.question,
        category: currentQuestion.category,
      });
      setHint(generatedHint);
    } catch (error) {
      console.error(error);
      setHint('暂时无法获取提示。');
    } finally {
      setIsHintLoading(false);
    }
  };
  
  if (isQuizFinished) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-2xl animate-in fade-in-50 zoom-in-95">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">问答完成！</CardTitle>
          <CardDescription className="text-lg">您已完成所有题目。</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-headline mb-4">你的最终得分: <span className="text-primary font-bold">{score} / {TOTAL_QUESTIONS}</span></p>
          <p className="text-muted-foreground">干得漂亮！继续练习以精通 Python。</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestartQuiz} className="w-full text-lg py-6">
            重新开始问答
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {isQuestionLoading || !currentQuestion ? (
        <QuestionLoader />
      ) : (
        <Card className="shadow-2xl animate-in fade-in-50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardDescription>第 {questionsAnswered + 1} 题 / 共 {TOTAL_QUESTIONS} 题</CardDescription>
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
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => {
                const isCorrectAnswer = isAnswered && option === currentQuestion.answer;
                const isIncorrectSelected = isAnswered && selectedAnswer === option && option !== currentQuestion.answer;

                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className={cn(
                      "justify-start text-left h-auto py-3 whitespace-normal",
                      isCorrectAnswer && "border-2 border-chart-2 bg-chart-2/10 hover:bg-chart-2/20 text-chart-2",
                      isIncorrectSelected && "border-2 border-destructive bg-destructive/10 hover:bg-destructive/20 text-destructive"
                    )}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isAnswered}
                  >
                    <span className="mr-4 font-bold text-muted-foreground">{String.fromCharCode(65 + index)}</span>
                    <span className="font-code flex-1">{option}</span>
                    {isCorrectAnswer && <CheckCircle className="h-5 w-5 ml-auto shrink-0" />}
                    {isIncorrectSelected && <XCircle className="h-5 w-5 ml-auto shrink-0" />}
                  </Button>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleGetHint} disabled={isAnswered || isHintLoading}>
              {isHintLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Lightbulb />
              )}
              获取提示
            </Button>
            {isAnswered && (
              <Button onClick={handleNextQuestion} className="w-full sm:w-auto flex-grow">
                {questionsAnswered === TOTAL_QUESTIONS - 1 ? '完成问答' : '下一题'}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
      
      {isHintLoading && !hint && (
        <Alert>
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertTitle>正在生成提示</AlertTitle>
          <AlertDescription>
            <Skeleton className="h-4 w-3/4 mt-2" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </AlertDescription>
        </Alert>
      )}

      {hint && !isHintLoading && (
        <Alert>
          <Lightbulb className="h-4 w-4 text-accent" />
          <AlertTitle className="font-bold text-accent">AI 提示</AlertTitle>
          <AlertDescription>{hint}</AlertDescription>
        </Alert>
      )}

      {isAnswered && currentQuestion && feedback && (
        <Alert variant={feedback === 'correct' ? 'default' : 'destructive'} className={feedback === 'correct' ? 'border-chart-2' : ''}>
          {feedback === 'correct' ? <CheckCircle className="h-4 w-4 text-chart-2" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle className={feedback === 'correct' ? 'text-chart-2' : ''}>{feedback === 'correct' ? '回答正确！' : '回答错误'}</AlertTitle>
          <AlertDescription>
            <p className="mt-2">{currentQuestion.explanation}</p>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>进度</span>
          <span>得分: {score}</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
};

export default Quiz;
