<script setup lang="ts">
import HomeFlowConsole from "../components/HomeFlowConsole.vue";
import { homePage, repositoryHref } from "../content";
</script>

<template>
  <main class="home-page">
    <section class="hero-section product-hero">
      <div class="hero-copy">
        <p class="eyebrow">TypeScript conversational runtime</p>
        <h1>{{ homePage.hero.title }}</h1>
        <h2>{{ homePage.hero.headline }}</h2>
        <p class="hero-subtitle">
          {{ homePage.hero.subtitle }}
        </p>
        <div class="hero-actions">
          <RouterLink class="button primary" to="/tutorial">Start Tutorial</RouterLink>
          <RouterLink class="button secondary" to="/api">API Reference</RouterLink>
          <a class="button ghost" :href="repositoryHref" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <HomeFlowConsole />
    </section>

    <section class="proof-strip" aria-label="Dialit runtime guarantees">
      <span v-for="proof in homePage.proofPoints" :key="proof">{{ proof }}</span>
    </section>
  </main>
</template>
