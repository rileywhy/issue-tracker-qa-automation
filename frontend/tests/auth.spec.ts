import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByLabel("email").fill("johnsmith@test.com");

  await page.getByLabel("password").fill("password");

  await page.getByRole("button", {name: "submit"}).click();

  await expect(page.getByText("john smith")).toBeVisible(); 


});