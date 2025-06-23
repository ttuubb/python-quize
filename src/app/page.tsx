import { PythonIcon } from '@/components/icons';
import Quiz from '@/components/quiz';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <PythonIcon className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-headline text-primary">
              PyQuizMaster
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8 md:py-12">
        <Quiz />
      </main>
      <footer className="py-4 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PyQuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
