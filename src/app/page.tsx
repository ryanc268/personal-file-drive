"use client";

import Link from "next/link";

export default function Example() {
  return (
    <div className="bg-gray-900 relative">
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Your Personal File Drive
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Get started right away by signing up below!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/directory/files"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
