import Header from "@/components/Header"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Create a client
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
        <ReactQueryDevtools />
        <ToastContainer
          theme='dark'
          position='top-center'
          autoClose={3000}
          hideProgressBar={true}
        />
      </QueryClientProvider>
    </>
  )
}
