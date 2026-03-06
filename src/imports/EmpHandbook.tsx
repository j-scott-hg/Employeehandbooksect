import imgCaTile3 from "figma:asset/4f2c38e9d9bce1400a80ca82e9bb566af7537b72.png";
import imgUkTile22 from "figma:asset/6a9b47a8c704f9e0982237be8ef5a304e7843245.png";
import imgUsTile22 from "figma:asset/9fe5ee639dad13bf05306691d2416bc4c29a0046.png";
import imgEmpHandbookHeaderV21 from "figma:asset/6b90ece8af816f458cd789242e3c27eaffb45aed.png";
import { useState } from "react";

function CaTile({ className }: { className?: string }) {
  const [pressed, setPressed] = useState(false);
  const isDefault = !pressed;
  return (
    <button
      className={className || `relative w-[316px] ${isDefault ? "h-[365px]" : "h-[370px]"} cursor-pointer`}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <img
        alt="Canada Employee Handbook"
        className="absolute inset-0 max-w-none object-cover rounded-[40px] size-full"
        src={imgCaTile3}
      />
      <div
        aria-hidden="true"
        className={`absolute border border-[rgba(0,0,0,0.5)] border-solid inset-[-1px] rounded-[41px] transition-shadow duration-75 ${
          isDefault ? "shadow-[4px_4px_10px_2px_rgba(0,0,0,0.25)]" : ""
        }`}
      />
    </button>
  );
}

function UkTile({ className }: { className?: string }) {
  const [pressed, setPressed] = useState(false);
  const isDefault = !pressed;
  return (
    <button
      className={className || "block cursor-pointer h-[370px] relative w-[330px]"}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <div className="absolute inset-0 rounded-[40px] overflow-hidden">
        <img
          alt="UK Employee Handbook"
          className="absolute h-[100.12%] left-0 max-w-none top-[-0.06%] w-full"
          src={imgUkTile22}
        />
      </div>
      <div
        aria-hidden="true"
        className={`absolute border border-[rgba(0,0,0,0.5)] border-solid inset-[-1px] rounded-[41px] transition-shadow duration-75 ${
          isDefault ? "shadow-[4px_4px_10px_2px_rgba(0,0,0,0.25)]" : ""
        }`}
      />
    </button>
  );
}

function UsTile({ className }: { className?: string }) {
  const [pressed, setPressed] = useState(false);
  const isDefault = !pressed;
  return (
    <button
      className={className || "block cursor-pointer h-[371px] relative w-[316px]"}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <img
        alt="US Employee Handbook"
        className="absolute inset-0 max-w-none object-cover rounded-[40px] size-full"
        src={imgUsTile22}
      />
      <div
        aria-hidden="true"
        className={`absolute border border-[rgba(0,0,0,0.5)] border-solid inset-[-1px] rounded-[41px] transition-shadow duration-75 ${
          isDefault ? "shadow-[4px_4px_10px_2px_rgba(0,0,0,0.25)]" : ""
        }`}
      />
    </button>
  );
}

export default function EmpHandbook({ className }: { className?: string }) {
  return (
    <div
      className={className || "bg-white w-full flex flex-col gap-[26px] items-center justify-center py-[46px] px-6"}
      data-name="EMP-HANDBOOK"
    >
      <div className="flex flex-col items-center w-full max-w-[1280px]" data-name="Auto Layout Vertical">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <div className="h-[81px] relative shrink-0 w-[743px]" data-name="EMP-HANDBOOK-HEADER-V2 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgEmpHandbookHeaderV21} />
          </div>
          <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[#8ca2c0] text-[20px] tracking-[0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            Explore the interactive handbook for your region to learn about company policies, benefits, and workplace guidelines.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap h-auto items-center justify-center gap-6 w-full max-w-[1280px]" data-name="Auto Layout Horizontal">
        <UsTile className="block cursor-pointer h-[371px] relative shrink-0 w-[316px]" />
        <UkTile className="block cursor-pointer h-[370px] relative shrink-0 w-[330px]" />
        <CaTile className="h-[370px] relative shrink-0 w-[316px]" />
      </div>
    </div>
  );
}