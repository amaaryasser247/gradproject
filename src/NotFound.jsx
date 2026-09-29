import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-9xl font-bold text-accent">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-foreground">Page Not Found</h2>
      <p className="text-muted-foreground mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-8 bg-accent text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition">
        Go Back Home
      </Link>
    </div>
  )
}
