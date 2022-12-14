const { test, expect } = require("@playwright/test");

test("createFlag", async ({ page }) => {
  await page.goto("/");
  await page.click("[data-testid='new-flag']");
  await page.type("[placeholder='Flag name']", "Awesome new feature");
  await page.type(
    "[placeholder='Flag description']",
    "Our product manager cannot wait to ship this!"
  );
  await page.click("[data-testid='create-flag']");
  await page.click('[aria-label="breadcrumbs"] .router-link-active');
  const locator = page.locator("a", { hasText: "awesome-new-feature" });
  await expect(locator).toBeVisible();
  await locator.click();
});

test("createFlagDisallowSpecialChars", async ({ page }) => {
  await page.goto("/");
  await page.click("[data-testid='new-flag']");
  await page.type("[placeholder='Flag name']", "My flag with colons");
  await page.type("[placeholder='Flag key']", "colons:are:not:allowed");
  await page.type(
    "[placeholder='Flag description']",
    "This should not be saved"
  );
  const locator = page.locator("p", {
    hasText: "Only letters, numbers, hypens and underscores allowed",
  });
  await expect(locator).toBeVisible();
});
