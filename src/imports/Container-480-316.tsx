import svgPaths from "./svg-jsi5eiabg6";

function Filter() {
  return (
    <div className="absolute left-[17.07px] size-[15.989px] top-[13.07px]" data-name="Filter">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9887 15.9887">
        <g clipPath="url(#clip0_474_7983)" id="Filter">
          <path d={svgPaths.p12ee5500} id="Vector" stroke="var(--stroke-0, #F8F9FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
        <defs>
          <clipPath id="clip0_474_7983">
            <rect fill="white" height="15.9887" width="15.9887" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#232326] h-[42.151px] relative rounded-[14px] shrink-0 w-[101.256px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#424249] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Filter />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[63.55px] not-italic text-[#f8f9fa] text-[14px] text-center top-[11.16px] whitespace-nowrap">Filters</p>
      </div>
    </div>
  );
}

function Plus() {
  return (
    <div className="absolute left-[15.99px] size-[15.989px] top-[11.99px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9887 15.9887">
        <g id="Plus">
          <path d="M3.33098 7.99436H12.6577" id="Vector" stroke="var(--stroke-0, #121214)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d="M7.99436 3.33098V12.6577" id="Vector_2" stroke="var(--stroke-0, #121214)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#feff1c] flex-[1_0_0] h-[39.98px] min-h-px min-w-px relative rounded-[14px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Plus />
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[86.96px] not-italic text-[#121214] text-[14px] text-center top-[10.07px] whitespace-nowrap">Add Attendee</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[11.987px] h-[42.151px] items-center left-[851.17px] top-0 w-[263.822px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#232326] h-[42.117px] left-0 rounded-[14px] top-0 w-[447.989px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[16px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(248,249,250,0.5)] whitespace-nowrap">Search attendees...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#424249] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Search() {
  return (
    <div className="absolute left-[11.99px] size-[17.989px] top-[12.06px]" data-name="Search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9894 17.9894">
        <g id="Search">
          <path d={svgPaths.p4ea7100} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          <path d={svgPaths.p358a6ea0} id="Vector_2" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[42.117px] left-0 top-[0.02px] w-[447.989px]" data-name="Container">
      <Input />
      <Search />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[42.151px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Span() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[64.531px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Customer</p>
      </div>
    </div>
  );
}

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronUp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronUp">
          <path d={svgPaths.p35d475c0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronDown">
          <path d={svgPaths.p3934a480} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[19.973px] relative shrink-0 w-[9.987px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronUp />
        <ChevronDown />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex gap-[3.984px] h-[19.973px] items-center left-[11.99px] top-[10px] w-[170.586px]" data-name="Container">
      <Span />
      <Container8 />
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[35.08px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Email</p>
      </div>
    </div>
  );
}

function ChevronUp1() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronUp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronUp">
          <path d={svgPaths.p35d475c0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronDown">
          <path d={svgPaths.p3934a480} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[19.973px] relative shrink-0 w-[9.987px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronUp1 />
        <ChevronDown1 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[3.984px] h-[19.973px] items-center left-[206.55px] top-[10px] w-[170.586px]" data-name="Container">
      <Span1 />
      <Container10 />
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[77.197px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Ticket Type</p>
      </div>
    </div>
  );
}

function ChevronUp2() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronUp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronUp">
          <path d={svgPaths.p35d475c0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronDown">
          <path d={svgPaths.p3934a480} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[19.973px] relative shrink-0 w-[9.987px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronUp2 />
        <ChevronDown2 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[3.984px] h-[19.973px] items-center left-[401.11px] top-[10px] w-[170.586px]" data-name="Container">
      <Span2 />
      <Container12 />
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[42.456px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Status</p>
      </div>
    </div>
  );
}

function ChevronUp3() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronUp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronUp">
          <path d={svgPaths.p35d475c0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronDown">
          <path d={svgPaths.p3934a480} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[19.973px] relative shrink-0 w-[9.987px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronUp3 />
        <ChevronDown3 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex gap-[3.984px] h-[19.973px] items-center left-[595.67px] top-[10px] w-[170.586px]" data-name="Container">
      <Span3 />
      <Container14 />
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[70.144px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Purchased</p>
      </div>
    </div>
  );
}

function ChevronUp4() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronUp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronUp">
          <path d={svgPaths.p35d475c0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="relative shrink-0 size-[9.987px]" data-name="ChevronDown">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.98659 9.98659">
        <g id="ChevronDown">
          <path d={svgPaths.p3934a480} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24832" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[19.973px] relative shrink-0 w-[9.987px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronUp4 />
        <ChevronDown4 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[3.984px] h-[19.973px] items-center left-[790.23px] top-[10px] w-[170.586px]" data-name="Container">
      <Span4 />
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[39.98px] left-[972.8px] top-0 w-[139.999px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">Actions</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#232326] h-[39.98px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container9 />
      <Container11 />
      <Container13 />
      <Container15 />
      <Container17 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[39.98px] left-0 top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">Kwame Asante</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[39.98px] left-[194.56px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#9caab8] text-[14px] top-[9.33px] whitespace-nowrap">kwame.asante@gmail.com</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[39.98px] left-[389.12px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">VIP Experience</p>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[6.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.98553 6.98553">
        <g clipPath="url(#clip0_474_8019)" id="svg">
          <path d={svgPaths.p269c3080} fill="var(--fill-0, #20CC70)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_474_8019">
            <rect fill="white" height="6.98553" width="6.98553" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[41.371px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Active</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[18.193px] items-center left-[595.67px] top-[11.87px] w-[170.586px]" data-name="Container">
      <Svg />
      <Span5 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[39.98px] left-[778.24px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">2 days ago</p>
    </div>
  );
}

function Pencil() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Pencil">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4902 16.49">
            <path d={svgPaths.p1b4bb080} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49736 4.49736">
            <path d={svgPaths.p3a45c590} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Pencil />
      </div>
    </div>
  );
}

function Trash() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Trash2">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.75px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9912 1.49912">
            <path d="M0.74956 0.74956H14.2416" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.993 13.4921">
            <path d={svgPaths.p38fbfba0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 4.49736">
            <path d={svgPaths.p35b7de00} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Trash />
      </div>
    </div>
  );
}

function FileText() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="FileText">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4921 16.4903">
            <path d={svgPaths.p2f9d9300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99648 5.99648">
            <path d={svgPaths.p2c9e6300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.99824 1.49912">
            <path d="M2.24868 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <FileText />
      </div>
    </div>
  );
}

function Send() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Send">
      <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.492 16.492">
            <path d={svgPaths.p6bf5800} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.95%_8.94%_45.47%_45.47%]" data-name="Vector">
        <div className="absolute inset-[-9.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6993 9.69855">
            <path d={svgPaths.p23910b00} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Send />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex gap-[11.987px] h-[17.989px] items-center left-[984.79px] top-[11.97px] w-[116.024px]" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container">
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container26() {
  return <div className="absolute border-[#424249] border-solid border-t-[1.085px] h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container" />;
}

function Container18() {
  return (
    <div className="h-[40.964px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container26 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[39.98px] left-0 top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">Ama Mensah</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[39.98px] left-[194.56px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#9caab8] text-[14px] top-[9.33px] whitespace-nowrap">ama.mensah@yahoo.com</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[39.98px] left-[389.12px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">General Admission</p>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[6.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.98553 6.98553">
        <g clipPath="url(#clip0_474_8019)" id="svg">
          <path d={svgPaths.p269c3080} fill="var(--fill-0, #20CC70)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_474_8019">
            <rect fill="white" height="6.98553" width="6.98553" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[41.371px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Active</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[18.193px] items-center left-[595.67px] top-[11.87px] w-[170.586px]" data-name="Container">
      <Svg1 />
      <Span6 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[39.98px] left-[778.24px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">3 days ago</p>
    </div>
  );
}

function Pencil1() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Pencil">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4902 16.49">
            <path d={svgPaths.p1b4bb080} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49736 4.49736">
            <path d={svgPaths.p3a45c590} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Pencil1 />
      </div>
    </div>
  );
}

function Trash1() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Trash2">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.75px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9912 1.49912">
            <path d="M0.74956 0.74956H14.2416" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.993 13.4921">
            <path d={svgPaths.p38fbfba0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 4.49736">
            <path d={svgPaths.p35b7de00} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Trash1 />
      </div>
    </div>
  );
}

function FileText1() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="FileText">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4921 16.4903">
            <path d={svgPaths.p2f9d9300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99648 5.99648">
            <path d={svgPaths.p2c9e6300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.99824 1.49912">
            <path d="M2.24868 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <FileText1 />
      </div>
    </div>
  );
}

function Send1() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Send">
      <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.492 16.492">
            <path d={svgPaths.p6bf5800} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.95%_8.94%_45.47%_45.47%]" data-name="Vector">
        <div className="absolute inset-[-9.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6993 9.69855">
            <path d={svgPaths.p23910b00} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Send1 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex gap-[11.987px] h-[17.989px] items-center left-[984.79px] top-[11.97px] w-[116.024px]" data-name="Container">
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container">
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container35() {
  return <div className="absolute border-[#424249] border-solid border-t-[1.085px] h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container" />;
}

function Container27() {
  return (
    <div className="h-[40.964px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container35 />
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[39.98px] left-0 top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">Kofi Osei</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute h-[39.98px] left-[194.56px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#9caab8] text-[14px] top-[9.33px] whitespace-nowrap">kofi.osei@outlook.com</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[39.98px] left-[389.12px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">General Admission</p>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[6.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.98553 6.98553">
        <g clipPath="url(#clip0_474_8019)" id="svg">
          <path d={svgPaths.p269c3080} fill="var(--fill-0, #20CC70)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_474_8019">
            <rect fill="white" height="6.98553" width="6.98553" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span7() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[41.371px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Active</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[18.193px] items-center left-[595.67px] top-[11.87px] w-[170.586px]" data-name="Container">
      <Svg2 />
      <Span7 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[39.98px] left-[778.24px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">5 days ago</p>
    </div>
  );
}

function Pencil2() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Pencil">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4902 16.49">
            <path d={svgPaths.p1b4bb080} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49736 4.49736">
            <path d={svgPaths.p3a45c590} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Pencil2 />
      </div>
    </div>
  );
}

function Trash2() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Trash2">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.75px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9912 1.49912">
            <path d="M0.74956 0.74956H14.2416" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.993 13.4921">
            <path d={svgPaths.p38fbfba0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 4.49736">
            <path d={svgPaths.p35b7de00} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Trash2 />
      </div>
    </div>
  );
}

function FileText2() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="FileText">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4921 16.4903">
            <path d={svgPaths.p2f9d9300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99648 5.99648">
            <path d={svgPaths.p2c9e6300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.99824 1.49912">
            <path d="M2.24868 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <FileText2 />
      </div>
    </div>
  );
}

function Send2() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Send">
      <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.492 16.492">
            <path d={svgPaths.p6bf5800} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.95%_8.94%_45.47%_45.47%]" data-name="Vector">
        <div className="absolute inset-[-9.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6993 9.69855">
            <path d={svgPaths.p23910b00} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Send2 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex gap-[11.987px] h-[17.989px] items-center left-[984.79px] top-[11.97px] w-[116.024px]" data-name="Container">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container">
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container44() {
  return <div className="absolute border-[#424249] border-solid border-t-[1.085px] h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container" />;
}

function Container36() {
  return (
    <div className="h-[40.964px] relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Container44 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute h-[39.98px] left-0 top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">Akosua Boateng</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[39.98px] left-[194.56px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#9caab8] text-[14px] top-[9.33px] whitespace-nowrap">akosua.b@gmail.com</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[39.98px] left-[389.12px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">Early Bird</p>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[6.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.98553 6.98553">
        <g clipPath="url(#clip0_474_8019)" id="svg">
          <path d={svgPaths.p269c3080} fill="var(--fill-0, #20CC70)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_474_8019">
            <rect fill="white" height="6.98553" width="6.98553" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[41.371px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Active</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[18.193px] items-center left-[595.67px] top-[11.87px] w-[170.586px]" data-name="Container">
      <Svg3 />
      <Span8 />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute h-[39.98px] left-[778.24px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">1 week ago</p>
    </div>
  );
}

function Pencil3() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Pencil">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4902 16.49">
            <path d={svgPaths.p1b4bb080} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49736 4.49736">
            <path d={svgPaths.p3a45c590} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Pencil3 />
      </div>
    </div>
  );
}

function Trash3() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Trash2">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.75px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9912 1.49912">
            <path d="M0.74956 0.74956H14.2416" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.993 13.4921">
            <path d={svgPaths.p38fbfba0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 4.49736">
            <path d={svgPaths.p35b7de00} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Trash3 />
      </div>
    </div>
  );
}

function FileText3() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="FileText">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4921 16.4903">
            <path d={svgPaths.p2f9d9300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99648 5.99648">
            <path d={svgPaths.p2c9e6300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.99824 1.49912">
            <path d="M2.24868 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <FileText3 />
      </div>
    </div>
  );
}

function Send3() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Send">
      <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.492 16.492">
            <path d={svgPaths.p6bf5800} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.95%_8.94%_45.47%_45.47%]" data-name="Vector">
        <div className="absolute inset-[-9.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6993 9.69855">
            <path d={svgPaths.p23910b00} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Send3 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex gap-[11.987px] h-[17.989px] items-center left-[984.79px] top-[11.97px] w-[116.024px]" data-name="Container">
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container">
      <Container47 />
      <Container48 />
      <Container49 />
      <Container50 />
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container53() {
  return <div className="absolute border-[#424249] border-solid border-t-[1.085px] h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container" />;
}

function Container45() {
  return (
    <div className="h-[40.964px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container53 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute h-[39.98px] left-0 top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">Yaw Adjei</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute h-[39.98px] left-[194.56px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#9caab8] text-[14px] top-[9.33px] whitespace-nowrap">yaw.adjei@yahoo.com</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[39.98px] left-[389.12px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">VIP Experience</p>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[6.986px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.98553 6.98553">
        <g clipPath="url(#clip0_474_8019)" id="svg">
          <path d={svgPaths.p269c3080} fill="var(--fill-0, #20CC70)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_474_8019">
            <rect fill="white" height="6.98553" width="6.98553" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[41.371px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#f8f9fa] text-[14px] whitespace-nowrap">Active</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex gap-[7.986px] h-[18.193px] items-center left-[595.67px] top-[11.87px] w-[170.586px]" data-name="Container">
      <Svg4 />
      <Span9 />
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute h-[39.98px] left-[778.24px] top-[0.98px] w-[194.561px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-[11.99px] not-italic text-[#f8f9fa] text-[14px] top-[9.33px] whitespace-nowrap">1 week ago</p>
    </div>
  );
}

function Pencil4() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Pencil">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4902 16.49">
            <path d={svgPaths.p1b4bb080} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.49736 4.49736">
            <path d={svgPaths.p3a45c590} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Pencil4 />
      </div>
    </div>
  );
}

function Trash4() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Trash2">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.75px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9912 1.49912">
            <path d="M0.74956 0.74956H14.2416" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.993 13.4921">
            <path d={svgPaths.p38fbfba0} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 4.49736">
            <path d={svgPaths.p35b7de00} id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.49912 5.99648">
            <path d="M0.74956 0.74956V5.24692" id="Vector" stroke="var(--stroke-0, #767686)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Trash4 />
      </div>
    </div>
  );
}

function FileText4() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="FileText">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4921 16.4903">
            <path d={svgPaths.p2f9d9300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.99648 5.99648">
            <path d={svgPaths.p2c9e6300} id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.99824 1.49912">
            <path d="M2.24868 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.75px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.4956 1.49912">
            <path d="M6.74604 0.74956H0.74956" id="Vector" stroke="var(--stroke-0, #FEFF1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <FileText4 />
      </div>
    </div>
  );
}

function Send4() {
  return (
    <div className="h-[17.989px] overflow-clip relative shrink-0 w-full" data-name="Send">
      <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.492 16.492">
            <path d={svgPaths.p6bf5800} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.95%_8.94%_45.47%_45.47%]" data-name="Vector">
        <div className="absolute inset-[-9.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6993 9.69855">
            <path d={svgPaths.p23910b00} id="Vector" stroke="var(--stroke-0, #20CC70)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49912" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative shrink-0 size-[17.989px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Send4 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex gap-[11.987px] h-[17.989px] items-center left-[984.79px] top-[11.97px] w-[116.024px]" data-name="Container">
      <Button18 />
      <Button19 />
      <Button20 />
      <Button21 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container">
      <Container56 />
      <Container57 />
      <Container58 />
      <Container59 />
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container62() {
  return <div className="absolute border-[#424249] border-solid border-t-[1.085px] h-[40.964px] left-0 top-0 w-[1112.818px]" data-name="Container" />;
}

function Container54() {
  return (
    <div className="h-[40.964px] relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Container62 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col h-[244.799px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container18 />
      <Container27 />
      <Container36 />
      <Container45 />
      <Container54 />
    </div>
  );
}

function P() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[148.341px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#9caab8] text-[14px] whitespace-nowrap">1-05 of 450 attendees</p>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="h-[9.987px] relative shrink-0 w-[10.987px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.9869 9.98659">
        <g clipPath="url(#clip0_474_7998)" id="svg">
          <path d={svgPaths.p3963880} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17686" />
          <path d={svgPaths.p2a894b00} id="Vector_2" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17686" />
        </g>
        <defs>
          <clipPath id="clip0_474_7998">
            <rect fill="white" height="9.98659" width="10.9869" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="opacity-40 relative rounded-[6px] size-[28px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#9caab8] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.102px] pr-[1.085px] py-[1.085px] relative size-full">
        <Svg5 />
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="h-[9.987px] relative shrink-0 w-[4.985px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.98482 9.98659">
        <g clipPath="url(#clip0_474_7948)" id="svg">
          <path d={svgPaths.p19f33300} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11455" />
        </g>
        <defs>
          <clipPath id="clip0_474_7948">
            <rect fill="white" height="9.98659" width="4.98482" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="opacity-40 relative rounded-[6px] size-[28px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#9caab8] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.102px] pr-[1.085px] py-[1.085px] relative size-full">
        <Svg6 />
      </div>
    </div>
  );
}

function Button24() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[27.993px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#feff1c] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[1.085px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#9caab8] text-[14px] text-center whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[27.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#9caab8] text-[14px] text-center whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Button26() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[27.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#9caab8] text-[14px] text-center whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Button27() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[27.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#9caab8] text-[14px] text-center whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Button28() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[27.993px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#9caab8] text-[14px] text-center whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="h-[9.987px] relative shrink-0 w-[4.985px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.98482 9.98659">
        <g clipPath="url(#clip0_474_7948)" id="svg">
          <path d={svgPaths.p19f33300} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11455" />
        </g>
        <defs>
          <clipPath id="clip0_474_7948">
            <rect fill="white" height="9.98659" width="4.98482" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button29() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[27.993px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#9caab8] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.085px] pr-[1.102px] py-[1.085px] relative size-full">
        <Svg7 />
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="h-[9.987px] relative shrink-0 w-[10.987px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.9869 9.98659">
        <g clipPath="url(#clip0_474_7998)" id="svg">
          <path d={svgPaths.p3963880} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17686" />
          <path d={svgPaths.p2a894b00} id="Vector_2" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17686" />
        </g>
        <defs>
          <clipPath id="clip0_474_7998">
            <rect fill="white" height="9.98659" width="10.9869" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button30() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[27.993px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#9caab8] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[1.085px] pr-[1.102px] py-[1.085px] relative size-full">
        <Svg8 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[27.993px] relative shrink-0 w-[315.824px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center relative size-full">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <Button22 />
          </div>
        </div>
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-180">
            <Button23 />
          </div>
        </div>
        <Button24 />
        <Button25 />
        <Button26 />
        <Button27 />
        <Button28 />
        <Button29 />
        <Button30 />
      </div>
    </div>
  );
}

function Span10() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[8.698px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#9caab8] text-[14px] text-center whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="h-[9.987px] relative w-[4.985px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.98482 9.98659">
        <g clipPath="url(#clip0_474_7945)" id="svg">
          <path d={svgPaths.p14992760} id="Vector" stroke="var(--stroke-0, #9CAAB8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11455" />
        </g>
        <defs>
          <clipPath id="clip0_474_7945">
            <rect fill="white" height="9.98659" width="4.98482" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button31() {
  return (
    <div className="h-[27.993px] relative rounded-[6px] shrink-0 w-[49.984px]" data-name="button">
      <div aria-hidden="true" className="absolute border-[#9caab8] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.484px] items-center justify-center pl-[3.586px] pr-[1.085px] py-[1.085px] relative size-full">
        <Span10 />
        <div className="flex h-[4.985px] items-center justify-center relative shrink-0 w-[9.987px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
          <div className="flex-none rotate-90">
            <Svg9 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Span11() {
  return (
    <div className="h-[18.193px] relative shrink-0 w-[117.025px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] not-italic relative shrink-0 text-[#9caab8] text-[14px] tracking-[0.35px] uppercase whitespace-nowrap">Items per Page</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[27.993px] relative shrink-0 w-[174.994px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center relative size-full">
        <Button31 />
        <Span11 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[59.97px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[23.992px] relative size-full">
          <P />
          <Container64 />
          <Container65 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#121214] h-[306.939px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.085px] relative size-full">
          <Container5 />
          <Container63 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#424249] border-[1.085px] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[23.992px] items-start relative size-full" data-name="Container">
      <Container1 />
      <Container4 />
    </div>
  );
}