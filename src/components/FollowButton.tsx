"use client"
import { FollowerInfo } from "@/lib/types"
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "./ui/use-toast"
import kyInstance from "@/lib/ky"
import { Button } from "./ui/button"
import useFollowerInfo from "@/hooks/useFollowerInfo"

type Props = {
  userId: string
  initialState: FollowerInfo
}

export const FollowButton = ({ initialState, userId }: Props) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const queryKey: QueryKey = ["follower-info", userId]

  const { data } = useFollowerInfo(userId, initialState)

  const { mutate } = useMutation({
    mutationFn: () =>
      initialState.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey)

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }))

      return { previousState }
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState)
      console.error(error)
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      })
    },
  })

  return (
    <Button
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  )
}
