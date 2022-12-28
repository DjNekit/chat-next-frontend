import { FC, ReactNode, useEffect } from "react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { Loading } from "@/components"
import { useRouter } from "next/router"

interface PublicOnlyProps {
  children: ReactNode
}

export const PublicOnly: FC<PublicOnlyProps> = ({ children }) => {
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