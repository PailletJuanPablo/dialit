import { createRouter, createWebHistory } from "vue-router";
import ApiPage from "./pages/ApiPage.vue";
import FeaturesPage from "./pages/FeaturesPage.vue";
import FlowGraphPage from "./pages/FlowGraphPage.vue";
import HomePage from "./pages/HomePage.vue";
import TutorialPage from "./pages/TutorialPage.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: "/", component: HomePage },
    { path: "/features", component: FeaturesPage },
    { path: "/flow-graph", component: FlowGraphPage },
    { path: "/tutorial", redirect: "/tutorial/getting-started" },
    { path: "/tutorial/:pageSlug", component: TutorialPage },
    { path: "/api/:groupSlug?/:entrySlug?", component: ApiPage },
  ],
});
