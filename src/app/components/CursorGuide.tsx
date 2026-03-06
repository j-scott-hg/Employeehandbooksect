import { useState } from "react";
import {
  Copy,
  Check,
  GitBranch,
  Terminal,
  Package,
  Image,
  Sparkles,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

interface PrereqStepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function PrereqStep({ number, icon, title, children, defaultOpen = false }: PrereqStepProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
          {number}
        </div>
        <span className="text-indigo-600 flex-shrink-0">{icon}</span>
        <span className="font-semibold text-gray-800 flex-1">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 bg-white border-t border-gray-100 text-sm text-gray-700 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function CodeSnip({ code }: { code: string }) {
  return (
    <pre className="bg-gray-900 text-green-300 text-xs rounded-lg p-3 overflow-x-auto leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

const CURSOR_PROMPT = `I have a React component called EmployeeHandbook that I want to convert into a SharePoint Framework (SPFx) web part. I have already scaffolded the SPFx project using the Yeoman generator with the following settings:
- Solution name: emp-handbook-webpart
- Target: SharePoint Online only
- Component type: WebPart
- Web part name: EmployeeHandbook
- Framework: React

The React component and all 4 PNG tile images (us-tile.png, uk-tile.png, ca-tile.png, emp-handbook-header.png) are already in this repository. Please help me do all of the following:

---

1. TAILWIND CSS SETUP
Install Tailwind CSS as a PostCSS plugin and configure it for the SPFx project:
- Run: npm install -D tailwindcss postcss autoprefixer
- Run: npx tailwindcss init
- Create tailwind.config.js with content: ["./src/**/*.{ts,tsx}"]
- Create src/webparts/employeeHandbook/styles/tailwind.css with the three @tailwind directives
- Add a "tw" script to package.json:
  "tw": "tailwindcss -i ./src/webparts/employeeHandbook/styles/tailwind.css -o ./src/webparts/employeeHandbook/styles/tailwind.output.css --minify"
- Add a "build" script that runs tw first, then gulp bundle --ship

---

2. COPY AND ADAPT THE COMPONENT
Copy EmployeeHandbook.tsx from the repository root into src/webparts/employeeHandbook/components/EmployeeHandbook.tsx.

The component currently imports images using the Figma Make virtual module scheme (figma:asset/). Replace ALL of those imports with standard relative paths pointing to the assets folder:

BEFORE:
import imgCaTile3 from "figma:asset/4f2c38e9d9bce1400a80ca82e9bb566af7537b72.png";
import imgUkTile22 from "figma:asset/6a9b47a8c704f9e0982237be8ef5a304e7843245.png";
import imgUsTile22 from "figma:asset/9fe5ee639dad13bf05306691d2416bc4c29a0046.png";
import imgEmpHandbookHeaderV21 from "figma:asset/6b90ece8af816f458cd789242e3c27eaffb45aed.png";

AFTER:
import imgCaTile3 from "../assets/ca-tile.png";
import imgUkTile22 from "../assets/uk-tile.png";
import imgUsTile22 from "../assets/us-tile.png";
import imgEmpHandbookHeaderV21 from "../assets/emp-handbook-header.png";

Also add this import at the top of the component file:
import '../styles/tailwind.output.css';

The component uses React useState — make sure "import { useState } from 'react'" is present.

---

3. COPY IMAGE ASSETS
Copy the four PNG files from the repository root into:
src/webparts/employeeHandbook/assets/
  - us-tile.png
  - uk-tile.png
  - ca-tile.png
  - emp-handbook-header.png

---

4. WEB PART ENTRY POINT
Replace the contents of src/webparts/employeeHandbook/EmployeeHandbookWebPart.ts with the following:

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import EmpHandbook from './components/EmployeeHandbook';

export default class EmployeeHandbookWebPart extends BaseClientSideWebPart<{}> {
  public render(): void {
    const element = React.createElement(EmpHandbook);
    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}

---

5. WEB PART MANIFEST
In EmployeeHandbookWebPart.manifest.json, update the preconfiguredEntries block:
- title: "Employee Handbook"
- description: "Links to the US, UK, and Canada employee handbooks."
- officeFabricIconFontName: "BookAnswers"

---

6. VERIFY THE BUILD
After making all changes, run the following and confirm no errors:
npm run tw
gulp build

Then run gulp serve and tell me the workbench URL to open for local testing.`;

export function CursorGuide() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

      {/* ── Section 1: Centering fix callout ── */}
      <div className="p-5 bg-green-50 border border-green-200 rounded-xl flex gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-green-800">
          <p className="font-semibold mb-1">Centering fixed ✓</p>
          <p>
            The component previously had a hard-coded <code className="bg-green-100 px-1 rounded">w-[1353px]</code> and <code className="bg-green-100 px-1 rounded">items-start</code> — the tiles would have appeared left-aligned and potentially overflowed the web part zone. The layout has been updated to <code className="bg-green-100 px-1 rounded">w-full</code> with <code className="bg-green-100 px-1 rounded">items-center</code> and a <code className="bg-green-100 px-1 rounded">max-w-[1130px]</code> cap, so the tiles will now be centered inside the web part regardless of the SharePoint column width.
          </p>
        </div>
      </div>

      {/* ── Section 2: Pre-requisites ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg text-gray-900" style={{ fontWeight: 700 }}>Steps to complete BEFORE running Cursor</h2>
            <p className="text-sm text-gray-500">Complete all 4 of these first — Cursor needs this foundation in place.</p>
          </div>
        </div>

        <div className="space-y-3">

          <PrereqStep number={1} icon={<Terminal className="w-4 h-4" />} title="Install your development environment" defaultOpen={true}>
            <p>Make sure you have the following installed on your machine before anything else:</p>
            <ul className="space-y-1.5 ml-2">
              {[
                "Node.js v18.x LTS — download from nodejs.org",
                "npm 9+ (comes with Node) or pnpm",
                "Git — download from git-scm.com",
                "Cursor — download from cursor.com",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-2">Then install the SPFx global toolchain:</p>
            <CodeSnip code={`npm install -g yo @microsoft/generator-sharepoint gulp-cli`} />
          </PrereqStep>

          <PrereqStep number={2} icon={<Image className="w-4 h-4" />} title="Export your 4 tile images from Figma">
            <p>The component uses 4 raster images that must be exported from Figma as PNGs and saved into your GitHub repo root before cloning.</p>
            <div className="space-y-2">
              {[
                { figma: "CA-TILE 3 (or CA-TILE 2)", save: "ca-tile.png" },
                { figma: "UK-TILE-2 1", save: "uk-tile.png" },
                { figma: "US-TILE-2 1", save: "us-tile.png" },
                { figma: "EMP-HANDBOOK-HEADER-V2 1", save: "emp-handbook-header.png" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-gray-500 text-xs w-48 flex-shrink-0">Figma layer: <code className="text-gray-700">{row.figma}</code></span>
                  <span className="text-gray-400">→</span>
                  <code className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-xs">{row.save}</code>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              In Figma: select the frame → right-click → <strong>Export</strong> → set format to <strong>PNG</strong> → Export. Use the exact filenames above — the Cursor prompt references them.
            </div>
          </PrereqStep>

          <PrereqStep number={3} icon={<GitBranch className="w-4 h-4" />} title="Upload to GitHub & scaffold the SPFx project">
            <p>Push your repo to GitHub (with the 4 PNG files included), then clone it locally and scaffold the SPFx project <strong>inside that repo folder</strong>:</p>
            <CodeSnip code={`# Clone your repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# Scaffold the SPFx web part INTO the repo
yo @microsoft/sharepoint`} />
            <p className="mt-2">Use these exact answers when the generator prompts you:</p>
            <div className="space-y-1.5 text-xs">
              {[
                { prompt: "Solution name", value: "emp-handbook-webpart" },
                { prompt: "Target environment", value: "SharePoint Online only (latest)" },
                { prompt: "Place files in subfolder", value: "No" },
                { prompt: "Allow tenant admin to deploy globally", value: "Yes" },
                { prompt: "Type of component", value: "WebPart" },
                { prompt: "Web part name", value: "EmployeeHandbook" },
                { prompt: "Framework", value: "React" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-1.5">
                  <span className="text-gray-500 w-52 flex-shrink-0">{row.prompt}:</span>
                  <code className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">{row.value}</code>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">After scaffolding, you will have a full SPFx folder structure inside your cloned repo. Commit this scaffolded structure before opening Cursor.</p>
          </PrereqStep>

          <PrereqStep number={4} icon={<Package className="w-4 h-4" />} title="Open the repo in Cursor">
            <p>Open your cloned repo folder in Cursor:</p>
            <CodeSnip code={`# From inside the repo folder
cursor .`} />
            <p>Or use <strong>File → Open Folder</strong> from inside Cursor and select the repo folder. Once open, paste the prompt below into the Cursor chat (Agent mode recommended).</p>
          </PrereqStep>

        </div>
      </div>

      {/* ── Section 3: The Cursor Prompt ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg text-gray-900" style={{ fontWeight: 700 }}>Your Cursor Prompt</h2>
            <p className="text-sm text-gray-500">Copy this entire prompt and paste it into Cursor's Agent chat.</p>
          </div>
          <CopyButton text={CURSOR_PROMPT} label="Copy Prompt" />
        </div>

        <div className="relative border border-purple-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-purple-700">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span className="text-purple-100 text-xs font-mono">Cursor Agent Prompt — paste this into chat</span>
            </div>
            <CopyButton text={CURSOR_PROMPT} label="Copy" />
          </div>
          <pre className="bg-gray-950 text-gray-200 text-xs p-5 overflow-x-auto leading-relaxed whitespace-pre-wrap max-h-[480px] overflow-y-auto">
            {CURSOR_PROMPT}
          </pre>
        </div>

        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-xl text-sm text-purple-800 space-y-1.5">
          <p className="font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4" /> Tips for using this prompt in Cursor</p>
          <ul className="space-y-1 text-xs">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-purple-500" /> Use <strong>Agent mode</strong> (not Ask or Edit) — it can run terminal commands and create/edit files automatically.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-purple-500" /> If Cursor asks which model to use, <strong>Claude Sonnet</strong> or <strong>GPT-4o</strong> work best for SPFx tasks.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-purple-500" /> Once Cursor finishes, run <code className="bg-purple-100 px-1 rounded">gulp serve</code> yourself and open the workbench URL to verify before packaging.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-purple-500" /> When ready to deploy, tell Cursor: <em>"Run gulp bundle --ship and gulp package-solution --ship and tell me where the .sppkg file is."</em></li>
          </ul>
        </div>
      </div>

    </div>
  );
}
