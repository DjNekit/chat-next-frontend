import { FC, ReactNode, useEffect } from "react"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Loading } from "@/components"
import { useAppSelector } from "@/hooks/useAppSelector"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { chatActions } from "@/redux/slices/chat.slice"
import { useUserQuery } from "@/redux/api/auth"

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  useUserQuery({})
  const router = useRouter()
  const dispatch = useAppDispatch()
  const toast = useToast()
  
  const { isAuth, isFirstLoading } = useAppSelector(state => state.auth)
  const { isConnect, error } = useAppSelector(state => state.chat)

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

  
  return (
    <>
      {!isAuth && <Loading />}
      {children}
    </>
  )
}