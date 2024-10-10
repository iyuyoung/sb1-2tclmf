"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const words = [
  { word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere' },
  { word: 'Ephemeral', definition: 'Lasting for a very short time' },
  { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing' },
  { word: 'Resilient', definition: 'Able to withstand or recover quickly from difficult conditions' },
  { word: 'Serendipity', definition: 'The occurrence and development of events by chance in a happy or beneficial way' },
];

export default function VocabularyPractice() {
  const [currentWord, setCurrentWord] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showDefinition, setShowDefinition] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const checkAnswer = () => {
    if (userInput.toLowerCase() === words[currentWord].word.toLowerCase()) {
      setFeedback({ type: 'success', message: 'Correct! Well done.' });
      setTimeout(() => {
        nextWord();
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback({ type: 'error', message: 'Incorrect. Try again!' });
    }
  };

  const nextWord = () => {
    setCurrentWord((prev) => (prev + 1) % words.length);
    setUserInput('');
    setShowDefinition(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Vocabulary Practice</h1>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Guess the Word</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-lg">{words[currentWord].definition}</p>
          <div className="space-y-4">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter the word"
              className="text-lg"
            />
            <div className="flex justify-between">
              <Button onClick={checkAnswer} size="lg">Check Answer</Button>
              <Button onClick={() => setShowDefinition(!showDefinition)} variant="outline" size="lg">
                {showDefinition ? 'Hide Word' : 'Show Word'}
              </Button>
            </div>
          </div>
          {showDefinition && (
            <p className="mt-6 text-center font-bold text-xl">{words[currentWord].word}</p>
          )}
          {feedback && (
            <Alert className="mt-6" variant={feedback.type === 'success' ? 'default' : 'destructive'}>
              {feedback.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{feedback.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}