function Frame() {
  return (
    <div className="bg-[#424249] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">All</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">Upcoming</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">Ended</p>
      </div>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="bg-[#232326] content-stretch flex items-center p-[4px] relative rounded-[12px] size-full">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}