"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useDataStore from "@/store/useDataStore";
import { useRouter } from "next/navigation";
import tokenManager from "@/api/tokenManager";

interface Props {
  children: ReactNode;
  allowedRoles: ("admin" | "editor")[];
}

const RouteProtector = ({ children, allowedRoles }: Props) => {
  const router = useRouter();
  const user = useDataStore((state) => state.user);
  const justLoggedOut = useDataStore((state) => state.justLoggedOut);
  const setUser = useDataStore((state) => state.setUser);
  const setJustLoggedOut = useDataStore((state) => state.setJustLoggedOut);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydrate user from cookie if not in state
    if (!user) {
      const storedUser = tokenManager.getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    }
    setLoading(false);
  }, [user, setUser]);

  useEffect(() => {
    if (!loading) {
      if (!user || !allowedRoles.includes(user.role!)) {
        if (!justLoggedOut) {
          toast.error("Access denied. Please login with proper credentials.");
        }
        setJustLoggedOut(false);
        router.replace("/login");
      }
    }
  }, [user, allowedRoles, router, loading, justLoggedOut, setJustLoggedOut]);

  if (loading) return null;

  if (!user || !allowedRoles.includes(user.role!)) return null;

  return <>{children}</>;
};

export default RouteProtector;
