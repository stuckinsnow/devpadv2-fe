import Header from "./_components/Header"

export const metadata = {
  title: 'Blog Posts',
  description: 'Blog Posts',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="">
        <div>
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
