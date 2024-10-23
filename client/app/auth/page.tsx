"use client";

import { LoginScreen } from "@/components/authScreens/LoginScreen";
import { SignUpForm } from "@/components/authScreens/SignUpScreen";
import { useState } from "react";
// import { SignUpForm } from "@/components/authScreens/SignUpScreen";
// import { useState } from "react";

const Login = () => {
  const [signIn, setSignIn] = useState(true);

  const handleToggleAuth = () => {
    setSignIn(!signIn);
  };

  return (
    <>
      <div className="flex items-center justify-center h-vh flex-col p-5">
        {signIn ? <LoginScreen /> : <SignUpForm />}
        {/* should be separate route (need to be made ) */}
        <div className="w-full mt-2 flex gap-2 text-lg justify-center">
          {signIn ? "Don't have an account?" : "Already have an account?"}
          <span className="underline cursor-pointer" onClick={handleToggleAuth}>
            {signIn ? "Sign up" : "Sign in"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
