import { chromium } from "playwright";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, "..");
const PORT = 4322;
const BASE = `http://localhost:${PORT}`;
const OUT_DIR = join(PROJECT_DIR, "screenshots");

async function waitForServer(url, timeout = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not start within ${timeout}ms`);
}

async function main() {
  // Use dev server for full JS support
  const server = spawn("pnpm", ["astro", "dev", "--port", String(PORT)], {
    cwd: PROJECT_DIR,
    stdio: "pipe",
    shell: true,
  });

  server.stderr.on("data", (d) => {
    const msg = d.toString();
    if (msg.includes("Error")) console.error("server:", msg);
  });

  try {
    await waitForServer(BASE);
    console.log("Server ready");

    const browser = await chromium.launch({ headless: true });

    // Helper: scroll through entire page to trigger IntersectionObserver
    async function scrollToReveal(page) {
      const totalHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = page.viewportSize().height;
      for (let y = 0; y < totalHeight; y += viewportHeight * 0.7) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(200);
      }
      // Scroll back to top for full-page screenshot
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
    }

    // Desktop
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktop.goto(BASE, { waitUntil: "networkidle" });
    await desktop.waitForTimeout(1200);
    await scrollToReveal(desktop);
    await desktop.screenshot({ path: join(OUT_DIR, "homepage-desktop.png"), fullPage: true });
    console.log("✓ homepage-desktop.png");

    // Mobile
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobile.goto(BASE, { waitUntil: "networkidle" });
    await mobile.waitForTimeout(1200);
    await scrollToReveal(mobile);
    await mobile.screenshot({ path: join(OUT_DIR, "homepage-mobile.png"), fullPage: true });
    console.log("✓ homepage-mobile.png");

    // No extra pages — single landing page

    await browser.close();
    console.log("Done!");
  } finally {
    server.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
