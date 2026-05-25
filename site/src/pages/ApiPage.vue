<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import CodeBlock from "../components/CodeBlock.vue";
import { apiReferenceGroups, type TutorialImplementation } from "../content";

const route = useRoute();
const query = ref("");
const isMobileNavOpen = ref(false);

function slugify(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function entryHref(groupTitle: string, entryName: string) {
  return `/api/${slugify(groupTitle)}/${slugify(entryName)}`;
}

function methodId(methodName: string) {
  return `method-${slugify(methodName)}`;
}

function methodHref(groupTitle: string, entryName: string, methodName: string) {
  return `${entryHref(groupTitle, entryName)}#${methodId(methodName)}`;
}

function kindBadge(kind: string) {
  const normalized = kind.toLowerCase();
  const badges: Record<string, { icon: string; label: string; className: string }> = {
    function: { icon: "fn", label: "Function", className: "api-kind-function" },
    interface: { icon: "{}", label: "Interface", className: "api-kind-interface" },
    type: { icon: "T", label: "Type", className: "api-kind-type" },
    "union type": { icon: "|", label: "Union", className: "api-kind-union" },
    module: { icon: "M", label: "Module", className: "api-kind-module" },
    class: { icon: "C", label: "Class", className: "api-kind-class" },
  };

  return badges[normalized] ?? { icon: "API", label: kind, className: "api-kind-default" };
}

const routeGroupSlug = computed(() => String(route.params.groupSlug ?? ""));
const routeEntrySlug = computed(() => String(route.params.entrySlug ?? ""));

const activeGroup = computed(() => (
  apiReferenceGroups.find((group) => slugify(group.title) === routeGroupSlug.value) ?? apiReferenceGroups[0]
));

const activeEntry = computed(() => (
  activeGroup.value.entries.find((entry) => slugify(entry.name) === routeEntrySlug.value) ?? activeGroup.value.entries[0]
));

const activeContentKey = computed(() => `${activeGroup.value.title}:${activeEntry.value.name}`);

function isActiveEntry(groupTitle: string, entryName: string) {
  return activeGroup.value.title === groupTitle && activeEntry.value.name === entryName;
}

function isActiveMethod(groupTitle: string, entryName: string, methodName: string) {
  return isActiveEntry(groupTitle, entryName) && route.hash === `#${methodId(methodName)}`;
}

const activeExamples = computed<readonly TutorialImplementation[]>(() => {
  if (activeEntry.value.examples?.length) {
    return activeEntry.value.examples;
  }

  if (activeEntry.value.example) {
    return [{ label: "Example", code: activeEntry.value.example, language: "ts" }];
  }

  return [];
});

const entryLinks = new Map(
  apiReferenceGroups.flatMap((group) => (
    group.entries.map((entry) => [entry.name, entryHref(group.title, entry.name)] as const)
  )),
);
const linkableTypeNames = [...entryLinks.keys()].sort((left, right) => right.length - left.length);
const typeNamePattern = new RegExp(`\\b(${linkableTypeNames.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "g");

function typeParts(value: string) {
  const parts: Array<{ text: string; href?: string }> = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = typeNamePattern.exec(value)) !== null) {
    if (match.index > cursor) {
      parts.push({ text: value.slice(cursor, match.index) });
    }

    const text = match[0];
    parts.push({ text, href: entryLinks.get(text) });
    cursor = match.index + text.length;
  }

  if (cursor < value.length) {
    parts.push({ text: value.slice(cursor) });
  }

  return parts;
}

const filteredGroups = computed(() => {
  const normalized = query.value.trim().toLowerCase();

  if (!normalized) {
    return apiReferenceGroups;
  }

  return apiReferenceGroups
    .map((group) => ({
      ...group,
      entries: group.title.toLowerCase().includes(normalized)
        || group.summary.toLowerCase().includes(normalized)
        ? group.entries
        : group.entries.filter((entry) => (
          entry.name.toLowerCase().includes(normalized)
          || entry.kind.toLowerCase().includes(normalized)
          || entry.purpose.toLowerCase().includes(normalized)
          || entry.fields.some((field) => field.toLowerCase().includes(normalized))
          || entry.properties?.some((property) => (
            property.name.toLowerCase().includes(normalized)
            || property.type.toLowerCase().includes(normalized)
            || property.description.toLowerCase().includes(normalized)
          ))
          || entry.parameters?.some((parameter) => (
            parameter.name.toLowerCase().includes(normalized)
            || parameter.type.toLowerCase().includes(normalized)
            || parameter.description.toLowerCase().includes(normalized)
          ))
          || entry.methods?.some((method) => (
            method.name.toLowerCase().includes(normalized)
            || method.signature.toLowerCase().includes(normalized)
            || method.description.toLowerCase().includes(normalized)
            || method.parameters?.some((parameter) => parameter.type.toLowerCase().includes(normalized))
            || method.returns?.type.toLowerCase().includes(normalized)
          ))
          || entry.example?.toLowerCase().includes(normalized)
          || entry.examples?.some((example) => example.code.toLowerCase().includes(normalized))
          || entry.related?.some((item) => item.toLowerCase().includes(normalized))
        )),
    }))
    .filter((group) => group.entries.length > 0);
});

const relatedLinks = computed(() => {
  const names = [
    ...(activeEntry.value.related ?? []),
    ...activeGroup.value.entries
      .map((entry) => entry.name)
      .filter((name) => name !== activeEntry.value.name),
  ];

  return [...new Set(names)].slice(0, 8).map((name) => {
    const group = apiReferenceGroups.find((candidate) => (
      candidate.entries.some((entry) => entry.name === name)
    ));

    return {
      name,
      href: group ? entryHref(group.title, name) : undefined,
    };
  });
});

function closeMobileNav() {
  isMobileNavOpen.value = false;
}
</script>

<template>
  <main class="doc-workspace internal-docs api-docs">
    <aside class="doc-sidebar internal-sidebar" :class="{ 'is-open': isMobileNavOpen }" aria-label="API reference navigation">
      <div class="sidebar-title">
        <span>API</span>
        <strong>Reference</strong>
      </div>

      <button
        class="doc-sidebar-toggle"
        type="button"
        :aria-expanded="isMobileNavOpen"
        aria-controls="api-sidebar-nav"
        @click="isMobileNavOpen = !isMobileNavOpen"
      >
        <span>Browse API</span>
        <strong>{{ activeEntry.name }}</strong>
      </button>

      <label class="doc-search">
        <span>Search API</span>
        <input v-model="query" type="search" placeholder="Step, trace, action..." />
      </label>

      <nav id="api-sidebar-nav" class="sectioned-nav api-sectioned-nav">
        <section v-for="group in filteredGroups" :key="group.title">
          <h2>
            <RouterLink :to="entryHref(group.title, group.entries[0].name)" @click="closeMobileNav">
              {{ group.title }}
            </RouterLink>
          </h2>
          <div
            v-for="entry in group.entries"
            :key="entry.name"
            class="api-nav-item"
          >
            <RouterLink
              :to="entryHref(group.title, entry.name)"
              :class="['api-nav-entry', { active: isActiveEntry(group.title, entry.name) }]"
              @click="closeMobileNav"
            >
              <span
                class="api-kind-badge"
                :class="kindBadge(entry.kind).className"
                :title="kindBadge(entry.kind).label"
                aria-hidden="true"
              >
                {{ kindBadge(entry.kind).icon }}
              </span>
              <span class="api-nav-entry-name">{{ entry.name }}</span>
            </RouterLink>
            <div v-if="entry.methods?.length" class="api-method-nav" aria-label="Methods">
              <RouterLink
                v-for="method in entry.methods"
                :key="method.name"
                :to="methodHref(group.title, entry.name, method.name)"
                :class="['api-method-nav-link', { active: isActiveMethod(group.title, entry.name, method.name) }]"
                @click="closeMobileNav"
              >
                <span aria-hidden="true">#</span>
                {{ method.name }}
              </RouterLink>
            </div>
          </div>
        </section>
      </nav>
    </aside>

    <article class="doc-reader internal-reader api-article">
      <Transition name="doc-content" mode="out-in">
        <div :key="activeContentKey" class="doc-content-transition">
          <header class="doc-page-header api-hero">
            <p class="breadcrumb">API / {{ activeGroup.title }}</p>
            <h1 class="api-title-row">
              <span
                class="api-kind-badge"
                :class="kindBadge(activeEntry.kind).className"
                :title="kindBadge(activeEntry.kind).label"
                aria-hidden="true"
              >
                {{ kindBadge(activeEntry.kind).icon }}
              </span>
              <span>{{ activeEntry.name }}</span>
            </h1>
            <p>{{ activeEntry.purpose }}</p>
            <div class="api-entry-meta">
              <span class="api-entry-kind">
                <span
                  class="api-kind-badge"
                  :class="kindBadge(activeEntry.kind).className"
                  aria-hidden="true"
                >
                  {{ kindBadge(activeEntry.kind).icon }}
                </span>
                {{ kindBadge(activeEntry.kind).label }}
              </span>
              <span>{{ activeGroup.title }}</span>
            </div>
          </header>

          <section class="doc-page-section">
            <h2>Description</h2>
            <p>{{ activeEntry.usage }}</p>
          </section>

          <section v-if="activeEntry.signatures?.length" class="doc-page-section">
            <h2>Signature</h2>
            <div class="signature-list">
              <CodeBlock
                v-for="signature in activeEntry.signatures"
                :key="signature"
                :code="signature"
                language="ts"
              />
            </div>
          </section>

          <section v-if="activeEntry.parameters?.length" class="doc-page-section">
            <h2>Parameters</h2>
            <div class="api-reference-table">
              <div class="api-reference-row header">
                <span>Name</span>
                <span>Type</span>
                <span>Description</span>
              </div>
              <div v-for="parameter in activeEntry.parameters" :key="parameter.name" class="api-reference-row">
                <strong>{{ parameter.name }}<em v-if="parameter.required === false">optional</em></strong>
                <code>
                  <template v-for="(part, index) in typeParts(parameter.type)" :key="`${parameter.name}-${index}`">
                    <RouterLink v-if="part.href" :to="part.href">{{ part.text }}</RouterLink>
                    <span v-else>{{ part.text }}</span>
                  </template>
                </code>
                <p>{{ parameter.description }}</p>
              </div>
            </div>
          </section>

          <section v-if="activeEntry.returns" class="doc-page-section api-return-section">
            <h2>Returns</h2>
            <code>
              <template v-for="(part, index) in typeParts(activeEntry.returns.type)" :key="`return-${index}`">
                <RouterLink v-if="part.href" :to="part.href">{{ part.text }}</RouterLink>
                <span v-else>{{ part.text }}</span>
              </template>
            </code>
            <p>{{ activeEntry.returns.description }}</p>
          </section>

          <section v-if="activeEntry.properties?.length" class="doc-page-section">
            <h2 v-if="activeEntry.kind === 'module'">Public Surface</h2>
            <h2 v-else>Fields</h2>
            <div class="api-reference-table">
              <div class="api-reference-row header">
                <span>Name</span>
                <span>Type</span>
                <span>Description</span>
              </div>
              <div v-for="property in activeEntry.properties" :key="property.name" class="api-reference-row">
                <strong>{{ property.name }}<em v-if="property.required === false">optional</em></strong>
                <code>
                  <template v-for="(part, index) in typeParts(property.type)" :key="`${property.name}-${index}`">
                    <RouterLink v-if="part.href" :to="part.href">{{ part.text }}</RouterLink>
                    <span v-else>{{ part.text }}</span>
                  </template>
                </code>
                <p>{{ property.description }}</p>
              </div>
            </div>
          </section>

          <section v-if="activeEntry.methods?.length" class="doc-page-section">
            <h2>Methods</h2>
            <div class="method-list">
              <article v-for="method in activeEntry.methods" :id="methodId(method.name)" :key="method.name">
                <h3>{{ method.name }}<em v-if="method.required === false">optional</em></h3>
                <CodeBlock :code="method.signature" language="ts" />
                <p>{{ method.description }}</p>
                <div v-if="method.parameters?.length" class="api-method-detail">
                  <h4>Parameters</h4>
                  <div v-for="parameter in method.parameters" :key="parameter.name" class="api-method-param">
                    <strong>{{ parameter.name }}<em v-if="parameter.required === false">optional</em></strong>
                    <code>
                      <template v-for="(part, index) in typeParts(parameter.type)" :key="`${method.name}-${parameter.name}-${index}`">
                        <RouterLink v-if="part.href" :to="part.href">{{ part.text }}</RouterLink>
                        <span v-else>{{ part.text }}</span>
                      </template>
                    </code>
                    <p>{{ parameter.description }}</p>
                  </div>
                </div>
                <div v-if="method.returns" class="api-method-detail">
                  <h4>Returns</h4>
                  <code>
                    <template v-for="(part, index) in typeParts(method.returns.type)" :key="`${method.name}-return-${index}`">
                      <RouterLink v-if="part.href" :to="part.href">{{ part.text }}</RouterLink>
                      <span v-else>{{ part.text }}</span>
                    </template>
                  </code>
                  <p>{{ method.returns.description }}</p>
                </div>
              </article>
            </div>
          </section>

          <section v-if="activeExamples.length" class="doc-page-section code-first-section">
            <h2>Usage</h2>
            <article v-for="example in activeExamples" :key="example.label" class="doc-code-card">
              <div>
                <h3>{{ example.label }}</h3>
                <span>{{ example.language ?? "ts" }}</span>
              </div>
              <CodeBlock :code="example.code" :language="example.language ?? 'ts'" />
            </article>
          </section>

          <section v-if="relatedLinks.length" class="doc-page-section">
            <h2>Related APIs</h2>
            <div class="related-link-grid">
              <RouterLink
                v-for="item in relatedLinks"
                :key="item.name"
                :to="item.href ?? '/api'"
              >
                {{ item.name }}
              </RouterLink>
            </div>
          </section>
        </div>
      </Transition>
    </article>
  </main>
</template>
