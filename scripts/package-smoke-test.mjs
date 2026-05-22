import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TEMP_ROOT = mkdtempSync(join(tmpdir(), "nexembot-package-"));
const PACKAGE_DIRECTORY = join(TEMP_ROOT, "package");
const CONSUMER_DIRECTORY = join(TEMP_ROOT, "consumer");
const NODE_COMMAND = process.execPath;
const NPM_CLI_PATH = process.env.npm_execpath ?? join(dirname(NODE_COMMAND), "node_modules", "npm", "bin", "npm-cli.js");
const TSC_CLI_PATH = join(PROJECT_ROOT, "node_modules", "typescript", "bin", "tsc");
const PACKAGE_NAME = "nexembot";
const NOW = "2026-05-22T12:00:00.000Z";

try {
  const tarballPath = packLibrary();
  createConsumerProject(tarballPath);
  compileConsumerProject();
  runRuntimeImportCheck();
} finally {
  removeTempDirectory(TEMP_ROOT);
}

function packLibrary() {
  mkdirSync(PACKAGE_DIRECTORY, { recursive: true });
  const output = runNodeAndCapture(NPM_CLI_PATH, [
    "pack",
    "--json",
    "--silent",
    "--pack-destination",
    PACKAGE_DIRECTORY,
  ], PROJECT_ROOT);
  const entries = JSON.parse(output.trim());

  if (!Array.isArray(entries) || entries.length !== 1) {
    throw new Error(`Expected npm pack to return one package entry, received: ${output}`);
  }

  const [entry] = entries;
  if (!isPackedPackage(entry)) {
    throw new Error(`npm pack returned an invalid package entry: ${JSON.stringify(entry)}`);
  }

  return resolve(PACKAGE_DIRECTORY, entry.filename);
}

function createConsumerProject(tarballPath) {
  mkdirSync(CONSUMER_DIRECTORY, { recursive: true });
  writeJsonFile(join(CONSUMER_DIRECTORY, "package.json"), {
    name: "nexembot-package-consumer",
    private: true,
    type: "module",
  });
  writeJsonFile(join(CONSUMER_DIRECTORY, "tsconfig.json"), {
    compilerOptions: {
      target: "ES2022",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      strict: true,
      noUncheckedIndexedAccess: true,
      skipLibCheck: false,
      noEmit: true,
    },
    include: ["index.ts"],
  });
  writeFileSync(join(CONSUMER_DIRECTORY, "index.ts"), consumerTypeScriptSource(), "utf8");
  writeFileSync(join(CONSUMER_DIRECTORY, "runtime-check.mjs"), consumerRuntimeSource(), "utf8");

  runNode(NPM_CLI_PATH, [
    "install",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    packageFileSpecifier(tarballPath),
  ], CONSUMER_DIRECTORY);
}

function compileConsumerProject() {
  runNode(TSC_CLI_PATH, ["-p", "tsconfig.json"], CONSUMER_DIRECTORY);
}

function runRuntimeImportCheck() {
  runNode("runtime-check.mjs", [], CONSUMER_DIRECTORY);
}

function consumerTypeScriptSource() {
  return `import {
  createConversationApi,
  createConversationEngine,
  validateFlowDefinition,
  type ConversationApiHttpResponse,
  type FlowVersion,
} from "${PACKAGE_NAME}";
import { createDefaultClock, createDefaultIdGenerator } from "${PACKAGE_NAME}/runtime-support";

const NOW = "${NOW}";

const flowVersion: FlowVersion = {
  flowVersionId: "package-smoke-flow-v1",
  flowId: "package-smoke-flow",
  version: "1.0.0",
  status: "draft",
  schemaVersion: "0.1",
  createdAt: NOW,
  definition: {
    flowId: "package-smoke-flow",
    startStepId: "welcome",
    variables: [],
    steps: [
      {
        stepId: "welcome",
        type: "message",
        config: {
          messages: [{ mode: "static", text: "Package smoke test ready." }],
        },
        routes: [
          {
            routeId: "welcome-end",
            match: { type: "outcome", outcome: "next" },
            branch: { target: { type: "end", status: "completed" } },
          },
        ],
      },
    ],
  },
};

const report = validateFlowDefinition(flowVersion.definition);
if (!report.valid) {
  throw new Error(report.issues.map((issue) => issue.message).join("\\n"));
}

const engine = createConversationEngine({
  clock: createDefaultClock(),
  idGenerator: createDefaultIdGenerator(),
  flowVersions: [flowVersion],
});
const api = createConversationApi(engine);
const response: ConversationApiHttpResponse = await api.start({
  conversationId: "package-consumer",
  flowVersionId: "package-smoke-flow-v1",
});

const message = response.body.messages[0];
if (!response.body.ok || message === undefined || message.text !== "Package smoke test ready.") {
  throw new Error("The package consumer did not receive the expected typed API response.");
}
`;
}

function consumerRuntimeSource() {
  return `import {
  createConversationApi,
  createConversationEngine,
  validateFlowDefinition,
} from "${PACKAGE_NAME}";
import { createDefaultIdGenerator } from "${PACKAGE_NAME}/runtime-support";

const NOW = "${NOW}";
const flowVersion = {
  flowVersionId: "package-runtime-flow-v1",
  flowId: "package-runtime-flow",
  version: "1.0.0",
  status: "draft",
  schemaVersion: "0.1",
  createdAt: NOW,
  definition: {
    flowId: "package-runtime-flow",
    startStepId: "welcome",
    variables: [],
    steps: [
      {
        stepId: "welcome",
        type: "message",
        config: {
          messages: [{ mode: "static", text: "Runtime import ready." }],
        },
        routes: [
          {
            routeId: "welcome-end",
            match: { type: "outcome", outcome: "next" },
            branch: { target: { type: "end", status: "completed" } },
          },
        ],
      },
    ],
  },
};

const report = validateFlowDefinition(flowVersion.definition);
if (!report.valid) {
  throw new Error(report.issues.map((issue) => issue.message).join("\\n"));
}

const engine = createConversationEngine({
  clock: { now: () => NOW },
  idGenerator: createDefaultIdGenerator(),
  flowVersions: [flowVersion],
});
const api = createConversationApi(engine);
const response = await api.start({
  conversationId: "runtime-consumer",
  flowVersionId: "package-runtime-flow-v1",
});

if (response.statusCode !== 200 || response.body.ok !== true) {
  throw new Error("The package runtime import did not return an OK response.");
}

const message = response.body.messages[0];
if (message?.text !== "Runtime import ready.") {
  throw new Error("The package runtime import did not execute the sample flow.");
}
`;
}

function packageFileSpecifier(tarballPath) {
  return `file:${tarballPath.replace(/\\/g, "/")}`;
}

function writeJsonFile(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function runNode(scriptPath, args, cwd) {
  execFileSync(NODE_COMMAND, [scriptPath, ...args], { cwd, stdio: "inherit" });
}

function runNodeAndCapture(scriptPath, args, cwd) {
  return execFileSync(NODE_COMMAND, [scriptPath, ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
}

function isPackedPackage(value) {
  return typeof value === "object"
    && value !== null
    && typeof value.filename === "string";
}

function removeTempDirectory(directory) {
  const resolvedDirectory = resolve(directory);
  const resolvedSystemTemp = resolve(tmpdir());
  if (!resolvedDirectory.startsWith(`${resolvedSystemTemp}${sep}`)) {
    throw new Error(`Refusing to remove directory outside the system temp path: ${resolvedDirectory}`);
  }

  rmSync(resolvedDirectory, { recursive: true, force: true });
}
