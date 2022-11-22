import Head from "next/head";
import { Link } from "@/components/Link";
import { useUser } from "@/hooks/useUser";
import Router from "next/router";

export default function ChatsPage() {
  const { user, isLoading, isError } = useUser({ redirect: true })
  
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    Router.replace('/signin')
    return <h1>Redirect...</h1>
  }

  return (
    <div>
      <Head>
        <title>Chats</title>
      </Head>
      <Link href='/'>To Home Page</Link>
      <main>
        <h1>Protected Chats page of user {user.email}</h1>
        <h2>Redirect: {!!isError}</h2>
      </main>
    </div>
  )
}