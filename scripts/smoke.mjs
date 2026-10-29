// Render smoke test: mounts every route through react-dom/server inside jsdom
// to catch runtime errors that a type check cannot see.
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

const { window } = dom;

class IOStub {
  constructor(cb) {
    this.cb = cb;
  }
  observe(el) {
    this.cb([{ isIntersecting: true, target: el, boundingClientRect: { top: 0 } }], this);
  }
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = IOStub;
window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));

for (const key of [
  "window",
  "document",
  "navigator",
  "location",
  "history",
  "HTMLElement",
  "Element",
  "Node",
  "Event",
  "CustomEvent",
  "IntersectionObserver",
  "matchMedia",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "getComputedStyle",
]) {
  if (window[key] !== undefined) globalThis[key] = window[key];
}

const { renderToString } = await import("react-dom/server");
const { createElement } = await import("react");
const { App } = await import("./ssr-bundle.mjs");

const routes = [
  "#/",
  "#/services",
  "#/services#funding-preparation",
  "#/process",
  "#/about",
  "#/resources",
  "#/resources/funding-readiness-checklist",
  "#/resources/does-not-exist",
  "#/next-step",
  "#/contact",
  "#/privacy-policy",
  "#/terms-of-use",
  "#/unknown-route",
];

let failures = 0;
for (const route of routes) {
  window.location.hash = route;
  try {
    const html = renderToString(createElement(App));
    const size = html.length;
    const suspicious =
      size < 4000 || /\[object Object\]/.test(html) || /undefined<\/|NaN/.test(html) ? "  ⚠ check output" : "";
    console.log(`  ok  ${route.padEnd(42)} ${String(size).padStart(7)} chars${suspicious}`);
  } catch (err) {
    failures += 1;
    console.log(`FAIL  ${route}\n      ${err && err.message}`);
    if (err && err.stack) console.log(err.stack.split("\n").slice(1, 4).join("\n"));
  }
}

console.log(failures === 0 ? "\nAll routes rendered without runtime errors." : `\n${failures} route(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
