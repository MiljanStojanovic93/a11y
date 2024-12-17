import { d as defineEventHandler, c as createError, r as readBody } from './index.mjs';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { u as useStorage } from './nitro/node-server.mjs';
import { s as serverSupabaseUser } from './serverSupabaseUser.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '@supabase/supabase-js';

function trimNodes(nodes) {
  return nodes.reduce(
    (acc, { html, target, failureSummary }) => {
      acc.push({
        html,
        target,
        failureSummary
      });
      return acc;
    },
    []
  );
}
function trimResults({
  url,
  violations,
  passes,
  incomplete,
  toolOptions,
  timestamp,
  testRunner,
  testEngine,
  testEnvironment
}) {
  return {
    // @ts-ignore - @todo: fix me
    passes: passes.map((pass) => ({
      ...pass,
      nodes: trimNodes(pass.nodes)
    })),
    testEnvironment,
    testEngine,
    testRunner,
    timestamp,
    toolOptions,
    url,
    // @ts-ignore - @todo: fix me
    violations: violations.map((violation) => ({
      ...violation,
      nodes: trimNodes(violation.nodes)
    })),
    incomplete: incomplete.map((incompleteItem) => ({
      ...incompleteItem,
      nodes: trimNodes(incompleteItem.nodes)
    }))
  };
}
const parseResults = function(auditId, size, errors, results, selector) {
  return {
    audit_id: auditId,
    selector: selector || null,
    size: `${size.width},${size.height}`,
    results: results ? trimResults(results) : null,
    errors
  };
};

async function supabase({ supbaseUrl, supbaseKey, supbaseServiceKey }, testResults) {
  if (!supbaseUrl || !supbaseKey || !supbaseServiceKey) {
    throw new Error("Missing supabase keys.");
  }
  const { status, statusText } = await fetch(`${supbaseUrl}/rest/v1/axe`, {
    method: "POST",
    headers: {
      apikey: supbaseKey,
      Authorization: `Bearer ${supbaseServiceKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(testResults)
  }).catch((err) => {
    console.error("Supabase DB update issue: ", err);
    process.exit(1);
  });
  if (![200, 201].includes(status)) {
    console.error(`[${status}] Something went wrong: "${statusText}".`);
  }
}

const useConfig = function(params) {
  const basicAuth = params.basicAuth;
  const pages = params.pages;
  const viewports = params.viewports.map(([width, height]) => ({
    width,
    height
  }));
  const {
    NITRO_PUBLIC_SUPABASE_URL: supbaseUrl,
    NITRO_PUBLIC_SUPABASE_KEY: supbaseKey,
    NITRO_SUPABASE_SERVICE_KEY: supbaseServiceKey
  } = process.env;
  const isSupabaseConfigComplete = [
    supbaseUrl,
    supbaseKey,
    supbaseServiceKey
  ].every(Boolean);
  if (!isSupabaseConfigComplete) {
    console.error("Update your supabase config to check save process locally.");
  }
  return {
    basicAuth,
    pages,
    // @ts-ignore - fix me
    viewports,
    supbaseUrl,
    supbaseKey,
    supbaseServiceKey
  };
};
const doTest = async function(auditId, size, config) {
  const { pages } = config;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const results = [];
  await page.setViewportSize(size);
  for await (const { url, selector } of pages) {
    let result;
    const errors = [];
    await page.goto(url).catch(
      () => errors.push({
        url,
        message: "Page does not exist."
      })
    );
    const axe = await new AxeBuilder({ page });
    if (selector) {
      await page.locator(selector).waitFor().then(async () => {
        axe.include(selector);
        await page.evaluate(
          () => window.scrollTo(0, document.body.scrollHeight)
        );
      }).catch(
        () => errors.push({
          url,
          message: "Selector does not exist."
        })
      );
    }
    if (!errors.length) {
      result = await axe.analyze();
    }
    results.push(parseResults(auditId, size, errors, result, selector));
  }
  {
    await useStorage().setItem(`db:a11y_${auditId}.json`, results);
  }
  await supabase(config, results);
};

const test_post = defineEventHandler(async (event) => {
  var _a, _b;
  const serverUser = await serverSupabaseUser(event);
  if ((serverUser == null ? void 0 : serverUser.app_metadata.user_role) !== "auditor") {
    throw createError({
      statusMessage: `You do not have access to use "${event.path}" API.`
    });
  }
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.config)) {
    throw createError({
      message: "Config is missing.",
      statusCode: 422
    });
  }
  try {
    const config = useConfig(body.config);
    if (!((_a = config.pages) == null ? void 0 : _a.length) || !((_b = config.viewports) == null ? void 0 : _b.length)) {
      return createError({
        status: 400,
        message: "Missing params."
      });
    }
    for (const viewport of config.viewports) {
      doTest(String(body.id), viewport, config);
    }
  } catch (err) {
    console.error(err);
    return createError({
      status: 500,
      message: `Req processing error. ${(err == null ? void 0 : err.message) || ""}`
    });
  }
  return true;
});

export { test_post as default };
//# sourceMappingURL=test.post.mjs.map
