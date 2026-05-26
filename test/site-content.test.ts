import { readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { runHomeDemoScenario } from "../site/src/lib/homeDemoFlow";
import {
  allPublicApiExports,
  apiReferenceGroups,
  apiNavigation,
  featureSections,
  homePage,
  siteNavigation,
  tutorialBuildChapters,
  tutorialChapters,
  tutorialPages,
} from "../site/src/content";

const repositoryHref = "https://github.com/PailletJuanPablo/dialit";

function slugify(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function exportedCallableMembersByEntry() {
  const membersByEntry = new Map<string, string[]>();

  for (const filePath of ["src/types.ts", "src/runtime-support.ts"]) {
    const source = ts.createSourceFile(filePath, readFileSync(filePath, "utf8"), ts.ScriptTarget.Latest, true);

    function visit(node: ts.Node) {
      if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node)) {
        if (node.name && isExported(node)) {
          const members = callableMemberNames(node.members);
          if (members.length) membersByEntry.set(node.name.text, members);
        }
      }

      if (ts.isTypeAliasDeclaration(node) && isExported(node) && ts.isTypeLiteralNode(node.type)) {
        const members = callableMemberNames(node.type.members);
        if (members.length) membersByEntry.set(node.name.text, members);
      }

      ts.forEachChild(node, visit);
    }

    visit(source);
  }

  return membersByEntry;
}

function isExported(node: ts.Node) {
  return Boolean(ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export);
}

function callableMemberNames(members: ts.NodeArray<ts.ClassElement | ts.TypeElement>) {
  return members.flatMap((member) => {
    if (ts.isMethodSignature(member) || ts.isMethodDeclaration(member)) {
      return memberName(member.name);
    }
    if (ts.isPropertySignature(member) && member.type && ts.isFunctionTypeNode(member.type)) {
      return memberName(member.name);
    }
    return [];
  });
}

function memberName(name: ts.PropertyName | undefined) {
  if (!name) return [];
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return [name.text];
  return [];
}

describe("Dialit public site content", () => {
  it("defines the public navigation pages", () => {
    expect(siteNavigation.map((item) => item.label)).toEqual([
      "Home",
      "Features",
      "Tutorial",
      "API",
      "GitHub",
    ]);
    expect(siteNavigation.map((item) => item.href)).toEqual([
      "/",
      "/features",
      "/tutorial",
      "/api",
      repositoryHref,
    ]);
  });

  it("points every public GitHub entry to the package repository", () => {
    const appSource = readFileSync("site/src/App.vue", "utf8");
    const homePageSource = readFileSync("site/src/pages/HomePage.vue", "utf8");

    expect(siteNavigation.find((item) => item.label === "GitHub")?.href).toBe(repositoryHref);
    expect(appSource).toContain(':href="githubLink.href"');
    expect(appSource).toContain(':href="repositoryHref"');
    expect(homePageSource).toContain(':href="repositoryHref"');
    expect(appSource).not.toContain('href="https://github.com/"');
    expect(homePageSource).not.toContain('href="https://github.com/"');
  });

  it("uses the approved compact logo mark", () => {
    const appSource = readFileSync("site/src/App.vue", "utf8");
    const stylesSource = readFileSync("site/src/styles.css", "utf8");

    expect(appSource).toContain('<span class="brand-mark" aria-hidden="true">D.</span>');
    expect(stylesSource).toContain(".brand-mark");
    expect(stylesSource).toContain("place-items: center");
  });

  it("keeps docs sidebars in page flow and credits the footer", () => {
    const appSource = readFileSync("site/src/App.vue", "utf8");
    const apiPageSource = readFileSync("site/src/pages/ApiPage.vue", "utf8");
    const stylesSource = readFileSync("site/src/styles.css", "utf8");
    const tutorialPageSource = readFileSync("site/src/pages/TutorialPage.vue", "utf8");

    expect(stylesSource).not.toMatch(/\.doc-workspace\.internal-docs > \.internal-sidebar\s*\{[^}]*position:\s*fixed/);
    expect(stylesSource).not.toMatch(/html\s*\{[^}]*overflow-x:\s*hidden/);
    expect(stylesSource).not.toMatch(/body\s*\{[^}]*overflow-x:\s*hidden/);
    expect(stylesSource).not.toMatch(/#app\s*\{[^}]*overflow-x:\s*hidden/);
    expect(stylesSource).not.toMatch(/@media \(min-width: 1101px\) \{\s*\.doc-workspace\.internal-docs/);
    expect(stylesSource).toMatch(/@media \(min-width: 761px\) \{\s*\.doc-workspace\.internal-docs/);
    expect(appSource).not.toContain(':key="route.path"');
    expect(tutorialPageSource).toContain('<Transition name="doc-content" mode="out-in">');
    expect(apiPageSource).toContain('<Transition name="doc-content" mode="out-in">');
    expect(stylesSource).not.toMatch(/\.sectioned-nav section\s*\{[^}]*animation:\s*surface-rise/);
    expect(tutorialPageSource).toContain("doc-sidebar-toggle");
    expect(apiPageSource).toContain("doc-sidebar-toggle");
    expect(tutorialPageSource).toContain(":aria-expanded=\"isMobileNavOpen\"");
    expect(apiPageSource).toContain(":aria-expanded=\"isMobileNavOpen\"");
    expect(stylesSource).toMatch(/@media \(max-width: 760px\)[\s\S]*\.doc-sidebar:not\(\.is-open\) \.sectioned-nav/);
    expect(stylesSource).toMatch(/@media \(max-width: 760px\)[\s\S]*\.doc-sidebar\.is-open \.sectioned-nav/);
    expect(stylesSource).toMatch(/@media \(min-width: 761px\)[\s\S]*\.doc-sidebar-toggle\s*\{[^}]*display:\s*none !important/);
    expect(stylesSource).toMatch(/\.doc-sidebar-toggle span,\s*\.doc-sidebar-toggle strong\s*\{[^}]*grid-column:\s*1/);
    expect(appSource).toContain('Build with <span aria-hidden="true">♥</span> by');
    expect(appSource).toContain('href="https://pailletjp.com"');
    expect(appSource).toContain('target="_blank"');
    expect(appSource).toContain('<RouterLink to="/flow-graph">Flow scenarios</RouterLink>');
    expect(appSource).not.toContain("<span>Explicit conversational workflows for TypeScript.</span>");
  });

  it("uses the approved Dialit home hero copy", () => {
    expect(homePage.hero.title).toBe("Dialit");
    expect(homePage.hero.headline).toBe("Explicit conversational workflows for TypeScript.");
    expect(homePage.hero.subtitle).toContain("typed steps, branches, operations, variables, actions");
    expect(homePage.hero.subtitle).toContain("full decision traces");
  });

  it("covers the requested feature sections", () => {
    expect(featureSections.map((section) => section.title)).toEqual([
      "Versioned Flow Definitions",
      "Typed Steps",
      "Routes, Branches, and Targets",
      "Operations",
      "Actions as Operations",
      "Input Processing",
      "Semantic Input",
      "Responses and Generation",
      "Conditions",
      "Variables and State",
      "Flow Calls",
      "Human Handoff",
      "Events and Decision Traces",
      "Runtime API and API Adapter",
      "Persistence and Runtime Support",
      "Extensibility",
      "Validation and Errors",
    ]);
  });

  it("links feature API references to existing reference entries", () => {
    const apiReferenceHrefs = new Set(
      apiReferenceGroups.flatMap((group) => (
        group.entries.map((entry) => `/api/${slugify(group.title)}/${slugify(entry.name)}`)
      )),
    );
    const featureApiHrefs = featureSections
      .map((section) => section.apiHref)
      .filter((href): href is string => typeof href === "string" && href.startsWith("/api/"));

    expect(featureApiHrefs.filter((href) => !apiReferenceHrefs.has(href))).toEqual([]);
  });

  it("keeps the tutorial chapter sequence complete", () => {
    expect(tutorialChapters).toEqual([
      "Mental Model",
      "First Flow",
      "Add a Menu",
      "Store Variables",
      "Validate Input",
      "Handle Invalid Input",
      "Run Actions",
      "Route with ConditionStep",
      "Classify Input with SemanticInputTask",
      "Generate Responses",
      "Handle Attachments",
      "Call Another Flow",
      "Add Human Handoff",
      "Add a Custom Operation",
      "Add a Custom Step",
      "Persist Conversations",
      "Inspect Traces",
      "Final Assistant",
    ]);
  });

  it("turns the tutorial into a guided full-flow build path", () => {
    expect(tutorialBuildChapters.map((chapter) => chapter.title)).toEqual(tutorialChapters);
    expect(tutorialBuildChapters.at(-1)?.title).toBe("Final Assistant");
    expect(tutorialBuildChapters.flatMap((chapter) => chapter.adds)).toEqual(
      expect.arrayContaining([
        "ConversationFlowDefinition",
        "MenuStep",
        "SetVariableOperation",
        "RunActionOperation",
        "ConditionStep",
        "SemanticInputTask",
        "GeneratedResponsePlan",
        "DecisionTrace",
      ]),
    );
    for (const chapter of tutorialBuildChapters) {
      expect(chapter.implementations.length).toBeGreaterThanOrEqual(2);
      expect(chapter.trace.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("publishes tutorial subsections as individual code-first pages", () => {
    const tutorialPageSource = readFileSync("site/src/pages/TutorialPage.vue", "utf8");
    expect(tutorialPages.map((page) => page.slug).slice(0, 3)).toEqual([
      "getting-started",
      "install-and-imports",
      "minimal-flow-version",
    ]);
    expect(tutorialPages.length).toBeGreaterThan(tutorialBuildChapters.length);
    expect(tutorialPages.every((page) => page.codeSections.length >= 2)).toBe(true);
    const pagesWithEmptyChecks = tutorialPages
      .filter((page) => page.checks.some((check) => check.trim().length === 0))
      .map((page) => page.title);
    expect(pagesWithEmptyChecks).toEqual([]);
    const tutorialCode = tutorialPages.flatMap((page) => page.codeSections.map((section) => section.code)).join("\n");
    const tutorialLabels = tutorialPages.flatMap((page) => page.codeSections.map((section) => section.label));
    expect(tutorialCode).toContain("npm install dialit");
    expect(tutorialCode).toContain("createConversationEngine");
    expect(tutorialCode).toContain("validateFlowDefinition");
    expect(tutorialCode).toContain("GeneratedResponsePlan");
    expect(tutorialCode).not.toContain("uses the public package surface only");
    expect(tutorialCode).not.toMatch(/\bDNI\b/i);
    expect(tutorialCode).not.toContain("ask_dni");
    expect(tutorialPageSource).not.toContain("Build it");
    expect(tutorialLabels).not.toContain("Contract");
    expect(tutorialLabels).not.toContain("Runtime");
    expect(tutorialLabels).not.toContain("Trace check");
    expect(tutorialPages.flatMap((page) => page.checks)).not.toEqual(
      expect.arrayContaining([
        "The snippet imports only from dialit or dialit/runtime-support.",
        "The flow object uses public TypeScript contracts.",
        "The expected messages, state, events, or trace can be asserted.",
      ]),
    );
  });

  it("renders tutorial text sections as prose cards instead of code snippets", () => {
    const tutorialPageSource = readFileSync("site/src/pages/TutorialPage.vue", "utf8");
    const tutorialTextSections = tutorialPages.flatMap((page) =>
      page.codeSections.filter((section) => section.language === "text"),
    );

    expect(tutorialTextSections.length).toBeGreaterThan(0);
    expect(tutorialPageSource).toContain('class="doc-code-card"');
    expect(tutorialPageSource).toContain("tutorial-text-card");
    expect(tutorialPageSource).toContain("section.language === 'text'");
    expect(tutorialPageSource).toContain("<CodeBlock v-else");
    expect(tutorialPageSource).not.toContain("tutorial-text-block");
  });

  it("keeps public pages product-facing instead of exposing internal doc generator labels", () => {
    const apiPage = readFileSync("site/src/pages/ApiPage.vue", "utf8");
    const routerSource = readFileSync("site/src/router.ts", "utf8");

    expect(apiPage).not.toContain(">JSDoc<");
    expect(apiPage).not.toContain("mapped exports");
    expect(apiPage).not.toContain("overviewCards");
    expect(apiPage).not.toContain("activeEntry.source");
    expect(apiPage).not.toContain("activeGroup.title }} exports");
    expect(apiPage).toContain(">Description<");
    expect(apiPage).toContain(">Parameters<");
    expect(apiPage).toContain(">Returns<");
    expect(apiPage).toContain(">Fields</h2>");
    expect(apiPage).toContain("api-reference-table");
    expect(apiPage).toContain("typeParts");
    expect(apiPage).not.toContain(">Import<");
    expect(apiPage).not.toContain(">Example<");
    expect(routerSource).toContain('redirect: "/tutorial/getting-started"');
  });

  it("keeps the marketing pages simple and guided", () => {
    const homePageSource = readFileSync("site/src/pages/HomePage.vue", "utf8");
    const featuresPageSource = readFileSync("site/src/pages/FeaturesPage.vue", "utf8");
    const flowGraphPageSource = readFileSync("site/src/pages/FlowGraphPage.vue", "utf8");
    const flowShowcaseSource = readFileSync("site/src/components/FlowShowcaseWorkspace.vue", "utf8");
    const tutorialPageSource = readFileSync("site/src/pages/TutorialPage.vue", "utf8");
    const homeConsoleSource = readFileSync("site/src/components/HomeFlowConsole.vue", "utf8");
    const stylesSource = readFileSync("site/src/styles.css", "utf8");
    const flowShowcaseSurface = `${flowGraphPageSource}\n${flowShowcaseSource}`;

    expect(homePageSource).not.toContain("product-story");
    expect(homePageSource).not.toContain("runtime-model-section");
    expect(homePageSource).not.toContain("trace-ledger");
    expect(featuresPageSource).not.toContain("FeatureExplorer");
    expect(featuresPageSource).not.toContain("Runtime proof");
    expect(featuresPageSource).toContain("features-simple-list");
    expect(flowGraphPageSource).toContain("FlowShowcaseWorkspace");
    expect(flowShowcaseSurface).toContain("showcaseTurns");
    expect(flowShowcaseSurface).toContain("conversationMessages");
    expect(flowShowcaseSurface).toContain("runtimeEvents");
    expect(flowShowcaseSurface).toContain("variableChanges");
    expect(flowShowcaseSurface).toContain("traceItems");
    expect(flowShowcaseSurface).toContain("Play");
    expect(flowShowcaseSurface).toContain("Pause");
    expect(flowShowcaseSurface).toContain("Previous");
    expect(flowShowcaseSurface).toContain("Next");
    expect(flowShowcaseSurface).toContain("chat-next-button");
    expect(flowShowcaseSurface).toContain("scenarioJson");
    expect(flowShowcaseSurface).toContain("scenarioJsonLines");
    expect(flowShowcaseSurface).toContain("jsonLineRefs");
    expect(flowShowcaseSurface).toContain("scrollIntoView");
    expect(flowShowcaseSurface).toContain("data-json-line");
    expect(flowShowcaseSurface).toContain("Order Support Assistant");
    expect(flowShowcaseSurface).toContain("GeneratedResponsePlan");
    expect(flowShowcaseSurface).toContain("SemanticInputTask");
    expect(flowShowcaseSurface).toContain("HandoffOperation");
    expect(flowShowcaseSurface).toContain("CustomOperationDefinition");
    expect(flowShowcaseSurface).toContain("ProcessTurnResult");
    expect(flowShowcaseSurface).toContain("ConversationState");
    expect(flowShowcaseSurface).toContain("ConversationEvent");
    expect(flowShowcaseSurface).toContain("DecisionTrace");
    expect(flowShowcaseSurface).toContain("Play");
    expect(flowShowcaseSurface).toContain("json-line");
    expect(flowShowcaseSurface).not.toMatch(/\bDNI\b/i);
    expect(flowShowcaseSurface).not.toContain("13 nodes");
    expect(flowShowcaseSurface).not.toContain("15 branches");
    expect(flowShowcaseSurface).not.toContain("Object map");
    expect(flowShowcaseSurface).not.toContain("The graph is just");
    expect(flowShowcaseSurface).not.toContain("technical_support");
    expect(flowShowcaseSurface).not.toContain("billing");
    expect(flowShowcaseSource).toContain("flow-runtime-panel");
    expect(flowShowcaseSource).not.toContain('class="runtime-panel');
    expect(flowShowcaseSource).not.toContain(".runtime-panel");
    expect(flowShowcaseSource).not.toContain("-webkit-line-clamp");
    expect(flowShowcaseSource).not.toContain("activeTurn.value.jsonFragment.split");
    expect(tutorialPageSource).not.toContain("tutorial-concept-row");
    expect(homeConsoleSource).not.toContain("runtime-choice-grid");
    expect(homeConsoleSource).toContain("chat-choice-list");
    expect(stylesSource).toContain(".highlighted-code span");
    expect(stylesSource).toContain("text-transform: none !important");
    expect(stylesSource).toContain("overflow-y: auto !important");
  });

  it("publishes the flow graph as its own page instead of expanding shared content", () => {
    const routerSource = readFileSync("site/src/router.ts", "utf8");
    const contentSource = readFileSync("site/src/content.ts", "utf8");
    const flowGraphPageSource = readFileSync("site/src/pages/FlowGraphPage.vue", "utf8");
    const flowShowcaseSource = readFileSync("site/src/components/FlowShowcaseWorkspace.vue", "utf8");
    const flowShowcaseSurface = `${flowGraphPageSource}\n${flowShowcaseSource}`;

    expect(routerSource).toContain('import FlowGraphPage from "./pages/FlowGraphPage.vue"');
    expect(routerSource).toContain('{ path: "/flow-graph", component: FlowGraphPage }');
    expect(siteNavigation.map((item) => item.href)).not.toContain("/flow-graph");
    expect(contentSource).not.toContain('{ label: "Flow Graph", href: "/flow-graph" }');
    expect(contentSource).not.toContain("showcaseTurns");
    expect(contentSource).not.toContain("Order Support Assistant");
    expect(contentSource).not.toContain("conversationMessages");
    expect(contentSource).not.toContain("flow-showcase-workspace");
    expect(flowGraphPageSource).toContain("FlowShowcaseWorkspace");
    expect(flowShowcaseSurface).toContain("FlowVersion");
    expect(flowShowcaseSurface).toContain("Order Support Assistant");
    expect(flowShowcaseSurface).toContain("track_order");
    expect(flowShowcaseSurface).toContain("start_return");
    expect(flowShowcaseSurface).toContain("damaged_item");
    expect(flowShowcaseSurface).toContain("talk_to_human");
    expect(flowShowcaseSurface).toContain("definition.steps.main_menu.config.options");
    expect(flowShowcaseSurface).toContain("definition.customOperations");
    expect(flowShowcaseSurface).toContain("definition.steps.capture_order_number.config.input.bindings");
    expect(flowShowcaseSurface).toContain("definition.steps.upload_return_photo.config.rules");
    expect(flowShowcaseSurface).toContain("definition.steps.request_handoff.routes[0].branch.operations[0]");
    expect(flowShowcaseSurface).not.toMatch(/\bDNI\b/i);
    expect(flowShowcaseSurface).not.toContain("13 nodes");
    expect(flowShowcaseSurface).not.toContain("15 branches");
    expect(flowShowcaseSurface).not.toContain("Object map");
  });

  it("lists the API navigation tree from the documented launch scope", () => {
    expect(apiNavigation.map((group) => group.title)).toEqual([
      "Runtime Entry Points",
      "Flow Model",
      "Variables and Value Expressions",
      "Responses",
      "Actions and Custom Operations",
      "Conditions",
      "Steps",
      "Branches, Routes, and Targets",
      "Operations",
      "Input Processing",
      "User Input",
      "Input Resolution",
      "Runtime State",
      "Step Execution Contracts",
      "Operation Execution Contracts",
      "Outbound Messages",
      "Events and Traces",
      "Runtime Errors",
      "Extension Contracts",
      "Validation and Inspection",
      "Persistence",
      "Engine and API Adapter",
      "Turn Processing",
      "Runtime Configuration",
      "Variable and Definition Lookup",
      "Built-in Resolver Marker Contracts",
      "Built-in Validator Marker Contracts",
      "Runtime Support",
      "Primitive IDs and Shared Base Types",
      "Complete Symbol Index",
    ]);
  });

  it("groups API reference contracts by functionality", () => {
    expect(apiReferenceGroups.map((group) => group.title)).toEqual(expect.arrayContaining([
      "Runtime Entry Points",
      "Primitive IDs and Shared Base Types",
      "Flow Model",
      "Variables and Value Expressions",
      "Responses",
      "Actions and Custom Operations",
      "Conditions",
      "Steps",
      "Branches, Routes, and Targets",
      "Operations",
      "Input Processing",
      "User Input",
      "Input Resolution",
      "Runtime State",
      "Step Execution Contracts",
      "Operation Execution Contracts",
      "Outbound Messages",
      "Engine and API Adapter",
      "Events and Traces",
      "Runtime Errors",
      "Extension Contracts",
      "Validation and Inspection",
      "Persistence",
      "Turn Processing",
      "Runtime Configuration",
      "Variable and Definition Lookup",
      "Built-in Resolver Marker Contracts",
      "Built-in Validator Marker Contracts",
      "Runtime Support",
    ]));
    expect(apiReferenceGroups.flatMap((group) => group.entries.map((entry) => entry.name))).toEqual(
      expect.arrayContaining([
        "Root package",
        "runtime-support",
        "ConversationFlowDefinition",
        "MenuStepDefinition",
        "RunActionOperation",
        "InputContract",
        "SemanticInputTask",
        "GeneratedResponsePlan",
        "ActionDefinition",
        "ConditionExpression",
        "createConversationEngine",
        "createConversationApi",
        "DecisionTrace",
        "CreateConversationEngineOptions",
        "validateFlowDefinition",
      ]),
    );
    expect(apiReferenceGroups.every((group) => (group.exports?.length ?? 0) > 0)).toBe(true);
    expect(apiReferenceGroups.reduce((total, group) => total + (group.exports?.length ?? 0), 0)).toBe(allPublicApiExports.length);
    const apiEntries = apiReferenceGroups.flatMap((group) => group.entries);
    const apiCode = JSON.stringify(apiEntries);
    expect(apiCode).not.toContain("contractName");
    expect(apiCode).not.toContain("console.log(contractName)");
    expect(apiEntries.filter((entry) => entry.kind === "type" || entry.kind === "union type" || entry.kind === "interface").every((entry) => !entry.example && !entry.examples)).toBe(true);
    expect(apiEntries.filter((entry) => entry.kind === "type" || entry.kind === "union type" || entry.kind === "interface" || entry.kind === "module").every((entry) => (entry.properties?.length ?? 0) > 0 || (entry.methods?.length ?? 0) > 0 || (entry.signatures?.length ?? 0) > 0)).toBe(true);
    expect(apiEntries.flatMap((entry) => entry.properties ?? []).every((property) => property.type && property.description)).toBe(true);
    expect(apiEntries.filter((entry) => entry.kind === "function").every((entry) => (entry.signatures?.length ?? 0) > 0 && entry.returns)).toBe(true);
    expect(apiEntries.some((entry) => entry.usage?.includes("Use "))).toBe(true);
    expect(apiEntries.some((entry) => entry.signatures?.length)).toBe(true);
    expect(apiEntries.flatMap((entry) => entry.signatures ?? []).filter((signature) => signature.trimStart().startsWith("/*"))).toEqual([]);
    expect(apiEntries.flatMap((entry) => entry.signatures ?? []).filter((signature) => signature.includes("=;"))).toEqual([]);
    expect(apiEntries.flatMap((entry) => entry.signatures ?? []).filter((signature) => signature.includes(":;"))).toEqual([]);
    expect(apiEntries.some((entry) => entry.methods?.length)).toBe(true);
    expect(apiEntries.flatMap((entry) => entry.methods ?? []).every((method) => method.parameters?.length && method.returns)).toBe(true);
    expect(apiReferenceGroups.flatMap((group) => group.entries).find((entry) => entry.name === "ConversationApi")?.methods?.map((method) => method.name)).toEqual(
      expect.arrayContaining(["start", "sendMessage", "selectOption", "sendAttachments", "sendEvent", "toHttpResponse"]),
    );
    expect(apiReferenceGroups.flatMap((group) => group.entries).find((entry) => entry.name === "createConversationApi")?.methods?.map((method) => method.name)).toEqual(
      apiReferenceGroups.flatMap((group) => group.entries).find((entry) => entry.name === "ConversationApi")?.methods?.map((method) => method.name),
    );
  });

  it("documents every public API export as a reference entry", () => {
    const referenceEntryNames = new Set(apiReferenceGroups.flatMap((group) => group.entries.map((entry) => entry.name)));
    const missingEntries = allPublicApiExports.filter((name) => !referenceEntryNames.has(name));

    expect(missingEntries).toEqual([]);
  });

  it("documents callable members for every exported contract with methods", () => {
    const apiEntries = new Map(apiReferenceGroups.flatMap((group) => group.entries.map((entry) => [entry.name, entry] as const)));
    const missingMembers = [...exportedCallableMembersByEntry()].flatMap(([entryName, sourceMethods]) => {
      const documentedMethods = apiEntries.get(entryName)?.methods?.map((method) => method.name) ?? [];
      return sourceMethods
        .filter((methodName) => !documentedMethods.includes(methodName))
        .map((methodName) => `${entryName}.${methodName}`);
    });

    expect(missingMembers).toEqual([]);
  });

  it("renders documented methods as nested API navigation links with anchors", () => {
    const apiPageSource = readFileSync("site/src/pages/ApiPage.vue", "utf8");
    const routerSource = readFileSync("site/src/router.ts", "utf8");
    const entryNames = new Set(apiReferenceGroups.flatMap((group) => group.entries.map((entry) => entry.name)));

    expect(apiPageSource).toContain("function methodId(methodName: string)");
    expect(apiPageSource).toContain("function methodHref(groupTitle: string, entryName: string, methodName: string)");
    expect(apiPageSource).toContain('class="api-method-nav"');
    expect(apiPageSource).toContain(':to="methodHref(group.title, entry.name, method.name)"');
    expect(apiPageSource).toContain(':id="methodId(method.name)"');
    expect(routerSource).toContain("if (to.hash)");
    expect(routerSource).toContain("el: to.hash");
    expect(entryNames).not.toContain("start");
    expect(entryNames).not.toContain("selectOption");
    expect(entryNames).not.toContain("sendMessage");
  });

  it("documents linked API dependency types with real signatures and fields", () => {
    const entries = new Map(apiReferenceGroups.flatMap((group) => group.entries.map((entry) => [entry.name, entry] as const)));
    const requiredSymbols = [
      "ValidatorDefinition",
      "ValidationContext",
      "ValidationResult",
      "FlowValidationOptions",
      "OperationExecutionContext",
      "OperationResult",
      "StepValidationContext",
      "NormalizerDefinition",
      "ExtractorDefinition",
      "VariableScope",
      "VariableType",
      "CreateTextMessageRequest",
      "ConversationEventType",
    ];

    for (const symbol of requiredSymbols) {
      const entry = entries.get(symbol);
      expect(entry, symbol).toBeDefined();
      expect(entry?.purpose.length, symbol).toBeGreaterThan(40);
      expect(entry?.usage?.length, symbol).toBeGreaterThan(40);
      expect(entry?.signatures?.join("\n"), symbol).toContain(symbol);
      expect((entry?.properties?.length ?? 0) + (entry?.methods?.length ?? 0), symbol).toBeGreaterThan(0);
    }

    expect(entries.get("ValidatorDefinition")?.properties?.map((property) => property.name)).toEqual(
      expect.arrayContaining(["type", "options", "message"]),
    );
    expect(entries.get("OperationResult")?.properties?.map((property) => property.type).join("\n")).toContain("TraceFragment");
    expect(entries.get("CreateTextMessageRequest")?.signatures?.join("\n")).toContain("ResponseId");
  });

  it("presents API reference types without synthetic fields or optional undefined noise", () => {
    const apiPageSource = readFileSync("site/src/pages/ApiPage.vue", "utf8");
    const stylesSource = readFileSync("site/src/styles.css", "utf8");
    const apiEntries = apiReferenceGroups.flatMap((group) => group.entries);
    const optionalMembers = apiEntries.flatMap((entry) => [
      ...(entry.properties ?? []),
      ...(entry.parameters ?? []),
      ...(entry.methods ?? []).flatMap((method) => method.parameters ?? []),
    ]).filter((member) => member.required === false);
    const optionalMethods = apiEntries.flatMap((entry) => entry.methods ?? []).filter((method) => method.required === false);
    const functionEntries = apiEntries.filter((entry) => entry.kind === "function");

    expect(optionalMembers.filter((member) => /\bundefined\b/.test(member.type))).toEqual([]);
    expect(optionalMembers.filter((member) => /\bundefined\b/.test(member.description))).toEqual([]);
    expect(optionalMethods.length).toBeGreaterThan(0);
    expect(optionalMethods.filter((method) => /\bundefined\b/.test(method.description))).toEqual([]);
    expect(optionalMethods.filter((method) => /\bundefined\b/.test(method.returns?.type ?? ""))).toEqual([]);
    expect(functionEntries.every((entry) => (entry.properties?.length ?? 0) === 0)).toBe(true);
    expect(functionEntries.every((entry) => entry.returns?.type && entry.returns.type !== "unknown")).toBe(true);
    expect(functionEntries.flatMap((entry) => entry.fields)).not.toContain("value");
    expect(apiPageSource).toContain("kindBadge");
    expect(apiPageSource).toContain("api-kind-badge");
    expect(stylesSource).toContain(".api-kind-badge");
    expect(stylesSource).toContain(".api-nav-entry");
  });

  it("rejects generic, missing, duplicated, or generated API reference descriptions", () => {
    const apiReferenceSource = readFileSync("site/src/api-reference-content.ts", "utf8");
    const apiEntries = apiReferenceGroups.flatMap((group) => group.entries);
    const descriptions = apiReferenceGroups.flatMap((group) => group.entries.flatMap((entry) => [
      { path: `${entry.name}.purpose`, value: entry.purpose },
      { path: `${entry.name}.usage`, value: entry.usage },
      ...(entry.returns ? [{ path: `${entry.name}.returns`, value: entry.returns.description }] : []),
      ...(entry.properties ?? []).map((property) => ({
        path: `${entry.name}.${property.name}`,
        value: property.description,
      })),
      ...(entry.parameters ?? []).map((parameter) => ({
        path: `${entry.name}(${parameter.name})`,
        value: parameter.description,
      })),
      ...(entry.methods ?? []).flatMap((method) => [
        { path: `${entry.name}.${method.name}`, value: method.description },
        ...(method.returns ? [{ path: `${entry.name}.${method.name}.returns`, value: method.returns.description }] : []),
        ...(method.parameters ?? []).map((parameter) => ({
          path: `${entry.name}.${method.name}.${parameter.name}`,
          value: parameter.description,
        })),
      ]),
    ]));
    const sourceBannedPatterns = [
      "rawApiReferenceGroups",
      "refineApiReference",
      "reusableDescription",
      "humanizeIdentifier",
      "isFillerDescription",
    ];
    const fillerPattern = /\b(?:member exposed by|method exposed by|export member exposed by|Creates d by|Result produced by|data used by|String value used as|Use this contract when|Use this type to|Use this marker type|Return value produced by this method|This method does not require arguments|defines the .* contract with|Discriminator or value category for this contract|Lifecycle, operation, action, handoff, or processing status|Application metadata carried with runtime objects|HTTP-friendly response containing statusCode and body|Registers a provider, handler, resolver, validator, normalizer, or extractor|Loads a record by id|Persists a record|Lists stored records for one conversation id|Returns the registered handler for the requested type|Checks whether a handler is registered for the requested type|from Root package|contract field|when working with|carries .* for its|specific path|value read from|by the owner|API surface|typed runtime boundary|described by its signature|typed as|argument passed|state needed for that boundary|performs the .* package operation|describes .* behavior in the|data stored on|using (?:a|an|the) .* shape|models .* workflows|represents .* data in .* workflows|field on .*declared as|helper used by Dialit applications and tests|groups imports that applications use together|stored by this record|Payload value stored|Promise resolved by|returns .* value for the caller)\b/i;
    const pendingPattern = /\b(?:todo|tbd|pendiente|fill in|to be documented|pending description|pending documentation)\b/i;
    const sourceIssues = [
      ...sourceBannedPatterns
        .filter((pattern) => apiReferenceSource.includes(pattern))
        .map((pattern) => `source:${pattern}`),
      ...(fillerPattern.test(apiReferenceSource) ? ["source:filler-pattern"] : []),
      ...(pendingPattern.test(apiReferenceSource) ? ["source:pending-pattern"] : []),
    ];
    const missingDescriptions = descriptions
      .filter((description) => typeof description.value !== "string" || description.value.trim().length === 0)
      .map((description) => description.path);
    const fillerDescriptions = descriptions
      .filter((description): description is { path: string; value: string } => typeof description.value === "string")
      .filter((description) => fillerPattern.test(description.value) || pendingPattern.test(description.value))
      .map((description) => `${description.path}: ${description.value}`);
    const duplicateDescriptions = [...descriptions
      .filter((description): description is { path: string; value: string } => typeof description.value === "string")
      .filter((description) => description.value.trim().length > 0)
      .reduce((byDescription, description) => {
        const paths = byDescription.get(description.value) ?? [];
        paths.push(description.path);
        byDescription.set(description.value, paths);
        return byDescription;
      }, new Map<string, string[]>())]
      .filter(([, paths]) => paths.length > 1)
      .map(([description, paths]) => `${description} -> ${paths.join(", ")}`);
    const flowVersion = apiEntries.find((entry) => entry.name === "FlowVersion");
    const flowVersionDescriptions = new Map(
      flowVersion?.properties?.map((property) => [property.name, property.description] as const),
    );

    expect([
      ...sourceIssues,
      ...missingDescriptions.map((path) => `missing:${path}`),
      ...fillerDescriptions.map((description) => `filler:${description}`),
      ...duplicateDescriptions.map((description) => `duplicate:${description}`),
    ]).toEqual([]);
    expect(flowVersionDescriptions.get("checksum")).toBe("Optional integrity hash for the exact flow definition payload.");
    expect(flowVersionDescriptions.get("publishedAt")).toBe("ISO timestamp recorded when this version was published.");
    expect(flowVersionDescriptions.get("publishedBy")).toBe("Identifier of the actor or process that published this version.");
    expect(flowVersionDescriptions.get("createdBy")).toBe("Identifier of the actor or process that created this version.");
  });

  it("runs the home demo through the real Dialit API adapter", async () => {
    const technical = await runHomeDemoScenario("technical_support");
    expect(technical.menuChoices.map((choice) => choice.optionId)).toEqual([
      "technical_support",
      "billing",
      "contact_agent",
    ]);
    expect(technical.variables).toEqual(
      expect.arrayContaining([
        ["contactReason", "technical_support"],
        ["ticketId", "TECH-4821"],
      ]),
    );
    expect(technical.trace).toEqual(expect.arrayContaining(["GeneratedResponsePlan rendered a reply"]));

    const billing = await runHomeDemoScenario("billing");
    expect(billing.variables).toEqual(
      expect.arrayContaining([
        ["contactReason", "billing"],
        ["billingArea", "billing_wrong_charge"],
      ]),
    );
    expect(billing.trace).toEqual(expect.arrayContaining(["SemanticInputTask selected an allowed outcome"]));
  });

  it("keeps the home API snippet aligned with the adapter request contracts", async () => {
    const homeConsoleSource = readFileSync("site/src/components/HomeFlowConsole.vue", "utf8");
    const technical = await runHomeDemoScenario("technical_support");
    const demoCode = technical.code.join("\n");

    expect(homeConsoleSource).toContain('await api.start({ conversationId, flowVersionId: \\"support_assistant_v1\\" });');
    expect(homeConsoleSource).toContain("await api.selectOption({ conversationId, optionId });");
    expect(demoCode).toContain('await api.start({ conversationId, flowVersionId: "support_assistant_v1" });');
    expect(demoCode).toContain('await api.selectOption({ conversationId, optionId: "technical_support" });');
  });
});
