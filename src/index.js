import TypoRedirect from "./components/TypoRedirect.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("vue-typo-redirect", TypoRedirect);
}

const plugin = {
  install,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

TypoRedirect.install = install;

export default TypoRedirect;
