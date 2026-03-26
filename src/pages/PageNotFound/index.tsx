import { Link } from 'react-router-dom';
import type { JSX } from 'react';

function PageNotFound(): JSX.Element {
  return (
    <section className="flex h-screen items-center justify-center bg-gray-50 p-16">
      <div className="container flex flex-col items-center">
        <div className="flex max-w-md flex-col gap-6 text-center">
          <h2 className="text-9xl font-extrabold text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl text-center md:text-3xl text-gray-700">
            Sorry, we couldn&apos;t find this page.
          </p>
          <Link
            to="/"
            className="rounded bg-red-500 px-8 py-4 text-xl font-semibold text-gray-50 hover:bg-red-600 hover:text-gray-200"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;