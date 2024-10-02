"use client"
import { Edit, Sidebar } from "lucide-react";
import { useState } from "react";

const SidebarSection = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>   {isSidebarOpen ? <div className={`bg-[#F5F5F5] w-[20%] h-[100vh] ${isSidebarOpen? "":""}`} >
      <div className="w-[100%] flex  justify-between px-5 py-5">
        <Sidebar 
        onClick={toggleSidebar}
        className="text-[#808080]" />
        <Edit className="text-[#808080]" />
      </div>

      {/* user info */}
      <div className="flex justify-center">
        <div className="flex flex-row items-center mt-3 border gap-5 w-[90%] rounded-lg p-1">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#808080]"></div>
          <div className="flex flex-col">
            <p className="text-[#808080] text-[15px] font-bold">John Doe</p>
            <p className="text-[#808080] text-[10px]">
              sanjaygawai2022@gmail.com
            </p>
          </div>
        </div> 
      </div>

      {/* explore agents */}
      <div className="px-4 mt-5 mb-5">
        <div className="flex flex-row items-center gap-2 border bg-[#EEEEF1] py-2 px-3 rounded-xl">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M5.84996 3.47194C5.84996 4.80089 4.69858 5.93332 3.20833 5.93332C1.71809 5.93332 0.566711 4.80089 0.566711 3.47194C0.566711 2.14298 1.71809 1.01056 3.20833 1.01056C4.69858 1.01056 5.84996 2.14298 5.84996 3.47194Z"
              stroke="black"
              stroke-width="1.13342"
            />
            <path
              opacity="0.3"
              d="M13.4333 3.47194C13.4333 4.80089 12.2819 5.93332 10.7917 5.93332C9.30142 5.93332 8.15005 4.80089 8.15005 3.47194C8.15005 2.14298 9.30142 1.01056 10.7917 1.01056C12.2819 1.01056 13.4333 2.14298 13.4333 3.47194Z"
              stroke="black"
              stroke-width="1.13342"
            />
            <path
              opacity="0.3"
              d="M5.84996 11.5281C5.84996 12.857 4.69858 13.9895 3.20833 13.9895C1.71809 13.9895 0.566711 12.857 0.566711 11.5281C0.566711 10.1991 1.71809 9.06671 3.20833 9.06671C4.69858 9.06671 5.84996 10.1991 5.84996 11.5281Z"
              stroke="black"
              stroke-width="1.13342"
            />
            <path
              opacity="0.3"
              d="M13.4333 11.5281C13.4333 12.857 12.2819 13.9895 10.7917 13.9895C9.30142 13.9895 8.15004 12.857 8.15004 11.5281C8.15004 10.1991 9.30142 9.06671 10.7917 9.06671C12.2819 9.06671 13.4333 10.1991 13.4333 11.5281Z"
              stroke="black"
              stroke-width="1.13342"
            />
          </svg>

          <p className="text-[#808080] text-[15px]">Explore Agents</p>
        </div>
      </div>

      <span className="text-[#808080] text-[15px] mt-4 px-4">Today</span>
      <div>
        <div className="flex flex-row justify-center items-center">
          <span className="text-[#808080] text-[15px]  px-4">
            Email for Leave Application
          </span>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.4">
              <path
                d="M9.75 8.5C9.75 8.84612 9.64736 9.18446 9.45507 9.47225C9.26278 9.76003 8.98947 9.98434 8.6697 10.1168C8.34993 10.2492 7.99806 10.2839 7.65859 10.2164C7.31913 10.1489 7.00731 9.98218 6.76256 9.73744C6.51782 9.4927 6.35115 9.18087 6.28363 8.84141C6.2161 8.50194 6.25076 8.15007 6.38321 7.8303C6.51567 7.51053 6.73997 7.23722 7.02775 7.04493C7.31554 6.85264 7.65388 6.75 8 6.75C8.46413 6.75 8.90925 6.93437 9.23744 7.26256C9.56563 7.59075 9.75 8.03587 9.75 8.5ZM3 6.75C2.65388 6.75 2.31554 6.85264 2.02775 7.04493C1.73997 7.23722 1.51566 7.51053 1.38321 7.8303C1.25076 8.15007 1.2161 8.50194 1.28363 8.84141C1.35115 9.18087 1.51782 9.4927 1.76256 9.73744C2.00731 9.98218 2.31913 10.1489 2.65859 10.2164C2.99806 10.2839 3.34993 10.2492 3.6697 10.1168C3.98947 9.98434 4.26278 9.76003 4.45507 9.47225C4.64737 9.18446 4.75 8.84612 4.75 8.5C4.75 8.03587 4.56563 7.59075 4.23744 7.26256C3.90925 6.93437 3.46413 6.75 3 6.75ZM13 6.75C12.6539 6.75 12.3155 6.85264 12.0278 7.04493C11.74 7.23722 11.5157 7.51053 11.3832 7.8303C11.2508 8.15007 11.2161 8.50194 11.2836 8.84141C11.3512 9.18087 11.5178 9.4927 11.7626 9.73744C12.0073 9.98218 12.3191 10.1489 12.6586 10.2164C12.9981 10.2839 13.3499 10.2492 13.6697 10.1168C13.9895 9.98434 14.2628 9.76003 14.4551 9.47225C14.6474 9.18446 14.75 8.84612 14.75 8.5C14.75 8.27019 14.7047 8.04262 14.6168 7.8303C14.5288 7.61798 14.3999 7.42507 14.2374 7.26256C14.0749 7.10006 13.882 6.97116 13.6697 6.88321C13.4574 6.79526 13.2298 6.75 13 6.75Z"
                fill="black"
              />
            </g>
          </svg>
        </div>
      </div>

    </div> :  <div className="bg-[#F5F5F5] lg:w-[5%] sm:w-[10%] h-[100vh]">
      <div className="w-[100%] flex  justify-between px-2 py-2">
        <Sidebar 
        onClick={toggleSidebar}
        className="text-[#808080]" />
        <Edit className="text-[#808080]" />
      </div>

      {/* user info */}
      <div className="flex justify-center">
        <div className="flex flex-row items-center justify-center  mt-3 border gap-5 w-[90%] rounded-lg p-1">
          <div className="w-[30px] h-[30px] rounded-lg bg-[#808080]"></div>
        </div> 
      </div>

      {/* explore agents */}
      <div className="px-4 mt-5 mb-5">
        <div className="flex flex-row items-center justify-center gap-2 border bg-[#EEEEF1] py-2 px-3 rounded-xl">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M5.84996 3.47194C5.84996 4.80089 4.69858 5.93332 3.20833 5.93332C1.71809 5.93332 0.566711 4.80089 0.566711 3.47194C0.566711 2.14298 1.71809 1.01056 3.20833 1.01056C4.69858 1.01056 5.84996 2.14298 5.84996 3.47194Z"
              stroke="black"
              stroke-width="1.13342"
            />
            <path
              opacity="0.3"
              d="M13.4333 3.47194C13.4333 4.80089 12.2819 5.93332 10.7917 5.93332C9.30142 5.93332 8.15005 4.80089 8.15005 3.47194C8.15005 2.14298 9.30142 1.01056 10.7917 1.01056C12.2819 1.01056 13.4333 2.14298 13.4333 3.47194Z"
              stroke="black"
              stroke-width="1.13342"
            />
            <path
              opacity="0.3"
              d="M5.84996 11.5281C5.84996 12.857 4.69858 13.9895 3.20833 13.9895C1.71809 13.9895 0.566711 12.857 0.566711 11.5281C0.566711 10.1991 1.71809 9.06671 3.20833 9.06671C4.69858 9.06671 5.84996 10.1991 5.84996 11.5281Z"
              stroke="black"
              stroke-width="1.13342"
            />
            <path
              opacity="0.3"
              d="M13.4333 11.5281C13.4333 12.857 12.2819 13.9895 10.7917 13.9895C9.30142 13.9895 8.15004 12.857 8.15004 11.5281C8.15004 10.1991 9.30142 9.06671 10.7917 9.06671C12.2819 9.06671 13.4333 10.1991 13.4333 11.5281Z"
              stroke="black"
              stroke-width="1.13342"
            />
          </svg>

        </div>
      </div>

      </div>


    
    }
    </>

  );
};
export default SidebarSection;
