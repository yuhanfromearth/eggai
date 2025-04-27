import { useEffect } from "react";
import { authService } from "../services/auth";

function Logout() {
  useEffect(() => {
    try {
      authService.logout();
    } catch (e) {
      console.error(e);
    }
  }, []);
}

export default Logout;
