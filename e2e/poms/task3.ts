import { expect, Page } from "@playwright/test";
import {TASK3SELECTOR} from '../constants/selectors/task3selectors';
import {TASK3TEXT} from '../constants/texts/task3texts';

export class Task3 {
    constructor(private page: Page) {}

    async buildPage() {
        await this.page.getByTestId(TASK3SELECTOR.testIds.addFormButton).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.startFromScratchButton).click();
    }

    async addLogo() {
        await this.page.getByTestId(TASK3SELECTOR.testIds.addLogoElement).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.openAssetLibraryButton).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.neetoImageUploaderMyImagesTab).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.niuLibraryImage0).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.selectOriginalImageSwitch).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.neetoImageUploaderCropSubmitButton).click();
        await expect(this.page.getByTestId(TASK3SELECTOR.testIds.logoImage)).toBeVisible();
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.medium);
    }

    async createForm() {
        const inputField = this.page.getByTestId(TASK3SELECTOR.testIds.nuiInputField);
        const contentField = this.page.getByTestId(TASK3SELECTOR.testIds.contentTextField);

        await inputField.waitFor({ state: "visible" });
        await inputField.click();
        await inputField.fill("opi");
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.short);
        await this.page.getByTestId(TASK3SELECTOR.testIds.addOpinionScaleElement).click();
        await contentField.waitFor({ state: "visible" });
        await this.page.getByTestId(TASK3SELECTOR.testIds.formOpinionScale).click();
        await contentField.click();
        await contentField.fill(TASK3TEXT.texts.opinionScale);

        await inputField.waitFor({ state: "visible" });
        await inputField.click();
        await inputField.fill("star");
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.short);
        await this.page.getByTestId(TASK3SELECTOR.testIds.addStarRatingElement).click();
        await contentField.waitFor({ state: "visible" });
        await this.page.getByTestId(TASK3SELECTOR.testIds.previewRatingIcons).click();
        await contentField.fill(TASK3TEXT.texts.starRating);

        await inputField.waitFor({ state: "visible" });
        await inputField.click();
        await inputField.fill("mat");
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.short);
        await this.page.getByTestId(TASK3SELECTOR.testIds.addMatrixElement).click();
        await contentField.waitFor({ state: "visible" });
        await this.page.getByTestId(TASK3SELECTOR.testIds.formMatrixTable).click();
        await contentField.fill(TASK3TEXT.texts.matrix);
    }

    async deleteForm() {
        await this.page.getByTestId(TASK3SELECTOR.testIds.buildTab).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.nuiDropdownIcon).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.formDeleteButton).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.deleteArchiveAlertArchiveCheckbox).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.deleteArchiveAlertDeleteButton).click();
    }

    async submitForm() {
        await this.page.getByTestId(TASK3SELECTOR.testIds.publishButton).click();
        const previewPromise = this.page.waitForEvent("popup");
        await this.page.getByTestId(TASK3SELECTOR.testIds.publishPreviewButton).click();
        const page2 = await previewPromise;
        await page2.getByTestId(TASK3SELECTOR.testIds.emailTextField).fill(TASK3TEXT.texts.email);
        await page2.locator('path').nth(2).click();
        await page2.getByText('6').click();
        await page2.getByRole('row', { name: 'Row 1' }).locator('span').first().click();
        await page2.getByRole('row', { name: 'Row 2' }).locator('span').nth(1).click();
        await page2.getByTestId(TASK3SELECTOR.testIds.startOrSubmitButton).click();
        await expect(page2.getByTestId(TASK3SELECTOR.testIds.thankYouPageContent)).toBeVisible();
    }

    async openPdf() {
        await this.page.bringToFront();
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.short);
        await this.page.getByTestId(TASK3SELECTOR.testIds.submissionsTab).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.submittedResponse1).hover();
        await this.page.getByRole('button', { name: 'View' }).click();
        await this.page.locator(TASK3TEXT.texts["nui-drop-down"]).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.downloadAsPdfRadioItem).click();
        const page2Promise = this.page.waitForEvent('popup');
        await this.page.getByTestId(TASK3SELECTOR.testIds.actionDropdownBtn).click();
        const page2 = await page2Promise;
        await page2.bringToFront();
        await page2.waitForTimeout(TASK3SELECTOR.timeouts.medium);
        await this.page.bringToFront();
        await this.page.getByTestId(TASK3SELECTOR.testIds.paneCloseButton).click();
    }

    async createForm3() {
        const contentField = this.page.getByTestId(TASK3SELECTOR.testIds.contentTextField);

        await this.page.getByTestId(TASK3SELECTOR.testIds.addStarRatingElement).click();
        await expect(this.page.getByTestId(TASK3SELECTOR.testIds.previewRatingIcons)).toBeVisible();
        await contentField.click();
        await contentField.fill(TASK3TEXT.texts.rateCustomerService);

        await this.page.getByTestId(TASK3SELECTOR.testIds.addMultiChoiceElement).click();
        await expect(this.page.getByTestId(TASK3SELECTOR.testIds.multipleChoicePreviewGroup)).toBeVisible();
        await contentField.click();
        await contentField.fill(TASK3TEXT.texts.preferredLanguage);

        await this.page.getByTestId(TASK3SELECTOR.testIds.addMatrixElement).click();
        await expect(this.page.getByTestId(TASK3SELECTOR.testIds.formMatrixTable)).toBeVisible();
        await contentField.click();
        await contentField.fill(TASK3TEXT.texts.rateCustomerRepresentative);

        await this.page.getByTestId(TASK3SELECTOR.testIds.previewRatingIcons).click();
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.short);
        await this.page.getByText(TASK3TEXT.texts.advancedProperties, { exact: true }).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.fieldCodeTextField).fill(TASK3TEXT.texts.customer_service);

        await this.page.getByTestId(TASK3SELECTOR.testIds.multipleChoicePreviewGroup).click();
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.short);
        await this.page.getByTestId(TASK3SELECTOR.testIds.optionInput0).fill(TASK3TEXT.texts.Python);
        await this.page.getByTestId(TASK3SELECTOR.testIds.optionInput1).fill(TASK3TEXT.texts.JavaScript);
        await this.page.getByTestId(TASK3SELECTOR.testIds.optionInput2).fill(TASK3TEXT.texts.C);
        await this.page.getByTestId(TASK3SELECTOR.testIds.optionInput3).fill(TASK3TEXT.texts.Ruby);
        await expect(this.page.getByTestId(TASK3SELECTOR.testIds.formMultipleChoiceOption)).toHaveCount(4);
        await this.page.getByText(TASK3TEXT.texts.advancedProperties, { exact: true }).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.fieldCodeTextField).fill(TASK3TEXT.texts.languages);

        await this.page.getByTestId(TASK3SELECTOR.testIds.matrixPreviewGroup).click();
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.short);
        await this.page.getByPlaceholder("Row 1").fill(TASK3TEXT.texts.friendlyness);
        await this.page.getByPlaceholder("Row 2").fill(TASK3TEXT.texts.knowledge);
        await this.page.getByText(TASK3TEXT.texts.addRow).click();
        await expect(this.page.getByPlaceholder("Row 3")).toBeVisible();
        await this.page.getByPlaceholder("Row 3").fill(TASK3TEXT.texts.quickness);
        await this.page.waitForTimeout(TASK3SELECTOR.timeouts.medium);
        await this.page.getByPlaceholder("Column 1").fill(TASK3TEXT.texts.excellent);
        await this.page.getByPlaceholder("Column 2").fill(TASK3TEXT.texts.veryGood);
        await this.page.getByText(TASK3TEXT.texts.addColumn).click();
        await expect(this.page.getByPlaceholder("Column 3")).toBeVisible();
        await this.page.getByPlaceholder("Column 3").fill(TASK3TEXT.texts.average);
        await this.page.getByText(TASK3TEXT.texts.advancedProperties, { exact: true }).click();
        await this.page.getByTestId(TASK3SELECTOR.testIds.fieldCodeTextField).fill("customer_rep");
    }

    async publishForm() {
        await this.page.getByTestId(TASK3SELECTOR.testIds.publishButton).click();
        const previewPromise = this.page.waitForEvent("popup");
        await this.page.getByTestId(TASK3SELECTOR.testIds.publishPreviewButton).click();
        const page2 = await previewPromise;
        const url = await page2.url();
        await page2.goto(url + TASK3TEXT.texts.options);
        await page2.getByTestId(TASK3SELECTOR.testIds.startOrSubmitButton).click();
        await expect(page2.getByTestId(TASK3SELECTOR.testIds.thankYouPageContent)).toBeVisible();
    }
}