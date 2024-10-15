"use client";

import { LoginScreen } from "@/components/authScreens/LoginScreen";
// import { SignUpForm } from "@/components/authScreens/SignUpScreen";
// import { useState } from "react";

const Login = () => {
  // const [auth, setAuth] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <LoginScreen />
        {/* should be separate route (need to be made ) */}
      </div>
    </>
  );
};

export default Login;
