"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useGetGoogleAuthQuery } from "@/lib/features/ai-agents/ai-agents-api";

export function LoginScreen() {
  // const { data, error, isLoading } = useGetGoogleAuthQuery({});

  const handleGoogleAuth = () => {
    // window.location.href = data?.authUrl;
    window.location.href = "http://localhost:5000/api/v1/auth/google";
    // console.log(data);
  };

  // isLoading && <div>Loading...</div>;
  // error && <div>Error: {error.toString()}</div>;

  return (
    <div className="w-full lg:min-h-60 xl:min-h-60 lg:p-5">
      <div className="flex items-center justify-center py-12 text-slate-700">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full"
            >
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
