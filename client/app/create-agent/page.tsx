import AudioFIle from "@/components/AudioFile";
import PdfFile from "@/components/PdfFile";

const CreateAgentPage = () => {
  return (
    <div className="w-full  ">
      <div className="mt-10 text-[#000000] text-[28px] font-bold text-center">
        エージェントを作成する
      </div>
      <div className="">
        <form className=" mt-5 lg:w-[1000px] ">
          <div className="flex  items-center justify-center gap-20">
            <svg
              width="100"
              height="146"
              viewBox="0 0 146 146"
              fill="none"
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
              <div className="">
                <label className="text-[#808080] text-[15px] font-bold mr-10">
                  名前
                </label>
                <input
                  type="text"
                  className="border border-[#808080] rounded-lg p-2 mt-2 lg:w-[500px]"
                />
              </div>
              <div className="flex">
                <label className="text-[#808080] text-[15px] font-bold mr-10">
                  説明
                </label>
                <input
                  type="text"
                  className="border border-[#808080] rounded-lg p-2 mt-2 lg:w-[500px] h-[100px]"
                />
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-center flex-col gap-5">
            <div className="flex flex-col sm:w-full lg:w-auto">
              <label className="text-[#808080] text-[15px] font-bold mr-10">
                カスタム指示
              </label>
              <input
                type="text"
                placeholder="ここで入力した指示はエージェントをカスタマイズするために使用されます"
                className="border border-[#808080] rounded-lg p-2 mt-2 lg:w-[750px] md:w-[400px] h-[70px] lg:text-[14px] sm:text-[12px]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#808080] text-[15px] font-bold mr-10">
                ナレッジベース
              </label>
              <span className="text-[#808080] lg:text-[14px] sm:text-[12px]">
                ここでアップロードしたファイルは、エージェントをカスタマイズして、
                <br />
                お客様の要件にさ らに応えるために使用されます。
              </span>
              <div className="border border-none rounded-lg px-5 py-3 mt-2 lg:w-[750px] h-[100px] bg-[#F5F5F5]  flex flex-col gap-2">
                <span className="text-[#808080] lg:text-[14px] sm:text-[12px]">
                  このスペースをタップしてファイルをアップロードするか、ドラッグアンドドロップしてください
                </span>
<div className="flex" >      

<PdfFile />
<AudioFIle />
                </div>
 
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5 mr-[120px]">
            <button className="bg-[#000000] text-[#ffffff] text-[15px] font-bold rounded-full p-2 w-[200px]">
              エージェントを作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateAgentPage;
