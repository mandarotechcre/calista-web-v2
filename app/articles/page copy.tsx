// "use client"

// import { PrivateRoute } from "@/components/private-route"
// import { Navigation } from "@/components/layout/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { BookOpen, Clock, User } from "lucide-react"

// interface Article {
//   id: string
//   title: string
//   summary: string
//   category: string
//   readTime: number
//   author: string
//   publishedAt: Date
//   imageUrl: string
// }

// const mockArticles: Article[] = [
//   {
//     id: "1",
//     title: "Understanding Your Menstrual Cycle: A Complete Guide",
//     summary: "Learn about the four phases of your menstrual cycle and what happens in your body during each phase.",
//     category: "Education",
//     readTime: 8,
//     author: "Dr. Sarah Johnson",
//     publishedAt: new Date("2024-01-15"),
//     imageUrl: "/placeholder.svg?height=200&width=400",
//   },
//   {
//     id: "2",
//     title: "Managing Menstrual Pain: Natural Remedies and Tips",
//     summary:
//       "Discover effective natural remedies and lifestyle changes that can help reduce menstrual pain and discomfort.",
//     category: "Health",
//     readTime: 6,
//     author: "Dr. Emily Chen",
//     publishedAt: new Date("2024-01-20"),
//     imageUrl: "/placeholder.svg?height=200&width=400",
//   },
//   {
//     id: "3",
//     title: "Irregular Periods: When to See a Doctor",
//     summary:
//       "Understanding what constitutes irregular periods and when you should consult with a healthcare professional.",
//     category: "Health",
//     readTime: 5,
//     author: "Dr. Maria Rodriguez",
//     publishedAt: new Date("2024-01-25"),
//     imageUrl: "/placeholder.svg?height=200&width=400",
//   },
//   {
//     id: "4",
//     title: "Nutrition and Your Menstrual Cycle",
//     summary: "How your diet affects your menstrual cycle and which foods can help support hormonal balance.",
//     category: "Nutrition",
//     readTime: 7,
//     author: "Lisa Thompson, RD",
//     publishedAt: new Date("2024-02-01"),
//     imageUrl: "/placeholder.svg?height=200&width=400",
//   },
//   {
//     id: "5",
//     title: "Exercise During Your Period: What You Need to Know",
//     summary: "Guidelines for staying active during menstruation and how exercise can actually help with symptoms.",
//     category: "Fitness",
//     readTime: 4,
//     author: "Jessica Martinez",
//     publishedAt: new Date("2024-02-05"),
//     imageUrl: "/placeholder.svg?height=200&width=400",
//   },
//   {
//     id: "6",
//     title: "Menstrual Products: Finding What Works for You",
//     summary:
//       "A comprehensive comparison of different menstrual products to help you make the best choice for your lifestyle.",
//     category: "Products",
//     readTime: 6,
//     author: "Amanda Wilson",
//     publishedAt: new Date("2024-02-10"),
//     imageUrl: "/placeholder.svg?height=200&width=400",
//   },
// ]

// const categories = ["All", "Education", "Health", "Nutrition", "Fitness", "Products"]

// export default function ArticlesPage() {
//   return (
//     <PrivateRoute>
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
//         <Navigation />
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
//               <BookOpen className="w-8 h-8 text-pink-600" />
//               <span>Knowledge Center</span>
//             </h1>
//             <p className="text-gray-600 mt-2">Educational articles about women's health and menstrual wellness</p>
//           </div>

//           <div className="mb-6">
//             <div className="flex flex-wrap gap-2">
//               {categories.map((category) => (
//                 <Button
//                   key={category}
//                   variant={category === "All" ? "default" : "outline"}
//                   size="sm"
//                   className={category === "All" ? "bg-pink-600 hover:bg-pink-700" : ""}
//                 >
//                   {category}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {mockArticles.map((article) => (
//               <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                 <div className="aspect-video bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
//                   <BookOpen className="w-12 h-12 text-pink-400" />
//                 </div>
//                 <CardHeader>
//                   <div className="flex items-center justify-between mb-2">
//                     <Badge variant="secondary">{article.category}</Badge>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <Clock className="w-4 h-4 mr-1" />
//                       {article.readTime} min
//                     </div>
//                   </div>
//                   <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
//                   <CardDescription className="line-clamp-3">{article.summary}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center text-sm text-gray-500">
//                       <User className="w-4 h-4 mr-1" />
//                       {article.author}
//                     </div>
//                     <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
//                       Read More
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <div className="mt-12 text-center">
//             <Button variant="outline" size="lg">
//               Load More Articles
//             </Button>
//           </div>
//         </main>
//       </div>
//     </PrivateRoute>
//   )
// }
