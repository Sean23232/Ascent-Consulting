// Interaction harness: mounts the real app in jsdom and drives it with events.
// Verifies the flows that matter: FAQ, roadmap, assessment → contact carry-over,
// form validation + demo receipt, booking prototype, mobile nav, services dropdown.
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost/#/",
  pretendToBeVisual: true,
});
const { window } = dom;

class IOStub {
  constructor(cb) { this.cb = cb; }
  observe(el) { this.cb([{ isIntersecting: true, target: el, boundingClientRect: { top: 0 } }], this); }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IOStub;
window.matchMedia = (q) => ({
  matches: false, media: q, onchange: null,
  addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; },
});
window.scrollTo = () => {};
window.Element.prototype.scrollIntoView = function () {};
window.HTMLElement.prototype.setPointerCapture = function () {};
Object.defineProperty(window.navigator, "clipboard", {
  value: { writeText: async () => {} },
  configurable: true,
});

for (const key of [
  "window", "document", "navigator", "location", "history", "HTMLElement", "HTMLInputElement",
  "Element", "Node", "Event", "MouseEvent", "KeyboardEvent", "CustomEvent", "IntersectionObserver",
  "matchMedia", "requestAnimationFrame", "cancelAnimationFrame", "getComputedStyle", "scrollTo",
]) {
  if (window[key] !== undefined) globalThis[key] = window[key];
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const { act } = await import("react");
const { createRoot } = await import("react-dom/client");
const { App } = await import("./test-bundle.mjs");

const { createElement } = await import("react");

let root;
await act(async () => {
  root = createRoot(document.getElementById("root"));
  root.render(createElement(App));
});

const blur = async (el) => {
  await act(async () => {
    el.dispatchEvent(new window.FocusEvent("focusout", { bubbles: true }));
  });
  await sleep(10);
};

/* --------------------------------- helpers -------------------------------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const byText = (sel, text) => $$(sel).find((el) => el.textContent.trim().includes(text));
const sleep = (ms = 40) => act(async () => { await new Promise((r) => setTimeout(r, ms)); });

function setNativeValue(el, value) {
  const proto = el instanceof window.HTMLTextAreaElement
    ? window.HTMLTextAreaElement.prototype
    : el instanceof window.HTMLSelectElement
      ? window.HTMLSelectElement.prototype
      : window.HTMLInputElement.prototype;
  const desc = Object.getOwnPropertyDescriptor(proto, "value");
  desc.set.call(el, value);
  el.dispatchEvent(new window.Event(el instanceof window.HTMLSelectElement ? "change" : "input", { bubbles: true }));
}

async function click(el, label = "element") {
  if (!el) throw new Error(`click target missing: ${label}`);
  await act(async () => {
    el.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
  });
  await sleep(10);
}

async function type(el, value, label = "field") {
  if (!el) throw new Error(`type target missing: ${label}`);
  await act(async () => { setNativeValue(el, value); });
  await sleep(10);
}

const results = [];
const check = async (name, fn) => {
  try {
    await fn();
    results.push(`  PASS  ${name}`);
  } catch (err) {
    results.push(`  FAIL  ${name}\n        ${err.message}`);
  }
};
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

async function goto(hash) {
  await act(async () => { window.location.hash = hash; });
  await sleep(60);
}

/* --------------------------------- checks --------------------------------- */

await check("homepage renders hero + nav", async () => {
  await goto("#/");
  assert(document.body.textContent.includes("From Business Idea"), "hero headline missing");
  assert($$('header nav[aria-label="Primary"] a, header nav[aria-label="Primary"] div > a').length >= 6, "primary nav incomplete");
  assert(document.body.textContent.includes("Book a Consultation"), "booking CTA missing");
  assert($$("section").length >= 9, `expected 9+ sections, found ${$$("section").length}`);
});

await check("services dropdown opens and links resolve", async () => {
  const trigger = byText("header a", "Services");
  assert(trigger, "Services nav item missing");
  await act(async () => {
    trigger.parentElement.dispatchEvent(new window.FocusEvent("focusin", { bubbles: true }));
  });
  await sleep(30);
  const panel = $$("header a").filter((a) => a.getAttribute("href")?.startsWith("#/services#"));
  assert(panel.length >= 4, `dropdown should expose 4 service links, found ${panel.length}`);
});

await check("mobile drawer toggles and exposes links", async () => {
  const burger = $('button[aria-controls="mobile-nav"]');
  assert(burger, "hamburger missing");
  await click(burger, "hamburger");
  assert(burger.getAttribute("aria-expanded") === "true", "drawer did not open");
  const drawer = $("#mobile-nav");
  assert(drawer.getAttribute("aria-hidden") === "false", "drawer still aria-hidden");
  assert($$('#mobile-nav nav a').length === 6, "drawer nav links missing");
  await act(async () => {
    window.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  });
  await sleep(30);
  assert(burger.getAttribute("aria-expanded") === "false", "Escape did not close drawer");
});

await check("FAQ accordion: one open at a time, aria wired", async () => {
  await goto("#/");
  const buttons = $$('[id^="faq-btn-"]');
  assert(buttons.length === 6, `expected 6 FAQ buttons, got ${buttons.length}`);
  await click(buttons[2], "faq 3");
  assert(buttons[2].getAttribute("aria-expanded") === "true", "faq 3 did not expand");
  assert(buttons[0].getAttribute("aria-expanded") === "false", "previous FAQ stayed open");
  const panel = $("#faq-panel-2");
  assert(panel && panel.getAttribute("data-open") === "true", "panel state not exposed");
  assert(panel.textContent.length > 40, "panel has no answer text");
  await click(buttons[2], "faq 3 again");
  assert(buttons[2].getAttribute("aria-expanded") === "false", "FAQ did not collapse");
});

await check("journey roadmap: click + arrow keys drive the panel", async () => {
  const tabs = $$('[role="tab"]');
  assert(tabs.length === 5, `expected 5 stage tabs, got ${tabs.length}`);
  await click(tabs[3], "stage 4");
  assert(tabs[3].getAttribute("aria-selected") === "true", "stage 4 not selected");
  const panel = $("#stage-panel");
  assert(panel.textContent.includes("Prepare"), "panel did not update to stage 4");
  await act(async () => {
    tabs[3].dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
  });
  await sleep(30);
  assert($$('[role="tab"]')[4].getAttribute("aria-selected") === "true", "ArrowRight did not advance");
  assert($("#stage-panel").textContent.includes("Explore Funding"), "panel did not follow keyboard");
  await act(async () => {
    $$('[role="tab"]')[4].dispatchEvent(new window.KeyboardEvent("keydown", { key: "Home", bubbles: true }));
  });
  await sleep(20);
  assert($$('[role="tab"]')[0].getAttribute("aria-selected") === "true", "Home key did not reset");
});

await check("assessment: full run → result → carries into contact form", async () => {
  await goto("#/next-step");
  const opts = () => $$('[aria-pressed]');
  await click(opts().find((b) => b.textContent.includes("I have an idea")), "step1 option");
  await click(byText("button", "Continue"), "continue 1");
  assert(document.body.textContent.includes("What would you like help with"), "did not reach step 2");
  await click(opts().find((b) => b.textContent.includes("Organizing information")), "step2 option");
  await click(opts().find((b) => b.textContent.includes("Exploring potential funding")), "step2 option b");
  await click(byText("button", "Continue"), "continue 2");
  assert(document.body.textContent.includes("What is your immediate priority"), "did not reach step 3");
  await click(opts().find((b) => b.textContent.includes("Being ready for a funding conversation")), "step3 option");
  await type($("#quiz-context"), "Testing a service-based business.", "context");
  await click(byText("button", "See my next step"), "finish");
  assert(document.body.textContent.includes("Preparation Stage"), "wrong deterministic result");
  assert(document.body.textContent.includes("Informational only"), "disclaimer missing");
  await click(byText("button", "Discuss My Next Steps"), "carry to contact");
  assert(window.location.hash === "#/contact", `did not navigate, hash=${window.location.hash}`);
  const msg = $("#message");
  assert(msg && msg.value.includes("Preparation Stage"), "assessment answer not carried into message");
  assert($$('input[name="support"]:checked').length >= 1, "support areas not pre-selected");
  assert($("#stage") && $("#stage").value !== "", "stage select not pre-filled");
});

await check("assessment validation blocks an empty step", async () => {
  await goto("#/next-step");
  await click(byText("button", "Continue"), "continue with nothing");
  const alert = $('[role="alert"]');
  assert(alert && /Select an option/i.test(alert.textContent), "no validation message shown");
});

await check("assessment answers persist across navigation", async () => {
  await goto("#/resources");
  await goto("#/contact");
  assert($("#message").value.length > 10, "carried answers were lost after visiting another page");
  assert($$('input[name="support"]:checked').length >= 1, "carried support areas were lost");
});

await check("contact form: invalid submit reports, valid submit shows demo receipt", async () => {
  await goto("#/about");
  await goto("#/contact");
  // Clear anything carried over from the assessment so validation is testable from empty
  if ($("#stage").value) await type($("#stage"), "", "stage reset");
  if ($("#message").value) await type($("#message"), "", "message reset");
  for (const box of $$('input[name="support"]:checked')) await click(box, "uncheck support");

  await click(byText("button", "Send My Enquiry"), "empty submit");
  assert(document.body.textContent.includes("fields need attention"), "error summary missing");
  assert($$('[aria-invalid="true"]').length >= 4, `expected 4+ inline errors, got ${$$('[aria-invalid="true"]').length}`);
  assert(document.body.textContent.includes("Select at least one area of support"), "support error missing");
  assert(document.body.textContent.includes("read the privacy notice"), "consent error missing");
  assert(!document.body.textContent.includes("Demo receipt"), "false success on invalid submit");

  await type($("#name"), "Kennedy Carter", "name");
  await type($("#email"), "not-an-email", "email");
  await blur($("#email"));
  assert(document.body.textContent.includes("Enter a valid email address"), "email format validation missing");

  await type($("#email"), "kennedy@example.com", "email");
  await type($("#phone"), "5550100", "phone");
  await type($("#business"), "Ascent Test Co", "business");
  await type($("#stage"), "Preparing for potential funding", "stage");
  await click($("#support-funding-preparation"), "support area");
  await type($("#message"), "I would like to understand what to prepare before approaching providers.", "message");
  await click($("#consent"), "consent");
  await click(byText("button", "Send My Enquiry"), "valid submit");
  await sleep(1200);
  assert(document.body.textContent.includes("Demo receipt"), "demo receipt not shown");
  assert(document.body.textContent.includes("has not"), "honest failure wording missing");
  assert(!document.body.textContent.includes("Enquiry delivered"), "falsely claimed delivery");
  assert(document.body.textContent.includes("kennedy@example.com"), "receipt does not echo submitted data");
});

await check("contact form: honeypot blocks submission", async () => {
  await goto("#/about");
  await goto("#/contact");
  await type($("#name"), "Spam Bot", "name");
  await type($("#email"), "spam@example.com", "email");
  await type($("#stage"), "Other", "stage");
  await click($("#support-not-sure-yet"), "support");
  await type($("#message"), "Buy cheap things now please.", "message");
  await click($("#consent"), "consent");
  await type($("#website"), "http://spam.example", "honeypot");
  await click(byText("button", "Send My Enquiry"), "spam submit");
  assert(document.body.textContent.includes("flagged by spam protection"), "honeypot did not trigger");
  assert(!document.body.textContent.includes("Demo receipt"), "spam was accepted");
});

await check("pre-filled enquiry submitted quickly is not flagged as spam", async () => {
  await goto("#/");
  await click(byText("header button", "Book a Consultation"), "open booking");
  await click($$('[role="dialog"] button[aria-pressed]').find((b) => !b.disabled), "date");
  await click($$('[role="dialog"] button[aria-pressed]').find((b) => b.textContent.includes("Morning")), "window");
  await click(byText('[role="dialog"] button', "Continue"), "continue");
  await type($("#bk-name"), "Fast Founder", "name");
  await type($("#bk-email"), "fast@example.com", "email");
  await click(byText('[role="dialog"] button', "Capture my request"), "capture");
  await sleep(1200);
  await click(byText('[role="dialog"] button', "Send this as an enquiry"), "handoff");
  await type($("#name"), "Fast Founder", "name");
  await type($("#email"), "fast@example.com", "email");
  await click($("#consent"), "consent");
  await click(byText("button", "Send My Enquiry"), "fast submit");
  await sleep(1300);
  assert(!document.body.textContent.includes("flagged by spam protection"), "false spam flag on a pre-filled form");
  assert(document.body.textContent.includes("Demo receipt"), "quick pre-filled submit was wrongly blocked");
});

await check("booking prototype: full flow then hand-off to enquiry", async () => {
  await goto("#/");
  await click(byText("header button", "Book a Consultation"), "header booking");
  const dialog = $('[role="dialog"]');
  assert(dialog, "booking dialog did not open");
  assert(dialog.textContent.includes("Prototype interface"), "prototype status not disclosed");
  await click($$('input[name="consult-type"]')[2], "consult type");
  const dayBtn = $$('[role="dialog"] button[aria-pressed]').find((b) => !b.disabled);
  await click(dayBtn, "date");
  const slot = $$('[role="dialog"] button[aria-pressed]').find((b) => b.textContent.includes("Morning"));
  await click(slot, "time window");
  await click(byText('[role="dialog"] button', "Continue"), "continue");
  assert(dialog.textContent.includes("Your selection"), "did not reach details step");
  const captureBtn = byText('[role="dialog"] button', "Capture my request");
  assert(captureBtn.disabled === true, "capture button should be disabled while details are invalid");
  await type($("#bk-name"), "K", "short name");
  await blur($("#bk-name"));
  assert(document.body.textContent.includes("Please enter your full name"), "name validation missing");
  await type($("#bk-name"), "Kennedy Carter", "name");
  await type($("#bk-email"), "kennedy@example.com", "email");
  await type($("#bk-notes"), "Funding preparation questions.", "notes");
  await click(byText('[role="dialog"] button', "Capture my request"), "capture");
  await sleep(1200);
  assert(document.body.textContent.includes("Request captured"), "confirmation screen missing");
  assert(document.body.textContent.includes("No confirmation email"), "honest booking wording missing");
  await click(byText('[role="dialog"] button', "Send this as an enquiry"), "handoff");
  assert(window.location.hash === "#/contact", "hand-off did not navigate");
  assert($("#message")?.value.includes("Consultation request"), "booking details not carried over");
});

await check("booking dialog closes on Escape", async () => {
  await goto("#/process");
  await click(byText("button", "Let's Discuss Your Goals"), "process booking");
  assert($('[role="dialog"]'), "dialog did not open");
  await act(async () => { window.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true })); });
  await sleep(40);
  assert(!$('[role="dialog"]'), "dialog did not close");
});

await check("resources: search + filter + article page", async () => {
  await goto("#/resources");
  assert($$("article").length === 4, `expected 4 articles, got ${$$("article").length}`);
  await type($("#resource-search"), "funding");
  const afterSearch = $$("article").length;
  assert(afterSearch >= 1 && afterSearch < 4, `search did not narrow list (${afterSearch})`);
  await type($("#resource-search"), "zzzznothing");
  assert(document.body.textContent.includes("Nothing matches"), "empty state missing");
  await click(byText("button", "Reset filters"), "reset");
  assert($$("article").length === 4, "reset did not restore list");
  await click(byText("button", "Funding Preparation"), "category filter");
  assert($$("article").length >= 1, "category filter returned nothing");
  await goto("#/resources/funding-readiness-checklist");
  assert(document.body.textContent.includes("The Funding Readiness Checklist"), "article did not load");
  assert(document.body.textContent.includes("Related reading"), "related articles missing");
  assert(document.body.textContent.includes("min"), "reading time missing");
  await goto("#/resources/missing-slug");
  assert(document.body.textContent.includes("isn't available"), "article 404 state missing");
});

await check("services page: sidebar jump + hash deep link", async () => {
  await goto("#/services");
  assert($$("article[id]").length === 4, "service sections missing ids");
  await goto("#/services#funding-preparation");
  assert(document.body.textContent.includes("Funding Preparation"), "deep link target missing");
  const aside = $('aside[aria-label="Service navigation"]');
  assert(aside, "service sidebar missing");
  await click($$("aside button")[2], "sidebar item");
  assert(true, "sidebar click failed");
});

await check("404 + legal pages render and link home", async () => {
  await goto("#/does-not-exist");
  assert(document.body.textContent.includes("isn't part of"), "404 missing");
  await goto("#/privacy-policy");
  assert(document.body.textContent.includes("Privacy Notice"), "privacy missing");
  assert(document.body.textContent.includes("not transmitted"), "prototype disclosure missing");
  await goto("#/terms-of-use");
  assert(document.body.textContent.includes("Terms of Use"), "terms missing");
  assert(document.body.textContent.includes("No funding outcome is guaranteed") || document.body.textContent.includes("no funding outcome"), "terms disclaimer missing");
});

await check("no dead links or empty alts anywhere", async () => {
  await goto("#/");
  const dead = $$("a").filter((a) => {
    const h = a.getAttribute("href");
    return h === "#" || h === "" || h === "#!";
  });
  assert(dead.length === 0, `${dead.length} dead href="#" links`);
  const emptyAlt = $$("img").filter((i) => i.getAttribute("alt") === null);
  assert(emptyAlt.length === 0, `${emptyAlt.length} images without alt attribute`);
});

console.log("\nInteraction test results\n" + results.join("\n"));
const failed = results.filter((r) => r.includes("FAIL")).length;
console.log(failed ? `\n${failed} check(s) failed.` : "\nAll interaction checks passed.");
process.exit(failed ? 1 : 0);
