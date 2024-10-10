import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { articles } from '@/lib/articles';
import { motion } from "framer-motion";

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

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
        Nature Articles
      </h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {articles.map((article, index) => (
          <motion.div key={index} variants={item}>
            <Link href={`/articles/${index}`} passHref>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full group overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-green-500 to-emerald-500 transition-all duration-300 group-hover:scale-105">
                  <CardTitle className="text-white">{article.title.english}</CardTitle>
                </CardHeader>
                <CardContent className="mt-4">
                  <p className="text-muted-foreground">{article.description.english}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.keywords.english.map((keyword, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}