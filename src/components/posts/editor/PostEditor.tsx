"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { submitPost } from "./actions"
import { useSession } from "@/app/(main)/_components/SessionProvider"
import UserAvatar from "@/components/UserAvatar"
import LoadingButton from "@/components/LoadingButton"
import { cn } from "@/lib/utils"
import "./styles.css"

export default function PostEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Whatscrackalackin",
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  })

  const { user } = useSession()

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || ""

  async function onSubmit() {
    await submitPost(input)
    editor?.commands.clearContent()
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className={cn(
            "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
          )}
        />
        <div className="flex items-center justify-end gap-3">
          <LoadingButton
            onClick={onSubmit}
            loading={false}
            disabled={!input.trim()}
            className="min-w-20"
          >
            Post
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}
