import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import Profile from "../userImageUploader/Profile";

const UserProfileSettings = () => {
  const handleUsernameChange = () => {}; // handle username change
  const handleNameChange = () => {}; // handle

  return (
    <div className="flex justify-center items-center w-full max-md:mt-5">
      <Card className="flex flex-col max-md:w-full gap-0 w-full mt-10">
        <h1 className="flex text-2xl font-bold text-center mt-5 ml-5 items-start">
          User Settings
        </h1>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-10 p-10 w-full">
          {/* profile image and data */}
          <div className="w-auto h-auto flex-shrink-0">
            <Profile />
          </div>

          <div className="flex flex-col gap-10 w-[70%]">
            <div className="flex flex-row gap-5 max-md:flex-col">
              <Input
                type="text"
                placeholder="Change Name"
                className="border-2 flex-grow"
              />
              <Button
                onClick={handleNameChange}
                className="bg-sky-500 text-white lg:hover:bg-green-500"
              >
                Save Name
              </Button>
            </div>
            <div className="flex flex-row gap-5 max-md:flex-col">
              <Input
                type="text"
                placeholder="Change Username"
                className="border-2 flex-grow"
              />
              <Button
                onClick={handleUsernameChange}
                className="bg-sky-600 text-white lg:hover:bg-green-500"
              >
                Save Name
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfileSettings;
