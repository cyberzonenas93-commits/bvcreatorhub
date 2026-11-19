import svgPaths from "./svg-6d7t9gd491";

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
        <p className="leading-[18.2px]">Processing</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">Delivered</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">Canceled</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#232326] content-stretch flex items-center p-[4px] relative rounded-[12px] shrink-0">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function Depth8Frame() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Depth 8, Frame 0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_48_2301)" id="Depth 8, Frame 0">
          <path clipRule="evenodd" d={svgPaths.p38201680} fill="var(--fill-0, #9CAAB8)" fillRule="evenodd" id="Vector - 0" />
        </g>
        <defs>
          <clipPath id="clip0_48_2301">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Depth6Frame() {
  return (
    <div className="bg-[#232326] content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[316px]" data-name="Depth 6, Frame 1">
      <Depth8Frame />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9caab8] text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">{`Search `}</p>
      </div>
    </div>
  );
}

function Export() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Export">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_48_2295)" id="Export">
          <g id="Vector" />
          <path d={svgPaths.p1c264280} id="Vector_2" stroke="var(--stroke-0, #F8F9FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5.5 4L8 1.5L10.5 4" id="Vector_3" stroke="var(--stroke-0, #F8F9FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M8 1.5V8.5" id="Vector_4" stroke="var(--stroke-0, #F8F9FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_48_2295">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#767686] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Kamerik205:Regular_3',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">Export</p>
      </div>
      <Export />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_48_2304)" id="Plus">
          <g id="Vector" />
          <path d="M2.5 8H13.5" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M8 2.5V13.5" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_48_2304">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#feff1c] content-stretch flex gap-[8px] items-start px-[16px] py-[8px] relative rounded-[8px] shrink-0">
      <Plus />
      <div className="flex flex-col font-['Kamerik205:Regular_3',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121214] text-[14px] whitespace-nowrap">
        <p className="leading-[18.2px]">Create Order</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Depth6Frame />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full">
      <Frame7 />
      <Frame8 />
    </div>
  );
}