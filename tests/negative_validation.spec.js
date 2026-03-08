const { test, expect } = require('@playwright/test');

test.describe('InterviewGod AI - Negative & Validation Tests', () => {

    test('Field Validation: Extreme Input Lengths', async ({ page }) => {
        await page.goto('/signup');

        const extremeEmail = 'test'.repeat(500) + '@example.com';
        await page.locator('#base-input').pressSequentially(extremeEmail, { delay: 10 });
        await page.click('button:has-text("Continue")');

        await expect(page).toHaveURL(/.*code-verification/);
        console.log('Result: System accepts 2000+ character email without error.');
    });

    test('Field Validation: Malformed Email', async ({ page }) => {
        await page.goto('/signup');

        await page.locator('#base-input').pressSequentially('not-an-email', { delay: 10 });
        await page.click('button:has-text("Continue")');

        const errorMessage = page.locator('text=Invalid email');
        if (await errorMessage.isVisible()) {
            console.log('Success: System correctly blocked malformed email.');
        } else {
            console.log('Warning: System accepted malformed email or lacks clear error message.');
        }
    });

    test('Job Creation: Boundary conditions for Experience', async ({ page }) => {
        await page.goto('/login');
        await page.locator('#base-input').pressSequentially('sainikithap@gmail.com', { delay: 10 });
        await page.click('button:has-text("Continue")');

        console.log('Waiting for manual OTP/Dashboard access...');
        await page.pause();

        await page.goto('/dashboard/jobs/create_job');

        await page.fill('input[placeholder="Job"]', 'Senior Hallucination Tester');

        await page.fill('input[placeholder="eg. 2-4 years"]', '-5 years');
        await page.click('button:has-text("Select Type")');
        await page.click('text=Full Time');
        await page.click('button:has-text("Create Job")');

        const error = page.locator('.error');
        if (await error.isVisible()) {
            console.log('Success: Negative experience blocked.');
        } else {
            console.log('Result: System accepted negative years of experience.');
        }
    });

    test('AI Logic: Impossible Job Title Corner Case', async ({ page }) => {
        await page.goto('/dashboard/jobs/create_job');

        await page.fill('input[placeholder="Job"]', 'Professional Unicorn Tamer at Mars Colony');
        await page.fill('input[placeholder="eg. 2-4 years"]', '500 years');
        await page.click('button:has-text("Select Type")');
        await page.click('text=Full Time');
        await page.click('button:has-text("Create Job")');

        await page.waitForSelector('button:has-text("Create AI Interview")');
        await page.click('button:has-text("Create AI Interview")');

        console.log('Observing AI Behavior for impossible job title...');
        await page.click('button:has-text("Technical + Behavioral")');

        const interviewContent = page.locator('.ai-generated-content');
        if (await interviewContent.isVisible()) {
            const text = await interviewContent.innerText();
            console.log(`AI Result for "Unicorn Tamer": ${text.substring(0, 100)}...`);
        }
    });

});
