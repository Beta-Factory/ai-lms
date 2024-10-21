import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

const UserPasswordSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [valuePresent, setValuePresent] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center w-full max-md:mt-5">
      <Card className="w-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl">change password</CardTitle>
          <CardDescription>An otp will be sent to your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex gap-5">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => {
                e.target.value.length > 0
                  ? setValuePresent(true)
                  : setValuePresent(false);
              }}
            />
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              className={valuePresent ? `felx px-3 rounded-sm` : `hidden`}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserPasswordSettings;
