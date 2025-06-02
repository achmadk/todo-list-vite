import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Todo List')
})

test('test toggle dark mode', async ({ page }) => {
  await page.goto('/')

  // <-- [START] light to dark mode -->
  await page.getByTestId('button-dark-mode').click()

  await expect(page.locator('html')).toHaveClass('dark')
  // <-- [END] light to dark mode -->

  // <-- [START] dark to light mode -->
  await page.getByTestId('button-dark-mode').click()

  await expect(page.locator('html')).not.toHaveClass('dark')
  // <-- [END] dark to light mode -->
})

test('test todo management', async ({ page }) => {
  await page.goto('/')

  // <-- [START] create todo -->
  await page.locator('input[name="name"]').fill('example todo')

  await page.getByTestId('button-submit-todo').click()

  await expect(
    page.getByTestId('todo-list').locator('.flex.items-center')
  ).toHaveCount(1)
  // <-- [END] create todo -->

  // <-- [START] update todo -->
  await page.getByTestId('button-edit').click()

  await page.getByTestId('input-update-todo-text').fill('example todo updated')

  await page.getByTestId('button-save').click()

  await expect(
    page.getByTestId('todo-list').locator('.flex.items-center')
  ).toHaveCount(1)
  // <-- [START] update todo -->

  // <-- [START] toggle todo -->
  await page.getByTestId('button-toggle').click()

  await expect(
    page.getByTestId('todo-list').locator('.flex.items-center')
  ).toHaveCount(1)
  // <-- [END] toggle todo -->

  // <-- [START] delete todo -->
  await page.getByTestId('button-delete').click()

  await expect(
    page.getByTestId('todo-list').locator('.flex.items-center')
  ).toHaveCount(0)
  // <-- [END] delete todo -->
})
