import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-eyebrow">404 error</span>
        <h1 className="not-found-title">
          This page took a study break.
        </h1>
        <p className="not-found-subtitle">
          The link you followed doesn&apos;t match any page on ARNOVA
          Academic Studio. It may have moved, or the address might have a typo.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn-lime">
            Back to home
          </Link>
          <Link href="/#contact" className="btn-outline">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
