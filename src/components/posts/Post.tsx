"use client"
import { PostData } from "@/lib/types"
import { formatRelativeDate } from "@/lib/utils"
import Link from "next/link"
import UserAvatar from "../UserAvatar"
import { deletePost } from "./actions"
import { useDeletePostMutation } from "./mutations"
import PostMoreButton from "./PostMoreButton"
import { useSession } from "@/app/(main)/_components/SessionProvider"

interface PostProps {
  post: PostData
}

export default function Post({ post }: PostProps) {
  const mutation = useDeletePostMutation()
  const { user } = useSession()

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user?.username}`}>
            <UserAvatar avatarUrl={post.user?.avatarUrl} />
          </Link>
          <div>
            <Link
              href={`/users/${post.user?.username}`}
              className="block font-medium hover:underline"
            >
              {post.user?.displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        <PostMoreButton
          post={post}
          className="opacity-0 transition-opacity group-hover/post:opacity-100"
        />
      </div>
      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  )
}
