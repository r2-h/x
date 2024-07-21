import TrendsSidebar from "@/components/TrendsSidebar"
import PostEditor from "@/components/posts/editor/PostEditor"
import ForYouFeed from "./_components/ForYouFeed"

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  )
}
