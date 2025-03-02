import {test,expect} from "../fixture";
import { STORAGE_STATE } from "../../playwright.config";

test.describe("Login Tests", () => {

    test("Login with valid credentials", async ({ loginPage }) => {
        await loginPage.loginAndVerifyUser({
            email: process.env.ADMIN_EMAIL!,
            password: process.env.ADMIN_PASSWORD!,
            username: process.env.USERNAME!,
        });
        

        await loginPage.page.context().storageState({ path: STORAGE_STATE });
    })
    
        
});