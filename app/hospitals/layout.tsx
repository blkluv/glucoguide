import { Navigation } from "@/components"

export default function HospitalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <div className="ml-auto md:w-[calc(100%-72px)] xl:w-[calc(100%-240px)] min-h-[calc(100vh-64px)] px-3 xs:px-4 dark:bg-zinc-900">
        {children}
      </div>
    </>
  )
}
