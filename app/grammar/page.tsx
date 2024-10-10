"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

const questions = [
  {
    question: 'Which sentence is grammatically correct?',
    options: [
      'She don\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She doesn\'t like coffee.',
      'She not like coffee.'
    ],
    correctAnswer: 2
  },
  {
    question: 'Choose the correct form of the verb:',
    options: [
      'I have went to the store.',
      'I have gone to the store.',
      'I have goed to the store.',
      'I have going to the store.'
    ],
    correctAnswer: 1
  },
  {
    question: 'Which sentence uses the correct article?',
    options: [
      'I saw a elephant at the zoo.',
      'I saw an elephant at the zoo.',
      'I saw the elephant at the zoo.',
      'I saw elephant at the zoo.'
    ],
    correctAnswer: 1
  }
];

export default function GrammarExercises() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">Grammar Exercises</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => setSelectedAnswer(parseInt(value))}>
            {questions[currentQuestion].options.map((option, index) => (
              <div className="flex items-center space-x-2 mb-4" key={index}>
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-lg">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex justify-between w-full">
            <Button onClick={handleSubmit} disabled={selectedAnswer === null || showResult} size="lg">
              Submit Answer
            </Button>
            <Button onClick={nextQuestion} disabled={!showResult} size="lg">
              Next Question
            </Button>
          </div>
          {showResult && (
            <Alert variant={selectedAnswer === questions[currentQuestion].correctAnswer ? 'default' : 'destructive'}>
              {selectedAnswer === questions[currentQuestion].correctAnswer ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{selectedAnswer === questions[currentQuestion].correctAnswer ? 'Correct!' : 'Incorrect'}</AlertTitle>
              <AlertDescription>
                {selectedAnswer === questions[currentQuestion].correctAnswer
                  ? 'Great job! You got it right.'
                  : `The correct answer is: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`}
              </AlertDescription>
            </Alert>
          )}
          <div className="w-full">
            <Progress value={progress} className="w-full" />
            <p className="text-center mt-2">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <p className="text-center font-bold">Score: {score}/{questions.length}</p>
        </CardFooter>
      </Card>
    </div>
  );
}