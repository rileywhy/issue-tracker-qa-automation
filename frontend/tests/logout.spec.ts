import { test, expect } from "@playwright/test";
import { makeTestUser, registerUser, loginUser } from "./helpers/users";


test("register a user", async ({ page }) => {
    const user = makeTestUser();
    await registerUser(page, user);


    await loginUser(page,user);

    await page
  .getByRole('button', {
    name: new RegExp(`${user.firstName}\\s+${user.lastName}`, 'i'),
  })
  .click();

    await page.getByRole('button', {name: `Logout`}).click();

    await expect(
  page.locator('.account-menu').getByText(`${user.firstName} ${user.lastName}`)
).not.toBeVisible();
     

    
});