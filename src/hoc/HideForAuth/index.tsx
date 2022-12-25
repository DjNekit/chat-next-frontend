import { FC, ReactNode, useEffect } from "react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { Loading } from "@/components"
import { useRouter } from "next/router"

interface HideForAuthProps {
  children: ReactNode
}

export const HideForAuth: FC<HideForAuthProps> = ({ children }) => {
  const router = useRouter()
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuth) {
      router.replace('/chats')
    }
  }, [isAuth])

  if (isAuth) {
    return <Loading />
  }

  return <>{children}</>
}