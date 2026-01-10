"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminDashboard = () => {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (!isPending && session?.user.role !== "admin") {
      router.push("/user/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>Loading admin data...</p>
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

  if (!session || session?.user.role === "user") return null;

  return (
    <div className="w-full min-h-screen p-4 mx-auto space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-right">
          <p className="font-medium">{session.user.name}</p>
          <p className="text-muted-foreground">{session.user.email}</p>
          <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
            {session.user.role}
          </span>
        </div>
      </div>

      {/* Dashboard Content Here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-semibold">Users</h3>
          <p>Manage platform users</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
