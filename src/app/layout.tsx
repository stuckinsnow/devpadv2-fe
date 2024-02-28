export const metadata = {
  title: 'aa',
  description: 'aa',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <div

        >
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
