"use client"

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, PenTool, BookText, Newspaper, Headphones, Mic, Edit, Coffee, Globe } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  {
    title: "Vocabulary Practice",
    description: "Expand your English vocabulary with interactive exercises.",
    icon: BookOpen,
    href: "/vocabulary",
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Grammar Exercises",
    description: "Improve your grammar skills through challenging quizzes.",
    icon: PenTool,
    href: "/grammar",
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Reading Comprehension",
    description: "Enhance your reading skills with engaging passages and questions.",
    icon: BookText,
    href: "/reading",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Nature Articles",
    description: "Explore fascinating articles about nature in English and Chinese.",
    icon: Newspaper,
    href: "/articles",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Listening Practice",
    description: "Improve your listening comprehension with audio clips and exercises.",
    icon: Headphones,
    href: "/listening",
    color: "from-yellow-500 to-amber-500"
  },
  {
    title: "Speaking Challenges",
    description: "Enhance your speaking skills through pronunciation drills and conversation prompts.",
    icon: Mic,
    href: "/speaking",
    color: "from-red-500 to-orange-500"
  },
  {
    title: "Writing Workshop",
    description: "Develop your writing abilities with guided exercises and essay prompts.",
    icon: Edit,
    href: "/writing",
    color: "from-teal-500 to-green-500"
  },
  {
    title: "Idioms & Expressions",
    description: "Learn common English idioms and expressions to sound more natural.",
    icon: Coffee,
    href: "/idioms",
    color: "from-fuchsia-500 to-pink-500"
  },
  {
    title: "Cultural Corner",
    description: "Explore English-speaking cultures and customs to broaden your understanding.",
    icon: Globe,
    href: "/culture",
    color: "from-indigo-500 to-blue-500"
  }
];

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
        Study English App
      </h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <motion.div key={index} variants={item}>
            <Link href={category.href} passHref>
              <Card className="hover:shadow-lg transition-all duration-300 h-full overflow-hidden group">
                <CardHeader className={`bg-gradient-to-br ${category.color} transition-all duration-300 group-hover:scale-105`}>
                  <CardTitle className="flex items-center justify-center text-white">
                    {<category.icon className="mr-2 h-6 w-6" />} {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-4">
                  <p className="text-center text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}