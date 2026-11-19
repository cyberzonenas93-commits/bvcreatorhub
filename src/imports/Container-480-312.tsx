function Button() {
  return (
    <div className="absolute h-[31.994px] left-0 top-[7.99px] w-[73.416px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[37.48px] not-italic text-[#9caab8] text-[14px] text-center top-[0.09px] whitespace-nowrap">Overview</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[31.994px] left-[105.41px] top-[7.99px] w-[55.138px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[27.98px] not-italic text-[#9caab8] text-[14px] text-center top-[0.09px] whitespace-nowrap">Orders</p>
    </div>
  );
}

function Div() {
  return <div className="absolute bg-[#feff1c] h-[1.984px] left-0 top-[30.01px] w-[79.316px]" data-name="div" />;
}

function Button2() {
  return (
    <div className="absolute h-[31.994px] left-[192.54px] top-[7.99px] w-[79.316px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[39.98px] not-italic text-[#f8f9fa] text-[14px] text-center top-[0.09px] whitespace-nowrap">Attendees</p>
      <Div />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[31.994px] left-[303.85px] top-[7.99px] w-[58.75px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[28.98px] not-italic text-[#9caab8] text-[14px] text-center top-[0.09px] whitespace-nowrap">Tickets</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[31.994px] left-[394.6px] top-[7.99px] w-[60.106px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[30.48px] not-italic text-[#9caab8] text-[14px] text-center top-[0.09px] whitespace-nowrap">Waitlist</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[31.994px] left-[486.7px] top-[7.99px] w-[70.907px]" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[34.98px] not-italic text-[#9caab8] text-[14px] text-center top-[0.09px] whitespace-nowrap">Check-In</p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="border-[#424249] border-b-[1.085px] border-solid relative size-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}