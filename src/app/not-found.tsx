import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#f4f2ee] text-[#0d0d0d]">
      <div className="font-mono text-xs uppercase tracking-widest text-[#77756f] mb-2">
        404 — Page Not Found
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Out of Bounds
      </h1>
      <p className="text-sm text-[#77756f] max-w-md mb-8">
        The requested URL could not be located.
      </p>
      <Link href="/" className="btn-pill btn-primary text-xs">
        Return to Portfolio
      </Link>
    </div>
  );
}
