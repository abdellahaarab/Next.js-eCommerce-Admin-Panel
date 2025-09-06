'use client';
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export function useAdminAuth() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // redirect to sign in
    }
  }, [status]);

  return { session, status };
}
