import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>That page does not exist.</h1>
      <p>
        The route is missing, but the main offer pages are live and linked from
        the homepage.
      </p>
      <Link className="button button-primary" href="/">
        Back to Home
      </Link>
    </main>
  );
}

