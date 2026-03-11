import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { motion } from "motion/react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Top 10 Maths Tricks for Class 10 Board Exams",
    category: "Study Tips",
    excerpt:
      "Master these essential maths shortcuts and problem-solving strategies that top-scoring students use to save time and score full marks in board exams.",
    readTime: "5 min read",
    date: "Mar 8, 2026",
    emoji: "📐",
    categoryColor: "bg-blue-50 text-blue-700",
  },
  {
    id: 2,
    title: "How to Choose the Right Tutor for Your Child",
    category: "Parent Guide",
    excerpt:
      "Finding the perfect tutor can make a huge difference in your child's academic journey. Here's a step-by-step guide for Tamil Nadu parents to make the right choice.",
    readTime: "7 min read",
    date: "Mar 5, 2026",
    emoji: "👨‍👧",
    categoryColor: "bg-green-50 text-green-700",
  },
  {
    id: 3,
    title: "NEET 2026 Preparation Guide: Biology Focus",
    category: "Exam Prep",
    excerpt:
      "Biology carries 360 marks in NEET. This comprehensive guide covers the most important chapters, best books, and revision strategies for Tamil Nadu students.",
    readTime: "10 min read",
    date: "Mar 2, 2026",
    emoji: "🧬",
    categoryColor: "bg-orange-50 text-orange-700",
  },
  {
    id: 4,
    title: "Tamil Language Tips: Scoring Full Marks in Board Exams",
    category: "Subject Help",
    excerpt:
      "Tamil is often overlooked by students focusing on science subjects. Learn how to score 100/100 in Tamil with these proven techniques from experienced Tamil tutors.",
    readTime: "6 min read",
    date: "Feb 28, 2026",
    emoji: "🕉️",
    categoryColor: "bg-purple-50 text-purple-700",
  },
  {
    id: 5,
    title: "The Perfect Study Schedule for Class 12 Students",
    category: "Study Tips",
    excerpt:
      "Balancing 6 subjects while managing stress and revision can be challenging. This structured daily study plan has helped hundreds of Class 12 students in Tamil Nadu achieve top scores.",
    readTime: "8 min read",
    date: "Feb 25, 2026",
    emoji: "🗓️",
    categoryColor: "bg-blue-50 text-blue-700",
  },
  {
    id: 6,
    title: "Online vs Home Tuition: Which is Right for Your Child?",
    category: "Parent Guide",
    excerpt:
      "Both online and home tuition have distinct advantages. This detailed comparison helps parents in Tamil Nadu make an informed decision based on their child's learning style and needs.",
    readTime: "6 min read",
    date: "Feb 20, 2026",
    emoji: "💻",
    categoryColor: "bg-green-50 text-green-700",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Blog() {
  return (
    <main className="container mx-auto px-4 py-10" data-ocid="blog.page">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl gradient-teal flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">
              Study Tips &amp; Resources
            </h1>
            <p className="text-muted-foreground">
              Expert advice for students and parents across Tamil Nadu
            </p>
          </div>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {BLOG_POSTS.map((post, idx) => (
          <motion.div key={post.id} variants={item}>
            <Card
              className="card-hover h-full cursor-pointer"
              data-ocid={`blog.item.${idx + 1}`}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="text-4xl mb-4">{post.emoji}</div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${post.categoryColor} border-0 text-xs`}>
                    {post.category}
                  </Badge>
                </div>
                <h2 className="font-display font-bold text-lg mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
