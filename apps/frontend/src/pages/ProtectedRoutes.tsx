import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/auth";
import { Session } from "@supabase/supabase-js";

export default function ProtectedRoutes() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsClient(true);

    authService
      .getSession()
      .then((session) => {
        setUser(session);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!isClient || loading) {
    return null;
  }

  if (!user) {
    console.log(user);
    const redirectPath = encodeURIComponent(
      location.pathname + location.search,
    );
    return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
  }

  return <Outlet />;
}
