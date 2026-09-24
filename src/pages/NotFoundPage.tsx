import { Link } from "react-router-dom"
import { PageRoutes } from "@/config/routes/routes"

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <p className="text-8xl font-black text-foreground">404</p>
      <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
      <p className="text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to={PageRoutes.HOME}
        className="mt-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
      >
        Back to Home
      </Link>
    </main>
  )
}

export default NotFoundPage
