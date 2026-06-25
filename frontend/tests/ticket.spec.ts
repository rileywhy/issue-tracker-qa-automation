import { test, expect } from '@playwright/test';
import { makeTestUser, registerUser, loginUser } from './helpers/users';

test.beforeEach(async ({ page }) => {
  const user = makeTestUser();

  await registerUser(page, user);
  await loginUser(page, user);

  await page.getByRole('link', { name: 'Tickets' }).click();
  await expect(
    page.getByRole('heading', { name: 'Issue Tracker' })
  ).toBeVisible();
});

test('creates a ticket', async ({ page }) => {
  const title = `Ticket ${Date.now()}`;

  const form = page.locator('form.create-ticket-form');

  await form.getByPlaceholder('Title').fill(title);
  await form.getByPlaceholder('Description').fill(
    'Playwright created this ticket'
  );
  await form.locator('select').nth(0).selectOption('OPEN');
  await form.locator('select').nth(1).selectOption('HIGH');
  await form.getByPlaceholder('Assignee').fill('QA Bot');

  await Promise.all([
    page.waitForResponse(
      response =>
        response.url().includes('/ticket') &&
        response.request().method() === 'POST'
    ),
    page.waitForResponse(
      response =>
        response.url().includes('/tickets') &&
        response.request().method() === 'GET'
    ),
    form.getByRole('button', { name: 'Create Ticket' }).click(),
  ]);

  const card = page.locator('.ticket-card').filter({ hasText: title });

  await expect(card).toBeVisible({ timeout: 10000 });
  await expect(card).toContainText('OPEN - HIGH');
  await expect(card).toContainText('Assigned to: QA Bot');

  await card.getByRole('button', { name: 'Show Details' }).click();
  await expect(card).toContainText('Playwright created this ticket');
});

test('filters tickets by search, status, and priority', async ({ page }) => {
  const firstTitle = `Bug ${Date.now()}`;
  const secondTitle = `Outage ${Date.now() + 1}`;

  const form = page.locator('form.create-ticket-form');

  await form.getByPlaceholder('Title').fill(firstTitle);
  await form.getByPlaceholder('Description').fill('Searchable frontend bug');
  await form.locator('select').nth(0).selectOption('OPEN');
  await form.locator('select').nth(1).selectOption('LOW');
  await form.getByPlaceholder('Assignee').fill('Alice');

  await Promise.all([
    page.waitForResponse(
      response =>
        response.url().includes('/ticket') &&
        response.request().method() === 'POST'
    ),
    page.waitForResponse(
      response =>
        response.url().includes('/tickets') &&
        response.request().method() === 'GET'
    ),
    form.getByRole('button', { name: 'Create Ticket' }).click(),
  ]);

  await form.getByPlaceholder('Title').fill(secondTitle);
  await form.getByPlaceholder('Description').fill('Critical backend outage');
  await form.locator('select').nth(0).selectOption('IN_PROGRESS');
  await form.locator('select').nth(1).selectOption('CRITICAL');
  await form.getByPlaceholder('Assignee').fill('Bob');

  await Promise.all([
    page.waitForResponse(
      response =>
        response.url().includes('/ticket') &&
        response.request().method() === 'POST'
    ),
    page.waitForResponse(
      response =>
        response.url().includes('/tickets') &&
        response.request().method() === 'GET'
    ),
    form.getByRole('button', { name: 'Create Ticket' }).click(),
  ]);

  const filters = page.locator('.filters');

  await filters.getByPlaceholder('Search').fill('outage');
  await expect(
    page.locator('.ticket-card').filter({ hasText: secondTitle })
  ).toBeVisible();
  await expect(
    page.locator('.ticket-card').filter({ hasText: firstTitle })
  ).toHaveCount(0);

  await filters.getByPlaceholder('Search').fill('');
  await filters.locator('select').nth(0).selectOption('IN_PROGRESS');
  await expect(
    page.locator('.ticket-card').filter({ hasText: secondTitle })
  ).toBeVisible();
  await expect(
    page.locator('.ticket-card').filter({ hasText: firstTitle })
  ).toHaveCount(0);

  await filters.locator('select').nth(0).selectOption('ALL');
  await filters.locator('select').nth(1).selectOption('CRITICAL');
  await expect(
    page.locator('.ticket-card').filter({ hasText: secondTitle })
  ).toBeVisible();
  await expect(
    page.locator('.ticket-card').filter({ hasText: firstTitle })
  ).toHaveCount(0);
});

test('deletes a ticket', async ({ page }) => {
  const title = `Delete Me ${Date.now()}`;

  const form = page.locator('form.create-ticket-form');

  await form.getByPlaceholder('Title').fill(title);
  await form.getByPlaceholder('Description').fill(
    'This ticket should be removed'
  );
  await form.locator('select').nth(0).selectOption('OPEN');
  await form.locator('select').nth(1).selectOption('MEDIUM');
  await form.getByPlaceholder('Assignee').fill('Cleanup Bot');

  await Promise.all([
    page.waitForResponse(
      response =>
        response.url().includes('/ticket') &&
        response.request().method() === 'POST'
    ),
    page.waitForResponse(
      response =>
        response.url().includes('/tickets') &&
        response.request().method() === 'GET'
    ),
    form.getByRole('button', { name: 'Create Ticket' }).click(),
  ]);

  const card = page.locator('.ticket-card').filter({ hasText: title });

  await expect(card).toBeVisible({ timeout: 10000 });

  await Promise.all([
    page.waitForResponse(
      response =>
        response.url().includes('/ticket/') &&
        response.request().method() === 'DELETE'
    ),
    page.waitForResponse(
      response =>
        response.url().includes('/tickets') &&
        response.request().method() === 'GET'
    ),
    card.getByRole('button', { name: 'Delete Ticket' }).click(),
  ]);

  await expect(
    page.locator('.ticket-card').filter({ hasText: title })
  ).toHaveCount(0);
});