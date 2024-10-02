import CreateAgentPage from "@/app/create-agent/page";
import TopPage from "@/app/top-page/page";


const RightSection = () => {
    return(
        <>
        <div className="flex w-[75%] flex-row ">
         {/* <TopPage/> */}
         <CreateAgentPage/>
     </div>
        </>
    )
}

export default RightSection;