import EmpHandbook from "../imports/EmpHandbook";
import { SpFxInstructions } from "./components/SpFxInstructions";
import { CursorGuide } from "./components/CursorGuide";
import { useState } from "react";

export default function App() {
  const [tab, setTab] = useState<"spfx" | "cursor">("cursor");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Browser chrome bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-sm text-gray-500 font-mono">SharePoint Page Preview</span>
      </div>

      {/* Component preview */}
      <div className="overflow-x-auto bg-white border-b border-gray-200 shadow-sm">
        <EmpHandbook />
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-gray-200 px-6 flex gap-1 pt-3">
        <button
          onClick={() => setTab("cursor")}
          className={`px-5 py-2 text-sm rounded-t-lg border-b-2 transition-colors ${
            tab === "cursor"
              ? "border-purple-600 text-purple-700 bg-purple-50 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          ✦ Cursor Guide & Prompt
        </button>
        <button
          onClick={() => setTab("spfx")}
          className={`px-5 py-2 text-sm rounded-t-lg border-b-2 transition-colors ${
            tab === "spfx"
              ? "border-blue-600 text-blue-700 bg-blue-50 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          📋 Full Manual SPFx Steps
        </button>
      </div>

      {/* Tab content */}
      {tab === "cursor" ? <CursorGuide /> : <SpFxInstructions />}
    </div>
  );
}