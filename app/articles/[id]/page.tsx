"use client"

import { articles } from '@/lib/articles';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { motion } from "framer-motion";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles[parseInt(params.id)];

  if (!article) {
    return <div>Article not found</div>;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Link href="/articles" passHref>
        <Button className="mb-6">← Back to Articles</Button>
      </Link>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardTitle className="text-3xl">
            {article.title.english}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-6">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
              <TabsTrigger value="reflection">Reflection</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <p className="text-lg leading-relaxed mb-4">{article.content.english}</p>
            </TabsContent>
            <TabsContent value="vocabulary">
              <ul className="space-y-4">
                {article.vocabulary.map((word, index) => (
                  <li key={index} className="bg-primary/5 p-4 rounded-lg">
                    <strong className="text-xl">{word.word}</strong> 
                    <span className="text-sm text-muted-foreground ml-2">{word.pronunciation}</span>
                    <p className="mt-2">{word.meaning.english}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reflection">
              <ul className="space-y-4">
                {article.reflection_questions.english.map((question, index) => (
                  <li key={index} className="bg-primary/5 p-4 rounded-lg">
                    {question}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-muted">
          <div className="flex justify-between items-center w-full">
            <p>Category: <span className="font-semibold">{article.category.english}</span></p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}