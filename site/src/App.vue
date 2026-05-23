<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { computed, ref } from "vue";
import { repositoryHref, siteNavigation } from "./content";

const isMenuOpen = ref(false);
const primaryNavigation = computed(() => siteNavigation.filter((item) => !item.external));
const githubLink = computed(() => siteNavigation.find((item) => item.external));

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="Dialit home" @click="closeMenu">
      <span class="brand-mark" aria-hidden="true">D.</span>
      <span>Dialit</span>
    </RouterLink>

    <nav class="site-nav" :class="{ open: isMenuOpen }" aria-label="Main navigation">
      <RouterLink
        v-for="item in primaryNavigation"
        :key="item.label"
        class="nav-link"
        :to="item.href"
        @click="closeMenu"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="header-actions">
      <a
        v-if="githubLink"
        class="github-pill"
        :href="githubLink.href"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
      <button
        class="menu-button"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>

  <footer class="site-footer">
    <div>
      <strong>Dialit</strong>
      <span class="footer-credit">
        Build with <span aria-hidden="true">♥</span> by
        <a href="https://pailletjp.com" target="_blank" rel="noreferrer">Juan Pablo Paillet</a>
      </span>
    </div>
    <div class="footer-links">
      <RouterLink to="/tutorial">Start Tutorial</RouterLink>
      <RouterLink to="/api">API Reference</RouterLink>
      <RouterLink to="/flow-graph">Flow scenarios</RouterLink>
      <a :href="repositoryHref" target="_blank" rel="noreferrer">GitHub</a>
    </div>
  </footer>
</template>
