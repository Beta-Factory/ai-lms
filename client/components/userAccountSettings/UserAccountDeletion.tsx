import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const UserAccountDeletion = () => {
  return (
    <div className="flex justify-center items-center w-full max-md:mt-5">
      <Card className="w-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl text-red-300">
            Delete Account
          </CardTitle>
          <CardDescription>permanently delete your account</CardDescription>
        </CardHeader>
        <CardFooter className="border-t px-6 py-4">
          <Button className="bg-red-700">DELETE</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserAccountDeletion;
