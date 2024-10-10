"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

const passage = `
The Internet of Things (IoT) is transforming the way we interact with our environment. 
IoT refers to the network of physical objects embedded with sensors, software, and other 
technologies for the purpose of connecting and exchanging data with other devices and 
systems over the internet. From smart homes to industrial applications, IoT is making 
our world more connected and efficient. However, as IoT devices become more prevalent, 
concerns about privacy and security have also increased, prompting discussions about 
the need for robust regulations and security measures.
`;

const questions = [
  {
    question: 'What does IoT stand for?',
    options: [
      'Internet of Things',
      'Integration of Technology',
      'Interconnected Terminals',
      'Information on Time'
    ],
    correctAnswer: [true, false, false, false]
  },
  {
    question: 'Which of the following are true about IoT? (Select all that apply)',
    options: [
      'It connects physical objects to the internet',
      'It only applies to smart home devices',
      'It involves the exchange of data between devices',
      'It has no privacy or security concerns'
    ],
    correctAnswer: [true, false, true, false]
  },
  {
    question: 'What concerns have arisen with the increased prevalence of IoT devices?',
    options: [
      'Privacy issues',
      'Security vulnerabilities',
      'Need for regulations',
      'All of the above'
    ],
    correctAnswer: [false, false, false, true]
  }
];

export default function ReadingComprehension() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleCheckboxChange = (index: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = !newSelectedAnswers[index];
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = () => {
    setShowResult(true);
    if (isCorrect()) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  const isCorrect = () => {
    return JSON.stringify(selectedAnswers) === JSON.stringify(questions[currentQuestion].correctAnswer);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-600 to-red-600 text-transparent bg-clip-text">Reading Comprehension</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Passage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{passage}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
        </CardHeader>
        <CardContent>
          {questions[currentQuestion].options.map((option, index) => (
            <div className="flex items-center space-x-2 mb-4" key={index}>
              <Checkbox
                id={`option-${index}`}
                checked={selectedAnswers[index] || false}
                onCheckedChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex justify-between w-full">
            <Button onClick={handleSubmit} disabled={showResult} size="lg">
              Submit Answer
            </Button>
            <Button onClick={nextQuestion} disabled={!showResult} size="lg">
              Next Question
            </Button>
          </div>
          {showResult && (
            <Alert variant={isCorrect() ? 'default' : 'destructive'}>
              {isCorrect() ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{isCorrect() ? 'Correct!' : 'Incorrect'}</AlertTitle>
              <AlertDescription>
                {isCorrect()
                  ? 'Great job! You got it right.'
                  : 'Sorry, that\'s not correct. Review the passage and try again.'}
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