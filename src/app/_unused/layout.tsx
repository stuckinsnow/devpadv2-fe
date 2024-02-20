// import { Header } from './_components/Header'
// import { AuthProvider } from './_providers/Auth'

import './_css/app.scss'

export const metadata = {
  title: 'Payload Auth + Next.js App Router Example',
  description: 'An example of how to authenticate with Payload from a Next.js app.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        {/* <AuthProvider */}

        {/* <Header /> */}
        <main>{children}</main>
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}
