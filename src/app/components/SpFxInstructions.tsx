import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Terminal,
  FileCode2,
  Package,
  Upload,
  Settings,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  BookOpen,
  FolderOpen,
  Layers,
} from "lucide-react";

interface StepProps {
  number: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Step({ number, title, icon, children, defaultOpen = false }: StepProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          {number}
        </div>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-blue-600">{icon}</span>
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 bg-white border-t border-gray-100 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

function CodeBlock({ code, language = "bash", label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      {label && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-xs font-mono">
          <span>{label}</span>
          <button
            onClick={copy}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      {!label && (
        <div className="flex justify-end px-3 py-1.5 bg-gray-800">
          <button
            onClick={copy}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <pre className="bg-gray-900 text-green-300 text-sm p-4 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function InfoBox({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "success" }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-green-50 border-green-200 text-green-800",
  };
  const icons = {
    info: <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
    warning: <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />,
  };
  return (
    <div className={`flex gap-3 p-4 rounded-lg border text-sm ${styles[type]}`}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
}

function FileTree({ items }: { items: { name: string; indent?: number; highlight?: boolean; description?: string }[] }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-1">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-start gap-2 ${item.highlight ? "text-yellow-300" : "text-gray-300"}`}
          style={{ paddingLeft: `${(item.indent || 0) * 16}px` }}
        >
          <span className="flex-shrink-0">{item.name}</span>
          {item.description && (
            <span className="text-gray-500 text-xs mt-0.5">← {item.description}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function SpFxInstructions() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>
            Converting to a SharePoint Framework (SPFx) Web Part
          </h1>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Follow these steps to package your <strong>Employee Handbook</strong> React component as a deployable SPFx web part that can be dropped onto any SharePoint modern page.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span className="font-semibold text-amber-800">Prerequisites</span>
        </div>
        <ul className="space-y-1.5 text-sm text-amber-800">
          {[
            "Node.js v18.x LTS (required by SPFx 1.18+)",
            "npm 9+ or pnpm",
            "A Microsoft 365 tenant with SharePoint Online",
            "Site Collection App Catalog (or Tenant App Catalog) access",
            "Yeoman generator for SharePoint: npm install -g yo @microsoft/generator-sharepoint",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {/* Step 1 */}
        <Step number={1} title="Scaffold a new SPFx project" icon={<Terminal className="w-4 h-4" />} defaultOpen={true}>
          <p className="text-sm text-gray-600">
            Run the Yeoman generator in a new folder to create the SPFx project scaffold.
          </p>
          <CodeBlock
            label="Terminal"
            code={`mkdir emp-handbook-webpart && cd emp-handbook-webpart
yo @microsoft/sharepoint`}
          />
          <p className="text-sm text-gray-600 mt-2">When prompted by the generator, use these settings:</p>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {[
              { prompt: "Solution name", value: "emp-handbook-webpart" },
              { prompt: "Target environment", value: "SharePoint Online only (latest)" },
              { prompt: "Place files in subfolder", value: "No" },
              { prompt: "Allow tenant admin to deploy", value: "Yes" },
              { prompt: "Type of component", value: "WebPart" },
              { prompt: "Web part name", value: "EmployeeHandbook" },
              { prompt: "Framework", value: "React" },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200">
                <span className="text-gray-500 w-48 flex-shrink-0">{row.prompt}:</span>
                <code className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs">{row.value}</code>
              </div>
            ))}
          </div>
        </Step>

        {/* Step 2 */}
        <Step number={2} title="Install Tailwind CSS in the SPFx project" icon={<Settings className="w-4 h-4" />}>
          <p className="text-sm text-gray-600">
            Your component uses Tailwind utility classes, so you need to set up Tailwind as a PostCSS plugin inside the SPFx project.
          </p>
          <CodeBlock
            label="Terminal"
            code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init`}
          />
          <p className="text-sm text-gray-600 mt-3">
            Update <code className="bg-gray-100 px-1 rounded">tailwind.config.js</code> to scan your web part files:
          </p>
          <CodeBlock
            label="tailwind.config.js"
            code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`}
          />
          <p className="text-sm text-gray-600 mt-3">
            Create <code className="bg-gray-100 px-1 rounded">src/webparts/employeeHandbook/styles/tailwind.css</code>:
          </p>
          <CodeBlock
            label="tailwind.css"
            code={`@tailwind base;
@tailwind components;
@tailwind utilities;`}
          />
          <p className="text-sm text-gray-600 mt-3">
            Add a build script in <code className="bg-gray-100 px-1 rounded">package.json</code> to compile Tailwind before the SPFx build:
          </p>
          <CodeBlock
            label="package.json (scripts section)"
            code={`"scripts": {
  "build": "npm run tw && gulp bundle --ship",
  "tw": "tailwindcss -i ./src/webparts/employeeHandbook/styles/tailwind.css -o ./src/webparts/employeeHandbook/styles/tailwind.output.css --minify",
  ...
}`}
          />
          <InfoBox type="info">
            Import the compiled CSS inside your web part's <strong>render()</strong> method or component:{" "}
            <code>import './styles/tailwind.output.css';</code>
          </InfoBox>
        </Step>

        {/* Step 3 */}
        <Step number={3} title="Copy your component files" icon={<FolderOpen className="w-4 h-4" />}>
          <p className="text-sm text-gray-600">
            Copy the Figma-exported assets and your component into the SPFx web part source folder.
          </p>
          <FileTree
            items={[
              { name: "src/", indent: 0 },
              { name: "webparts/", indent: 1 },
              { name: "employeeHandbook/", indent: 2 },
              { name: "EmployeeHandbookWebPart.ts", indent: 3, description: "auto-generated entry point" },
              { name: "components/", indent: 3 },
              { name: "EmployeeHandbook.tsx", indent: 4, highlight: true, description: "paste your component here" },
              { name: "assets/", indent: 3 },
              { name: "ca-tile.png", indent: 4, highlight: true, description: "export from Figma" },
              { name: "uk-tile.png", indent: 4, highlight: true, description: "export from Figma" },
              { name: "us-tile.png", indent: 4, highlight: true, description: "export from Figma" },
              { name: "emp-handbook-header.png", indent: 4, highlight: true, description: "export from Figma" },
              { name: "styles/", indent: 3 },
              { name: "tailwind.css", indent: 4 },
            ]}
          />
          <InfoBox type="warning">
            SPFx does <strong>not</strong> support the <code>figma:asset/</code> virtual module scheme. Replace those imports with relative paths pointing to your <code>assets/</code> folder:
          </InfoBox>
          <CodeBlock
            label="EmployeeHandbook.tsx — replace Figma asset imports"
            code={`// BEFORE (Figma Make syntax — won't work in SPFx)
import imgCaTile3 from "figma:asset/4f2c38e9d9bce1400a80ca82e9bb566af7537b72.png";

// AFTER (standard relative path)
import imgCaTile3 from "../assets/ca-tile.png";
import imgUkTile22 from "../assets/uk-tile.png";
import imgUsTile22 from "../assets/us-tile.png";
import imgEmpHandbookHeaderV21 from "../assets/emp-handbook-header.png";`}
          />
          <p className="text-sm text-gray-600">
            To export the images from Figma: select each asset frame → right-click → <strong>Export</strong> → choose PNG → save into the <code>assets/</code> folder above.
          </p>
        </Step>

        {/* Step 4 */}
        <Step number={4} title="Wire the component into the web part entry point" icon={<FileCode2 className="w-4 h-4" />}>
          <p className="text-sm text-gray-600">
            Open the auto-generated <code className="bg-gray-100 px-1 rounded">EmployeeHandbookWebPart.ts</code> and update the <code>render()</code> method to mount your React component.
          </p>
          <CodeBlock
            label="EmployeeHandbookWebPart.ts"
            code={`import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import EmpHandbook from './components/EmployeeHandbook';
import './styles/tailwind.output.css';

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
}`}
          />
          <InfoBox type="success">
            If you want editors to configure handbook URLs via the property pane, add properties to the web part manifest and pass them as props to <code>EmpHandbook</code>.
          </InfoBox>
        </Step>

        {/* Step 5 */}
        <Step number={5} title="Update the web part manifest" icon={<Settings className="w-4 h-4" />}>
          <p className="text-sm text-gray-600">
            Edit <code className="bg-gray-100 px-1 rounded">EmployeeHandbookWebPart.manifest.json</code> to set the display name, description, and icon that editors will see in the web part picker.
          </p>
          <CodeBlock
            label="EmployeeHandbookWebPart.manifest.json (key fields)"
            code={`{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/entry.schema.json",
  "id": "your-unique-guid-here",
  "alias": "EmployeeHandbookWebPart",
  "componentType": "WebPart",
  "version": "1.0.0",
  "manifestVersion": 2,
  "requiresCustomScript": false,
  "supportedHosts": ["SharePointWebPart", "TeamsPersonalApp"],
  "preconfiguredEntries": [{
    "groupId": "5c03119e-3074-46fd-976b-c60198311f70",
    "group": { "default": "Under Development" },
    "title": { "default": "Employee Handbook" },
    "description": { "default": "Links to the US, UK, and Canada employee handbooks." },
    "officeFabricIconFontName": "BookAnswers",
    "properties": {}
  }]
}`}
          />
        </Step>

        {/* Step 6 */}
        <Step number={6} title="Build & test locally with the workbench" icon={<Terminal className="w-4 h-4" />}>
          <p className="text-sm text-gray-600">
            Run the local dev server and open the SharePoint Workbench to preview before deploying.
          </p>
          <CodeBlock
            label="Terminal"
            code={`# Compile Tailwind first
npm run tw

# Start the local dev server
gulp serve`}
          />
          <p className="text-sm text-gray-600">
            Then navigate to:
          </p>
          <CodeBlock
            code={`https://<your-tenant>.sharepoint.com/_layouts/15/workbench.aspx`}
          />
          <p className="text-sm text-gray-600">
            Click the <strong>+</strong> button and search for <strong>"Employee Handbook"</strong> to add your web part to the canvas.
          </p>
        </Step>

        {/* Step 7 */}
        <Step number={7} title="Package and deploy to SharePoint" icon={<Package className="w-4 h-4" />}>
          <p className="text-sm text-gray-600">
            Build a production bundle and create the <code>.sppkg</code> deployment package.
          </p>
          <CodeBlock
            label="Terminal"
            code={`# 1. Build production bundle
gulp bundle --ship

# 2. Package the solution
gulp package-solution --ship

# This generates:
# sharepoint/solution/emp-handbook-webpart.sppkg`}
          />
        </Step>

        {/* Step 8 */}
        <Step number={8} title="Upload to App Catalog & approve" icon={<Upload className="w-4 h-4" />}>
          <ol className="list-none space-y-3 text-sm text-gray-700">
            {[
              <>Navigate to your <strong>SharePoint App Catalog</strong>: <code className="bg-gray-100 px-1 rounded">https://&lt;tenant&gt;.sharepoint.com/sites/appcatalog</code></>,
              <>Go to <strong>Apps for SharePoint</strong> → click <strong>Upload</strong> → select <code>emp-handbook-webpart.sppkg</code></>,
              <>In the deployment dialog, check <strong>"Make this solution available to all sites"</strong> (tenant-wide) or leave unchecked for site-specific installs → click <strong>Deploy</strong></>,
              <>Go to the target SharePoint site → <strong>Site contents</strong> → <strong>Add an app</strong> → find <strong>emp-handbook-webpart-client-side-solution</strong> → click <strong>Add</strong></>,
              <>Edit any modern page, click <strong>+</strong> → search <strong>"Employee Handbook"</strong> → insert the web part. Done! 🎉</>,
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold mt-0.5">
                  {i + 1}
                </div>
                <div>{step}</div>
              </li>
            ))}
          </ol>
        </Step>
      </div>

      {/* Footer tips */}
      <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-blue-800">Helpful Resources</span>
        </div>
        <ul className="space-y-2 text-sm text-blue-800">
          {[
            { label: "Microsoft SPFx Getting Started Guide", url: "https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment" },
            { label: "SPFx React Web Part Tutorial", url: "https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part" },
            { label: "Using Tailwind CSS with SPFx", url: "https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/use-cascading-stylesheets-to-brand-sharepoint-framework-web-parts" },
            { label: "App Catalog Overview", url: "https://learn.microsoft.com/en-us/sharepoint/use-app-catalog" },
          ].map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 transition-colors"
              >
                {link.label} →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
