<template><div></div></template>

<script>
import levenshtein from "js-levenshtein";
import fuzzyComparison from "fuzzy-comparison";

export default {
  name: "TypoRedirect",
  props: [
    "levenThreshold",
    "fuzzyThreshold",
    "routes",
    "blacklist",
    "currentRoute",
    "wildcardRoute",
  ],
  mounted() {
    const routesArray =
      this.routes ||
      this.$router.options.routes
        .filter((route) => route.path !== "/" && route.path !== "**")
        .map((route) => route.path);

    for (const route of routesArray) {
      const routeSplitted = route.split("/");
      const originalUrlSplitted = this.currentRoute.path.split("/");

      if (routeSplitted.length === originalUrlSplitted.length && route.includes("/:")) {
        if (
          levenshtein(routeSplitted[1], originalUrlSplitted[1]) <= (this.levenThreshold || 2) &&
          fuzzyComparison(routeSplitted[1], originalUrlSplitted[1], {
            threshold: this.fuzzyThreshold || 2,
          })
        ) {
          this.redirect(route);
          return;
        }
      } else if (routeSplitted.length === originalUrlSplitted.length) {
        if (
          levenshtein(routeSplitted[1], originalUrlSplitted[1]) <= (this.levenThreshold || 2) &&
          fuzzyComparison(originalUrlSplitted[1], routeSplitted[1], {
            threshold: this.fuzzyThreshold || 2,
          })
        ) {
          this.redirect(route);
          return;
        }
      }
    }

    this.$router.push(this.wildcardRoute || "/");
  },
  methods: {
    redirect(route) {
      for (const blacklistRoute of this.blacklist || []) {
        if (route === blacklistRoute) {
          return;
        }
      }

      if (route.includes("/:")) {
        const routeSplitted = route.split("/");
        const originalUrlSplitted = this.currentRoute.path.split("/");
        routeSplitted[2] = originalUrlSplitted[2];
        route = routeSplitted.join("/");
      }

      if (Object.keys(this.currentRoute.query).length !== 0) {
        const queryParams = new URL(this.currentRoute.fullPath, "http://h/");
        route += `?${queryParams.searchParams.toString()}`;
      }

      this.$router.push(route);
    },
  },
};
</script>
