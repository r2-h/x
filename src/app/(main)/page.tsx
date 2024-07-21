import TrendsSidebar from "@/components/TrendsSidebar"
import Post from "@/components/posts/Post"
import PostEditor from "@/components/posts/editor/PostEditor"
import prisma from "@/lib/prisma"
import { postDataInclude } from "@/lib/types"

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="flex w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  )
}
