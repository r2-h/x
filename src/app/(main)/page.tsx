import Post from "@/components/posts/Post"
import PostEditor from "@/components/posts/editor/PostEditor"
import prisma from "@/lib/prisma"
import { PostDataInclude } from "@/lib/types"

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: PostDataInclude,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-w-00 h-[200vh] w-full">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </main>
  )
}
