import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByPlaceholder("Email").fill("johnsmith@test.com");

  await page.getByPlaceholder("Password").fill("password");

  await page.getByRole("button", ).click();

  await expect(page.getByText("john smith")).toBeVisible(); 


});