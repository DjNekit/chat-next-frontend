import { FC, ReactNode, useEffect } from "react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { Loading } from "@/components"
import { useRouter } from "next/router"

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter()
  const { isAuth, isFirstLoading } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (!isAuth && !isFirstLoading) {
      router.replace('/signin')
    }
  }, [isAuth, isFirstLoading])

  if (!isAuth) {
    return <Loading />
  }
  
  return <>{children}</>
}