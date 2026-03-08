const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('InterviewGod AI Automation Suite', () => {

    test('Signup Validation and Flow', async ({ page }) => {
        await page.goto('/signup');


        const longEmail = 'a'.repeat(1001) + '@test.com';
        await page.locator('#base-input').pressSequentially(longEmail, { delay: 10 });
        await page.click('button:has-text("Continue")');


        await expect(page).toHaveURL(/.*code-verification/);
        console.log('Confirmed: Long email accepted.');
    });

    test('Login and Scheduling Flow', async ({ page }) => {

        await page.goto('/login');
        const email = 'sainikithap@gmail.com';
        await page.locator('#base-input').pressSequentially(email, { delay: 10 });
        await page.click('button:has-text("Continue")');


        console.log('----------------------------------------------------------');
        console.log('ACTION REQUIRED: Enter the 6-digit code in the browser.');
        console.log('----------------------------------------------------------');
        await page.pause();


        await expect(page).toHaveURL(/.*dashboard/);


        if (await page.isVisible('text=maka')) {
            await page.click('text=maka');
        }


        await page.click('a[href="/dashboard/jobs"]');
        await page.click('a[href="/dashboard/jobs/create_job"]');

        await page.fill('input[placeholder="Job"]', 'QA Automation Engineer');
        await page.fill('input[placeholder="eg. 2-4 years"]', '3 years');

        await page.click('button:has-text("Select Type")');
        await page.click('text=Full Time');

        await page.click('button:has-text("Create Job")');

        const jobTypeRequired = page.locator('text=Job Type is required');
        if (await jobTypeRequired.isVisible()) {
            console.log('Corner Case: Job Type validation is working.');
        } else {
            console.log('Corner Case: Proceeded without Job Type (potential issue).');
        }

        await page.click('button:has-text("Select Type")');
        await page.click('text=Full Time');
        await page.click('button:has-text("Create Job")');


        await page.waitForSelector('button:has-text("Create AI Interview")');
        await page.click('button:has-text("Create AI Interview")');
        await page.click('button:has-text("Technical + Behavioral")');


        await page.click('button:has-text("Settings")');
        await page.click('button:has-text("Intermediate")');

        await page.click('button:has-text("Continue")');

        console.log('Successfully automated Interview Scheduling flow.');
    });

});
