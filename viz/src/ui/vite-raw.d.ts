// Vite's `?raw` import query. `tsconfig.browser.json` `types` is empty, so
// `vite/client` is not loaded. The pattern matches only a specifier ending
// in `public/theme-init.js?raw` (FE-132), not every `*?raw` import.
// Lives under src/ui/ so the shared-pure classifier, which reads only
// viz/src/*.ts, does not see it.
declare module '*public/theme-init.js?raw' {
  const source: string;
  export default source;
}
