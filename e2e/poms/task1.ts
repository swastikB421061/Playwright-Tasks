import { expect, Page } from "@playwright/test";
import {TASK1SELECTOR} from '../constants/selectors/task1Selectors';
import { TASK1TEXT } from "../constants/texts/task1texts";

export class Task1 {
    constructor(private page: Page) {}

    async buildPage() {
        await this.page.goto(TASK1SELECTOR.urls.home);
        await this.page.getByTestId(TASK1SELECTOR.testIds.addFormButton).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.startFromScratchButton).click();
    }
    
    async buildFor1() {
        await this.page.getByTestId(TASK1SELECTOR.testIds.addFullNameElement).click();
        await expect(this.page.getByTestId(TASK1SELECTOR.testIds.fullNamePreviewGroup)).toBeVisible();
        await this.page.getByTestId(TASK1SELECTOR.testIds.addPhoneNumberElement).click();
        await expect(this.page.getByTestId(TASK1SELECTOR.testIds.phonePreviewGroup)).toBeVisible();

        await this.page.getByTestId(TASK1SELECTOR.testIds.publishButton).click();
        const previewPromise = this.page.waitForEvent("popup");
        await this.page.getByTestId(TASK1SELECTOR.testIds.publishPreviewButton).click();
        const page2 = await previewPromise;
        return page2;
    }

    async submit(page2: Page) {
        await expect(page2.getByTestId(TASK1SELECTOR.testIds.phoneGroup)).toBeVisible();
        await expect(page2.getByTestId(TASK1SELECTOR.testIds.fullNameGroup)).toBeVisible();
        await expect(page2.getByTestId(TASK1SELECTOR.testIds.emailGroup)).toBeVisible();
        await page2.getByTestId(TASK1SELECTOR.testIds.startOrSubmitButton).click();
        await expect(page2.getByText(TASK1TEXT.texts.phoneNumberInvalid)).toBeVisible();
        await expect(page2.getByText(TASK1TEXT.texts.firstNameRequired)).toBeVisible();
        await expect(page2.getByText(TASK1TEXT.texts.lastNameRequired)).toBeVisible();
        await expect(page2.getByText(TASK1TEXT.texts.emailRequired)).toBeVisible();

        await page2.getByTestId(TASK1SELECTOR.testIds.emailTextField).fill(TASK1TEXT.texts.email)
        await page2.getByTestId(TASK1SELECTOR.testIds.firstNameTextField).fill(TASK1TEXT.texts.firstName)
        await page2.getByTestId(TASK1SELECTOR.testIds.lastNameTextField).fill(TASK1TEXT.texts.lastName)
        await page2.getByTestId(TASK1SELECTOR.testIds.phoneNumberInputField).fill(TASK1TEXT.texts.phoneNo)
        await page2.getByTestId(TASK1SELECTOR.testIds.startOrSubmitButton).click();
        await expect(page2.getByTestId(TASK1SELECTOR.testIds.thankYouPageContent)).toBeVisible();

        await this.page.bringToFront();
        await this.page.waitForTimeout(TASK1SELECTOR.timeouts.short);
        await this.page.getByTestId(TASK1SELECTOR.testIds.submissionsTab).click();
        await expect(this.page.getByText(TASK1TEXT.texts.email)).toBeVisible();
    }

    async deleteForm() {
        await this.page.bringToFront();
        await this.page.locator(`//button[@data-testid='${TASK1SELECTOR.testIds.neetoMoleculesMenuButton}']`).click()
        await this.page.getByTestId(TASK1SELECTOR.testIds.formDeleteButton).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.deleteArchiveAlertArchiveCheckbox).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.deleteArchiveAlertDeleteButton).click();
    }

    async buildFor2() {
        const contentField = this.page.getByTestId(TASK1SELECTOR.testIds.contentTextField);

        await this.page.getByTestId(TASK1SELECTOR.testIds.addSingleChoiceElement).click();
        await expect(this.page.getByTestId(TASK1SELECTOR.testIds.singleChoiceOptionsContainer)).toBeVisible();
        await contentField.click();
        await contentField.fill(TASK1TEXT.texts.singleChoice);

        await this.page.getByTestId(TASK1SELECTOR.testIds.addMultiChoiceElement).click();
        await expect(this.page.getByTestId(TASK1SELECTOR.testIds.multiChoiceOptionsContainer)).toBeVisible();
        await contentField.click();
        await contentField.fill(TASK1TEXT.texts.multipleChoice);

        await this.page.getByTestId(TASK1SELECTOR.testIds.singleChoiceOptionsContainer).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.addBulkOptionLink).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.bulkAddOptionsTextarea).fill(TASK1TEXT.texts.options);
        await this.page.getByTestId(TASK1SELECTOR.testIds.bulkAddOptionsDoneButton).click();
        await expect(this.page.getByTestId(TASK1SELECTOR.testIds.formSingleChoiceOption)).toHaveCount(10);
        await this.page.getByTestId(TASK1SELECTOR.testIds.randomizeSwitchLabel).click();

        const originalOptions = await this.page.getByTestId(TASK1SELECTOR.testIds.singleChoiceOption).allTextContents();

        await this.page.getByTestId(TASK1SELECTOR.testIds.multiChoiceOptionsContainer).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.addOptionLink).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.addOptionLink).click();
        await expect(this.page.getByTestId(TASK1SELECTOR.testIds.formMultipleChoiceOption)).toHaveCount(6);
        await this.page.getByTestId(TASK1SELECTOR.testIds.hideQuestionToggleLabel).click();
        await this.page.waitForTimeout(TASK1SELECTOR.timeouts.long);

        await this.page.getByTestId(TASK1SELECTOR.testIds.publishButton).click();
        const page2Promise = this.page.waitForEvent('popup');
        await this.page.getByTestId(TASK1SELECTOR.testIds.publishPreviewButton).click();
        const page2 = await page2Promise;

        await expect(page2.getByTestId(TASK1SELECTOR.testIds.formMultipleChoiceOption)).toBeHidden();

        const displayedOptions = await page2.getByTestId(TASK1SELECTOR.testIds.singleChoiceOption).allTextContents();
        expect(JSON.stringify(originalOptions)).not.toBe(JSON.stringify(displayedOptions));

        await this.page.getByTestId(TASK1SELECTOR.testIds.multiChoiceOptionsContainer).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.hideQuestionToggleLabel).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.publishButton).click();
        const page3Promise = this.page.waitForEvent('popup');
        await this.page.getByTestId(TASK1SELECTOR.testIds.publishPreviewButton).click();
        const page3 = await page3Promise;
        await page2.waitForTimeout(TASK1SELECTOR.timeouts.long);
        expect(page3.getByText(TASK1TEXT.texts.multipleChoice)).toBeVisible();
        await page3.waitForTimeout(TASK1SELECTOR.timeouts.medium);
    }

    async publishForm() {
        await this.page.getByTestId(TASK1SELECTOR.testIds.publishButton).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.moreDropdownIcon).click();
        await this.page.getByTestId(TASK1SELECTOR.testIds.analyticsMoreTab).click();
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.visitsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText("0");
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.startsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText("0");
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.submissionsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText("0");
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.completionRateMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText("0%");
    }

    async afterVisit() {
        const initialVisitCount = Number(
            await this.page.getByTestId(TASK1SELECTOR.testIds.visitsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount).textContent()
        );
        const page1Promise = this.page.waitForEvent("popup");
        await this.page.getByTestId(TASK1SELECTOR.testIds.publishPreviewButton).click();
        const page1 = await page1Promise;
        await this.page.waitForTimeout(TASK1SELECTOR.timeouts.medium);
        await this.page.reload();
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.visitsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText(String(initialVisitCount + 1));
        await page1.close();
    }

    async afterStart() {
        const initialStartCount = Number(
            await this.page.getByTestId(TASK1SELECTOR.testIds.startsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount).textContent()
        );
        const initialVisitCount = Number(
            await this.page.getByTestId(TASK1SELECTOR.testIds.visitsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount).textContent()
        );
        const page2Promise = this.page.waitForEvent("popup");
        await this.page.getByTestId(TASK1SELECTOR.testIds.publishPreviewButton).click();
        const page2 = await page2Promise;
        await page2.getByTestId(TASK1SELECTOR.testIds.emailTextField).fill(TASK1TEXT.texts.email);
        await this.page.waitForTimeout(TASK1SELECTOR.timeouts.medium);
        await this.page.reload();
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.visitsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText(String(initialVisitCount + 1));
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.startsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText(String(initialStartCount + 1));
        return await page2.url();
    }

    async afterSubmit() {
        const initialStartCount = Number(
            await this.page.getByTestId(TASK1SELECTOR.testIds.startsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount).textContent()
        );
        const initialVisitCount = Number(
            await this.page.getByTestId(TASK1SELECTOR.testIds.visitsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount).textContent()
        );
        const initialSubmissions = Number(
            await this.page.getByTestId(TASK1SELECTOR.testIds.submissionsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount).textContent()
        );
        const page3Promise = this.page.waitForEvent("popup");
        await this.page.getByTestId(TASK1SELECTOR.testIds.publishPreviewButton).click();
        const page3 = await page3Promise;
        await page3.getByTestId(TASK1SELECTOR.testIds.emailTextField).fill(TASK1TEXT.texts.email);
        await page3.getByTestId(TASK1SELECTOR.testIds.startOrSubmitButton).click();
        await this.page.reload();
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.visitsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText(String(initialVisitCount + 1));
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.startsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText(String(initialStartCount));
        await expect(
            this.page.getByTestId(TASK1SELECTOR.testIds.submissionsMetric).getByTestId(TASK1SELECTOR.testIds.insightsCount)
        ).toHaveText(String(initialSubmissions + 1));
        await page3.close();
    }
}