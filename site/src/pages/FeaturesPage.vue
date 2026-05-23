<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { featuresPage } from "../content";

const featureIcons = [
  {
    title: "Design the flow",
    paths: [
      "M8 5h8v6H8z",
      "M12 11v4",
      "M6 15h4v6H6z",
      "M14 15h4v6h-4z",
      "M10 18h4",
    ],
  },
  {
    title: "Run each turn",
    paths: [
      "M7 7l5-3 5 3-5 3-5-3z",
      "M7 12l5 3 5-3",
      "M7 17l5 3 5-3",
    ],
  },
  {
    title: "Use AI with limits",
    paths: [
      "M12 3l1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2-4.2-1.3 4.2-1.3L12 3z",
      "M5 13v3.5C5 19 7.3 21 12 22c4.7-1 7-3 7-5.5V13l-7-2-7 2z",
    ],
  },
  {
    title: "Debug without guessing",
    paths: [
      "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z",
      "M15.5 15.5 20 20",
      "M8 10h5",
      "M10.5 7.5v5",
    ],
  },
] as const;

const revealRoot = ref<HTMLElement | null>(null);
const revealReady = ref(false);
let revealObserver: IntersectionObserver | undefined;

onMounted(() => {
  const revealItems = Array.from(revealRoot.value?.querySelectorAll<HTMLElement>("[data-reveal]") ?? []);

  if (!revealItems.length) {
    revealReady.value = true;
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    revealReady.value = true;
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        entry.target.classList.add("is-visible");
        revealObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.16 },
  );

  revealItems.forEach((item) => revealObserver?.observe(item));
  requestAnimationFrame(() => {
    revealReady.value = true;
  });
});

onBeforeUnmount(() => {
  revealObserver?.disconnect();
});
</script>

<template>
  <main ref="revealRoot" class="features-page" :class="{ 'features-reveal-ready': revealReady }">
    <section class="page-intro features-intro reveal-on-scroll" data-reveal>
      <p class="eyebrow">Features</p>
      <h1>{{ featuresPage.intro.title }}</h1>
      <p>{{ featuresPage.intro.copy }}</p>
    </section>

    <section class="features-simple-section">
      <article
        v-for="(feature, index) in featuresPage.highlights"
        :key="feature.title"
        class="reveal-on-scroll"
        data-reveal
        :style="{ '--reveal-delay': `${index * 80}ms` }"
      >
        <svg class="feature-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path v-for="path in featureIcons[index].paths" :key="path" :d="path" />
        </svg>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.copy }}</p>
      </article>
    </section>

    <section class="features-simple-band">
      <div class="reveal-on-scroll" data-reveal>
        <p class="eyebrow">What you get</p>
        <h2>A small set of primitives for real chatbot flows.</h2>
      </div>
      <ul class="features-simple-list">
        <li
          v-for="(item, index) in featuresPage.bullets"
          :key="item"
          class="reveal-on-scroll"
          data-reveal
          :style="{ '--reveal-delay': `${index * 45}ms` }"
        >
          {{ item }}
        </li>
      </ul>
    </section>

    <section class="features-guided-flow">
      <div class="reveal-on-scroll" data-reveal>
        <p class="eyebrow">Workflow</p>
        <h2>From flow definition to UI response.</h2>
      </div>
      <ol>
        <li
          v-for="(step, index) in featuresPage.workflow"
          :key="step"
          class="reveal-on-scroll"
          data-reveal
          :style="{ '--reveal-delay': `${index * 70}ms` }"
        >
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          {{ step }}
        </li>
      </ol>
    </section>

    <section class="final-cta reveal-on-scroll" data-reveal>
      <p class="eyebrow">Next step</p>
      <h2>Build a first guided assistant.</h2>
      <div class="hero-actions">
        <RouterLink class="button primary" to="/tutorial">Get Started</RouterLink>
        <RouterLink class="button secondary" to="/api">API</RouterLink>
      </div>
    </section>
  </main>
</template>
