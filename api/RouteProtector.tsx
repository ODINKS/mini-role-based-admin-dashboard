import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useDataStore from "@/store/useDataStore";

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
      router.replace("/auth/login");
    }
  }, [user, allowedRoles, router]);

  if (!user || !allowedRoles.includes(user.role!)) return null;

  return <>{children}</>;
};

export default RouteProtector;
