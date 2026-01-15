import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <Header />
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center py-20 text-center md:py-32">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              The Best Landing Pages, Period.
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-zinc-500 dark:text-zinc-400 md:text-xl">
              Our platform helps you create beautiful and effective landing
              pages that convert.
            </p>
            <a
              href="/upload"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-zinc-950 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Get Started
            </a>
          </div>
        </section>
      </main>
      <footer className="flex h-20 w-full items-center justify-center border-t">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © 2024 Landed Edge. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
