import { Button } from "@/components/ui/button";
// import AudioFIle from "../ui/AudioFileDesign";
// import PdfFile from "../ui/PdfFileDesign";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  addMessage,
  handleUpload,
  selectAiChatFiles,
  selectAiChatMessages,
} from "../../lib/features/ai-chats/ai-chat-Slice";

import ChatEditorModal from "../chatEditor/chatEditorModal";

import SelectedAgent from "../ui/chat/selectedAgent";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Paperclip } from "lucide-react";



const AgentCreator = () => {
  const dispatch = useAppDispatch();
  const uloadedFiles = useAppSelector(selectAiChatFiles);

  
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "text/plain": [".txt"],
      //audio
    },
    noClick: true, // Prevents automatic click on dropzone, handled manually via the SVG click
    onDrop: (acceptedFiles: any) => {
      // Combine existing files with newly accepted files
      const newFiles = [...uloadedFiles, ...acceptedFiles];

      // Dispatch the updated array to the global state
      dispatch(handleUpload(newFiles));
    },
  });

  const formatFileSize = (size: number) => {
    return (size / 1048576).toFixed(1) + " MB"; // Convert to MB and show one decimal place
  };

  return (
    <div>
      <div className="w-full  px-3">
        <div className="mt-10 text-[#000000] text-[28px] font-bold text-center">
          エージェントを作成する
        </div>
        <div className="" >
          <form className=" mt-5 lg:w-full  "   {...getRootProps()}>
            <div className="flex  items-center lg:justify-center sm:justify-around lg:gap-20 xs:gap-5 sm:gap-10">
              <svg
                width="100"
                height="146"
                viewBox="0 0 146 146"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.4"
                  cx="72.8"
                  cy="73"
                  r="70.35"
                  stroke="black"
                  stroke-width="4.9"
                  stroke-dasharray="16.8 16.8"
                />
                <g opacity="0.4">
                  <path
                    d="M80.8851 74.47C80.8851 75.0548 80.6528 75.6157 80.2393 76.0292C79.8257 76.4427 79.2649 76.675 78.6801 76.675H75.0051V80.35C75.0051 80.9348 74.7728 81.4957 74.3592 81.9092C73.9457 82.3227 73.3849 82.555 72.8001 82.555C72.2153 82.555 71.6544 82.3227 71.2409 81.9092C70.8274 81.4957 70.5951 80.9348 70.5951 80.35V76.675H66.9201C66.3353 76.675 65.7744 76.4427 65.3609 76.0292C64.9474 75.6157 64.7151 75.0548 64.7151 74.47C64.7151 73.8852 64.9474 73.3243 65.3609 72.9108C65.7744 72.4973 66.3353 72.265 66.9201 72.265H70.5951V68.59C70.5951 68.0052 70.8274 67.4443 71.2409 67.0308C71.6544 66.6173 72.2153 66.385 72.8001 66.385C73.3849 66.385 73.9457 66.6173 74.3592 67.0308C74.7728 67.4443 75.0051 68.0052 75.0051 68.59V72.265H78.6801C79.2649 72.265 79.8257 72.4973 80.2393 72.9108C80.6528 73.3243 80.8851 73.8852 80.8851 74.47ZM92.6451 64.18V84.76C92.6451 85.4357 92.512 86.1047 92.2534 86.7289C91.9949 87.3531 91.6159 87.9203 91.1381 88.3981C90.6604 88.8758 90.0932 89.2548 89.469 89.5134C88.8448 89.7719 88.1757 89.905 87.5001 89.905H58.1001C56.7355 89.905 55.4269 89.3629 54.462 88.3981C53.4971 87.4332 52.9551 86.1245 52.9551 84.76V64.18C52.9551 62.8155 53.4971 61.5068 54.462 60.5419C55.4269 59.5771 56.7355 59.035 58.1001 59.035H62.8004L64.6489 56.2622C64.9844 55.7587 65.439 55.3458 65.9724 55.0602C66.5058 54.7746 67.1015 54.6251 67.7065 54.625H77.8936C78.4987 54.6251 79.0943 54.7746 79.6277 55.0602C80.1611 55.3458 80.6157 55.7587 80.9512 56.2622L82.7998 59.035H87.5001C88.1757 59.035 88.8448 59.1681 89.469 59.4266C90.0932 59.6852 90.6604 60.0642 91.1381 60.5419C91.6159 61.0197 91.9949 61.5869 92.2534 62.2111C92.512 62.8353 92.6451 63.5043 92.6451 64.18ZM88.2351 64.18C88.2351 63.9851 88.1576 63.7981 88.0198 63.6603C87.882 63.5224 87.695 63.445 87.5001 63.445H81.6201C81.2567 63.4455 80.8987 63.3562 80.5782 63.1851C80.2576 63.0139 79.9843 62.7661 79.7826 62.4638L77.5004 59.035H68.0998L65.8176 62.4638C65.6159 62.7661 65.3426 63.0139 65.022 63.1851C64.7014 63.3562 64.3435 63.4455 63.9801 63.445H58.1001C57.9051 63.445 57.7182 63.5224 57.5804 63.6603C57.4425 63.7981 57.3651 63.9851 57.3651 64.18V84.76C57.3651 84.9549 57.4425 85.1419 57.5804 85.2797C57.7182 85.4176 57.9051 85.495 58.1001 85.495H87.5001C87.695 85.495 87.882 85.4176 88.0198 85.2797C88.1576 85.1419 88.2351 84.9549 88.2351 84.76V64.18Z"
                    fill="black"
                  />
                </g>
              </svg>
              <div className="flex flex-col gap-2">
                <div className="lg:w-[500px] sm:w-[500px] ">
                  <label className="text-[#808080] text-[15px] font-bold mr-10">
                    名前
                  </label>
                  <input
                    type="text"
                    className="border border-[#808080] rounded-lg p-2 mt-2 lg:w-[500px] sm:w-[400px]"
                  />
                </div>
                <div className="  sm:w-[500px] lg:w-[500px] ">
                  <label className="text-[#808080] text-[15px] font-bold mr-10">
                    説明
                  </label>
                  <input
                    type="text"
                    className="border border-[#808080] rounded-lg p-2 mt-2 lg:w-[500px] h-[100px] sm:w-[400px]"
                  />
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center flex-col gap-5" >
              <div className="flex flex-col sm:w-full xs:w-full lg:w-auto">
                <label className="text-[#808080] text-[18px] font-bold mr-10">
                  カスタム指示
                </label>
                <input
                  type="text"
                  placeholder="ここで入力した指示はエージェントをカスタマイズするために使用されます"
                  className="border border-[#808080] rounded-lg p-2 mt-2 lg:w-[750px] md:w-[400px] h-[70px] lg:text-[14px] sm:text-[12px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#808080] text-[18px] font-bold mr-10 mt-4">
                  ナレッジベース
                </label>
                <span className="text-[#808080] lg:text-[14px] sm:text-[12px]">
                  ここでアップロードしたファイルは、エージェントをカスタマイズして、
                  <br />
                  お客様の要件にさ らに応えるために使用されます。
                </span>
                <div className="border border-none rounded-lg px-5 py-3 mt-2 lg:w-[750px]  lg:h-[100px] bg-[#F5F5F5]  flex flex-col gap-2" >
              {!uloadedFiles.map.length?    <span className="text-[#808080] lg:text-[14px] sm:text-[12px]">
                    このスペースをタップしてファイルをアップロードするか、ドラッグアンドドロップしてください
                  </span> :
                  <div className="flex">
                  <div className="w-full flex">
          {uloadedFiles.map((file: File) => (
            <>
              <div className="border w-[180px] p-2 rounded-full flex items-center bg-[#103F91] gap-2  justify-between mb-7">
                <div className="flex gap-2 items-center">
                  <div className=" rounded-full border w-[20px] h-[20px]  flex justify-center items-center bg-[#ffffff] ">
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_124_6)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14 4.5V11H13V4.5H11C10.6022 4.5 10.2206 4.34196 9.93934 4.06066C9.65804 3.77936 9.5 3.39782 9.5 3V1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V11H2V2C2 1.46957 2.21071 0.960859 2.58579 0.585786C2.96086 0.210714 3.46957 0 4 0L9.5 0L14 4.5ZM7.161 14.188V13.666C7.16944 13.4463 7.1295 13.2275 7.044 13.025C6.97767 12.8668 6.86553 12.732 6.722 12.638C6.58134 12.5508 6.41849 12.506 6.253 12.509C6.0868 12.5065 5.92336 12.5516 5.782 12.639C5.63976 12.7335 5.52848 12.8677 5.462 13.025C5.3765 13.2275 5.33656 13.4463 5.345 13.666V14.188C5.345 14.444 5.384 14.6577 5.462 14.829C5.52831 14.9866 5.63961 15.1213 5.782 15.216C5.92442 15.3005 6.0874 15.3441 6.253 15.342C6.41793 15.3438 6.58017 15.3002 6.722 15.216C6.86538 15.1223 6.9775 14.9879 7.044 14.83C7.12812 14.6267 7.168 14.4079 7.161 14.188ZM7.964 13.672V14.185C7.964 14.5603 7.89567 14.8847 7.759 15.158C7.62958 15.4211 7.42446 15.6394 7.17 15.785C6.916 15.929 6.61033 16.001 6.253 16.001C5.93285 16.0094 5.61596 15.935 5.333 15.785C5.07815 15.6399 4.87291 15.4214 4.744 15.158C4.60057 14.8541 4.53036 14.5209 4.539 14.185V13.672C4.539 13.2927 4.60733 12.9677 4.744 12.697C4.88067 12.423 5.07733 12.214 5.334 12.07C5.59133 11.9233 5.898 11.85 6.254 11.85C6.61067 11.85 6.916 11.9233 7.17 12.07C7.42533 12.216 7.622 12.426 7.76 12.7C7.896 12.9707 7.964 13.2947 7.964 13.672ZM1 15.925V11.926H2.459C2.865 11.926 3.2 12.0043 3.464 12.161C3.728 12.3163 3.92433 12.543 4.053 12.841C4.18367 13.1377 4.249 13.4957 4.249 13.915C4.249 14.3377 4.18367 14.699 4.053 14.999C3.92167 15.2997 3.72333 15.5293 3.458 15.688C3.194 15.846 2.861 15.925 2.459 15.925H1ZM2.354 12.571H1.79V15.278H2.353C2.53767 15.278 2.69867 15.2507 2.836 15.196C2.96772 15.1431 3.08299 15.0561 3.17 14.944C3.258 14.8307 3.32333 14.69 3.366 14.522C3.41424 14.3285 3.4371 14.1294 3.434 13.93C3.434 13.63 3.39467 13.379 3.316 13.177C3.25089 12.991 3.12652 12.8315 2.962 12.723C2.804 12.6217 2.60067 12.571 2.352 12.571H2.354ZM9.11 13.687C9.11 13.4383 9.14433 13.2273 9.213 13.054C9.27232 12.8948 9.37696 12.7564 9.514 12.656C9.65378 12.561 9.82006 12.5127 9.989 12.518C10.139 12.518 10.2717 12.5503 10.387 12.615C10.5001 12.6751 10.5945 12.765 10.66 12.875C10.7297 12.9907 10.7708 13.1213 10.78 13.256H11.545V13.183C11.5384 12.9988 11.4935 12.818 11.4133 12.652C11.3331 12.4861 11.2192 12.3386 11.079 12.219C10.9357 12.0962 10.769 12.0037 10.589 11.947C10.394 11.8802 10.1891 11.8474 9.983 11.85C9.627 11.85 9.32333 11.9243 9.072 12.073C8.822 12.221 8.63167 12.432 8.501 12.706C8.36967 12.9793 8.304 13.3053 8.304 13.684V14.182C8.304 14.5607 8.36867 14.886 8.498 15.158C8.628 15.4287 8.81833 15.6377 9.069 15.785C9.319 15.929 9.62367 16.001 9.983 16.001C10.2763 16.001 10.538 15.9463 10.768 15.837C10.998 15.7277 11.1817 15.5763 11.319 15.383C11.457 15.1844 11.5354 14.9506 11.545 14.709V14.633H10.78C10.771 14.762 10.7308 14.8869 10.663 14.997C10.5958 15.1026 10.5015 15.1882 10.39 15.245C10.2649 15.3048 10.1277 15.335 9.989 15.333C9.82019 15.3378 9.65378 15.2922 9.511 15.202C9.37414 15.1042 9.27022 14.9672 9.213 14.809C9.13957 14.6083 9.10462 14.3956 9.11 14.182V13.687ZM14.202 11.927H15.096L13.821 13.933L15.075 15.925H14.167L13.317 14.51H13.282L12.43 15.925H11.568L12.808 13.91L11.58 11.926H12.512L13.344 13.365H13.379L14.202 11.927Z"
                          fill="#114091"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_124_6">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-[#ffffff] text-[10px] font-bold">
                      {file.name}
                    </span>
                    <span className="text-[#ffffff] text-[8px]">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>
                <div>
                  <svg
                    width="20"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_124_8)">
                      <path
                        d="M18.1875 6.375H15.6562V5.53125C15.6562 5.00911 15.4488 4.50835 15.0796 4.13913C14.7104 3.76992 14.2096 3.5625 13.6875 3.5625H10.3125C9.79036 3.5625 9.2896 3.76992 8.92038 4.13913C8.55117 4.50835 8.34375 5.00911 8.34375 5.53125V6.375H5.8125C5.58872 6.375 5.37411 6.46389 5.21588 6.62213C5.05764 6.78036 4.96875 6.99497 4.96875 7.21875C4.96875 7.44253 5.05764 7.65714 5.21588 7.81537C5.37411 7.97361 5.58872 8.0625 5.8125 8.0625H6.09375V17.625C6.09375 17.998 6.24191 18.3556 6.50563 18.6194C6.76935 18.8831 7.12704 19.0312 7.5 19.0312H16.5C16.873 19.0312 17.2306 18.8831 17.4944 18.6194C17.7581 18.3556 17.9062 17.998 17.9062 17.625V8.0625H18.1875C18.4113 8.0625 18.6259 7.97361 18.7841 7.81537C18.9424 7.65714 19.0312 7.44253 19.0312 7.21875C19.0312 6.99497 18.9424 6.78036 18.7841 6.62213C18.6259 6.46389 18.4113 6.375 18.1875 6.375ZM10.0312 5.53125C10.0312 5.45666 10.0609 5.38512 10.1136 5.33238C10.1664 5.27963 10.2379 5.25 10.3125 5.25H13.6875C13.7621 5.25 13.8336 5.27963 13.8864 5.33238C13.9391 5.38512 13.9688 5.45666 13.9688 5.53125V6.375H10.0312V5.53125ZM16.2188 17.3438H7.78125V8.0625H16.2188V17.3438ZM11.1562 10.3125V14.8125C11.1562 15.0363 11.0674 15.2509 10.9091 15.4091C10.7509 15.5674 10.5363 15.6562 10.3125 15.6562C10.0887 15.6562 9.87411 15.5674 9.71588 15.4091C9.55764 15.2509 9.46875 15.0363 9.46875 14.8125V10.3125C9.46875 10.0887 9.55764 9.87411 9.71588 9.71588C9.87411 9.55764 10.0887 9.46875 10.3125 9.46875C10.5363 9.46875 10.7509 9.55764 10.9091 9.71588C11.0674 9.87411 11.1562 10.0887 11.1562 10.3125ZM14.5312 10.3125V14.8125C14.5312 15.0363 14.4424 15.2509 14.2841 15.4091C14.1259 15.5674 13.9113 15.6562 13.6875 15.6562C13.4637 15.6562 13.2491 15.5674 13.0909 15.4091C12.9326 15.2509 12.8438 15.0363 12.8438 14.8125V10.3125C12.8438 10.0887 12.9326 9.87411 13.0909 9.71588C13.2491 9.55764 13.4637 9.46875 13.6875 9.46875C13.9113 9.46875 14.1259 9.55764 14.2841 9.71588C14.4424 9.87411 14.5312 10.0887 14.5312 10.3125Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_124_8"
                        x="0.96875"
                        y="0.5625"
                        width="22.0625"
                        height="23.4688"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_124_8"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_124_8"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </>
          ))}
        
        
        </div>
        <input {...getInputProps()} />
        <div className="cursor-pointer border" onClick={open} >
  <Paperclip className="text-gray-500 hover:text-gray-700" size={24} />
</div>

                  </div>}
  
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5 mr-[120px]">
              <Button className=" text-[15px] font-bold rounded-full p-2 w-[200px]">
                エージェントを作成
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentCreator;
