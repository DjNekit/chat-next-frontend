import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LightMode } from "@chakra-ui/react";
import { Loading, SignForm, SigninLayout } from "@/components";
import { useUserQuery } from "@/redux/api/auth";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function SigninPage() {
  const userData = useUserQuery({})
  const router = useRouter()
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuth) {
      router.replace('/chats')
    }
  }, [isAuth])

  if (isAuth || userData.isLoading) {
    return <Loading />
  }

  return (
    <LightMode>
      <Head>
        <title>Sign In</title>
      </Head>
      <SigninLayout>
        <SignForm />
      </SigninLayout>
    </LightMode>
  )
}