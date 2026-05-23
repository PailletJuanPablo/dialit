<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import CodeBlock from "../components/CodeBlock.vue";
import { tutorialPages } from "../content";

const route = useRoute();
const isMobileNavOpen = ref(false);

const activeSlug = computed(() => String(route.params.pageSlug ?? tutorialPages[0].slug));
const activeIndex = computed(() => {
  const index = tutorialPages.findIndex((page) => page.slug === activeSlug.value);
  return index >= 0 ? index : 0;
});
const activePage = computed(() => tutorialPages[activeIndex.value]);
const previousPage = computed(() => tutorialPages[activeIndex.value - 1]);
const nextPage = computed(() => tutorialPages[activeIndex.value + 1]);

const groupedPages = computed(() => {
  const groups = new Map<string, typeof tutorialPages>();

  for (const page of tutorialPages) {
    groups.set(page.group, [...(groups.get(page.group) ?? []), page]);
  }

  return Array.from(groups, ([title, pages]) => ({ title, pages }));
});

function closeMobileNav() {
  isMobileNavOpen.value = false;
}

function textLines(value: string) {
  return value.split("\n").filter((line) => line.trim().length > 0);
}
</script>

<template>
  <main class="doc-workspace internal-docs tutorial-docs">
    <aside class="doc-sidebar internal-sidebar" :class="{ 'is-open': isMobileNavOpen }" aria-label="Tutorial navigation">
      <div class="sidebar-title">
        <span>Tutorial</span>
        <strong>support_assistant</strong>
      </div>

      <button
        class="doc-sidebar-toggle"
        type="button"
        :aria-expanded="isMobileNavOpen"
        aria-controls="tutorial-sidebar-nav"
        @click="isMobileNavOpen = !isMobileNavOpen"
      >
        <span>Browse tutorial</span>
        <strong>{{ activePage.title }}</strong>
      </button>

      <nav id="tutorial-sidebar-nav" class="sectioned-nav">
        <section v-for="group in groupedPages" :key="group.title">
          <h2>{{ group.title }}</h2>
          <RouterLink
            v-for="page in group.pages"
            :key="page.slug"
            :to="`/tutorial/${page.slug}`"
            :class="{ active: page.slug === activePage.slug }"
            @click="closeMobileNav"
          >
            {{ page.title }}
          </RouterLink>
        </section>
      </nav>
    </aside>

    <article class="doc-reader internal-reader tutorial-article">
      <Transition name="doc-content" mode="out-in">
        <div :key="activePage.slug" class="doc-content-transition">
          <header class="doc-page-header">
            <p class="breadcrumb">Tutorial / {{ activePage.group }}</p>
            <h1>{{ activePage.title }}</h1>
            <p>{{ activePage.summary }}</p>
          </header>

          <section class="doc-page-section tutorial-guide-panel">
            <h2>{{ activePage.codeSections.length > 0 ? "Objective" : "Overview" }}</h2>
            <p>{{ activePage.objective }}</p>
            <ol class="tutorial-outcome-list">
              <li v-for="check in activePage.checks" :key="check">{{ check }}</li>
            </ol>
          </section>

          <section v-if="activePage.codeSections.length > 0" class="doc-page-section code-first-section">
            <article
              v-for="section in activePage.codeSections"
              :key="section.label"
              class="doc-code-card"
              :class="{ 'tutorial-text-card': section.language === 'text' }"
            >
              <div>
                <h3>{{ section.label }}</h3>
                <span v-if="section.language !== 'text'">{{ section.language ?? "ts" }}</span>
              </div>
              <ol v-if="section.language === 'text' && textLines(section.code).length > 1" class="tutorial-text-list">
                <li v-for="(line, index) in textLines(section.code)" :key="`${section.label}-${index}`">{{ line }}</li>
              </ol>
              <p v-else-if="section.language === 'text'" class="tutorial-text-copy">{{ section.code }}</p>
              <CodeBlock v-else :code="section.code" :language="section.language ?? 'ts'" />
            </article>
          </section>

          <nav class="doc-pagination" aria-label="Tutorial pagination">
            <RouterLink v-if="previousPage" :to="`/tutorial/${previousPage.slug}`">
              <span>Previous</span>
              {{ previousPage.title }}
            </RouterLink>
            <RouterLink v-if="nextPage" :to="`/tutorial/${nextPage.slug}`">
              <span>Next</span>
              {{ nextPage.title }}
            </RouterLink>
          </nav>
        </div>
      </Transition>
    </article>
  </main>
</template>
