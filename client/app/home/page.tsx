// import { Sidebar } from "lucide-react";
import Sidebar from "../../components/SidebarSection";
import RightSection from "../../components/RightSection";
const TopPage = () => {

    return (
        <div className="flex flex-row gap-10">
     <Sidebar/>
     <RightSection/>
        </div>
    );
}

export default TopPage;