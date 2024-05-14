import Header from "./_components/Header"

export const metadata = {
  title: 'Blog Posts',
  description: 'Blog Posts',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <div>
          <Header />
          <main className="w-full lg:max-w-screen-xl m-auto p-4 md:p-0">{children}</main>
        </div>
      </body>
    </html>
  )
}
