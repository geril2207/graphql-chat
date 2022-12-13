import { useSubscribeToMessageSubscription } from "../../../../generated/graphql"

export const useMessageSubscription = () => {
  const { data: subscribeData } = useSubscribeToMessageSubscription()
}
