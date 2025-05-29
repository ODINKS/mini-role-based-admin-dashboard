"use client";
import React, { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import useDataStore from "@/store/useDataStore";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  allowedRoles: ("admin" | "editor")[];
}

const RouteProtector = ({ children, allowedRoles }: Props) => {
  const router = useRouter();
  const user = useDataStore((state) => state.user);

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role!)) {
      toast.error("Access denied. Please login with proper credentials.");
      router.replace("/login");
    }
  }, [user, allowedRoles, router]);

  if (!user || !allowedRoles.includes(user.role!)) return null;

  return <>{children}</>;
};

export default RouteProtector;
