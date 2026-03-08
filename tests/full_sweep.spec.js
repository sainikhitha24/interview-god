const { test, expect } = require('@playwright/test');

test.describe('InterviewGod AI - Full Feature Sweep', () => {

    const publicFeatures = [
        { name: 'AI Interview', url: '/feature/ai-interview' },
        { name: 'AI Call Screening', url: '/feature/ai-call-screening' },
        { name: 'AI Assessment', url: '/feature/ai-assessment' },
        { name: 'Resume Screening', url: '/feature/resume-screening' },
        { name: 'LinkedIn Extension', url: '/feature/linkedin-extension' },
        { name: 'Psychometric Analysis', url: '/feature/psychometric-analysis' },
        { name: 'Situational Analysis', url: '/feature/situational-analysis' },
        { name: 'Integrations', url: '/feature/integrations' },
        { name: 'Cheating Detection', url: '/feature/cheating-detection' },
        { name: 'Naukri Extension', url: '/feature/naukri-extension' },
    ];

    const industries = [
        { name: 'Manufacturing', url: '/industries/manufacturing' },
        { name: 'Retail & E-Commerce', url: '/industries/retailEcommerce' },
        { name: 'Consulting', url: '/industries/consulting' },
        { name: 'Financial Services', url: '/industries/financial_services' },
        { name: 'Healthcare', url: '/industries/healthcare' },
        { name: 'Logistics', url: '/industries/logistics' },
        { name: 'Construction', url: '/industries/construction' },
        { name: 'Pharmaceuticals', url: '/industries/pharmaceuticals' },
    ];

    for (const feature of publicFeatures) {
        test(`Verify Public Feature: ${feature.name}`, async ({ page }) => {
            await page.goto(feature.url);
            await expect(page).toHaveURL(new RegExp(feature.url));

            await expect(page.locator('h1, h2')).not.toHaveCount(0);
            console.log(`Verified feature page: ${feature.name}`);
        });
    }

    for (const industry of industries) {
        test(`Verify Industry Use Case: ${industry.name}`, async ({ page }) => {
            await page.goto(industry.url);
            await expect(page).toHaveURL(new RegExp(industry.url));
            console.log(`Verified industry page: ${industry.name}`);
        });
    }

    test('Dashboard Sidebar Navigation Check', async ({ page }) => {

        await page.goto('/login');
        await page.fill('input[name="email"]', 'maka.sitaram@gmail.com');
        await page.click('button:has-text("Continue")');

        console.log('Login triggered.');



        await page.goto('/dashboard');
        await expect(page).toHaveURL(/.*dashboard/);

        const sidebarLinks = [
            { text: 'Dashboard', href: '/dashboard' },
            { text: 'Jobs', href: '/dashboard/jobs' },
            { text: 'Candidates', href: '/dashboard/candidates' },
            { text: 'Settings', href: '/dashboard/settings' },
        ];

        for (const link of sidebarLinks) {
            await page.click(`a[href="${link.href}"]`);
            await expect(page).toHaveURL(new RegExp(link.href));
            console.log(`Dashboard Sidebar Verified: ${link.text}`);
        }
    });

});
