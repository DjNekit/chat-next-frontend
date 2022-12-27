import { FC, ReactNode, useEffect } from "react"
import { useAppSelector } from "@/hooks/useAppSelector"
import { Loading } from "@/components"
import { useRouter } from "next/router"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { chatActions } from "@/redux/slices/chat.slice"
import { useToast } from "@chakra-ui/react"

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuth, isFirstLoading } = useAppSelector(state => state.auth)
  const { isConnect, error } = useAppSelector(state => state.chat)
  const toast = useToast()

  useEffect(() => {
    if (!isAuth && !isFirstLoading) {
      router.replace('/signin')
    }

    if (isAuth && !isConnect) {
      dispatch(chatActions.startConnection())
    } 

    if (error) {
      toast({
        title: error,
        status: 'error',
        position: 'top'
      })
    }
  }, [isAuth, isFirstLoading, isConnect, error])

  if (!isAuth) {
    return <Loading />
  }
  
  return <>{children}</>
}