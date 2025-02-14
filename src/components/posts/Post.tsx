"use client"
import { PostData } from "@/lib/types"
import { formatRelativeDate } from "@/lib/utils"
import Link from "next/link"
import UserAvatar from "../UserAvatar"
import { deletePost } from "./actions"
import { useDeletePostMutation } from "./mutations"
import PostMoreButton from "./PostMoreButton"
import { useSession } from "@/app/(main)/_components/SessionProvider"
import Linkify from "../Linkify"
import UserTooltip from "../UserTooltip"

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
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user?.username}`}>
              <UserAvatar avatarUrl={post.user?.avatarUrl} />
            </Link>
          </UserTooltip>

          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user?.username}`}
                className="block font-medium hover:underline"
              >
                {post.user?.displayName}
              </Link>
            </UserTooltip>
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
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
    </article>
  )
}
