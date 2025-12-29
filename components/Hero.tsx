import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="my-20 flex flex-col items-center">
      <h1 className="text-center max-w-2xl text-7xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-linear-to-b from-cyan-50 to-cyan-200">
        Unleash the power of intuitive finance
      </h1>
      <p className="max-w-2xl text-xl text-center mx-auto mt-10 text-zinc-400 selection:bg-blue-700">
        Say goodbye to the outdated financial tools. Every small business owner,
        regardless of the background,can now manage their business like a pro.
        Simple. Intuitive. And never boring.
      </p>
      <div className="mt-8 flex justify-center w-full gap-5 max-w-xs ">
        <input
          placeholder="Entre your mail"
          className="flex-1 px-2 border border-neutral-600 rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition duration-200"
        />
        <Link
          href="/login"
          className="relative px-4 py-2 text-white rounded-md cursor-pointer border border-neutral-700"
        >
          <div className="absolute bottom-0 inset-x-0 w-fill h-px bg-linear-to-l from-transparent via-blue-700 to-transparent"></div>
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
