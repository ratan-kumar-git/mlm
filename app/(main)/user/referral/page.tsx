"use client"; // This must be the very first line
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

// FIX: Rename 'page' to 'Page' (Capitalized)
const Page = () => {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (!isPending && session?.user.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-500">
        Error loading session: {error.message}
      </div>
    );
  }

  if (!session || session?.user.role === "admin") return null;

  return (
    <>
      <div className="w-full min-h-screen p-4 mx-auto space-y-4">
        {/* Added safe access to session.user in case it's undefined momentarily */}
        <p>Referral Link: {`http://localhost:3000/signup?referralId=${session?.user?.referralCode}`}</p>
        <Button asChild>
          {/* Using 'asChild' on Button avoids nesting <a> inside <button> which is invalid HTML */}
          <Link
            href={`http://localhost:3000/signup?referralId=${session?.user?.referralCode}`}
            target="_blank"
          >
            Link
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Page;