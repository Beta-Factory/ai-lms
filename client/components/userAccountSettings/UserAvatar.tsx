import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2Icon } from "lucide-react";

const UserAvatar = () => {
  return (
    <div>
      <Avatar className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{<User2Icon />}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
