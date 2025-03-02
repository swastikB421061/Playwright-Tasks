import {Page,expect} from "@playwright/test"
import { LOGINCONSTANTS } from "../constants/selectors/loginselectors";


interface user{
    email:string;
    password:string;
    username:string;
}

export class LoginPage{
    page:Page
    constructor(page:Page){
        this.page=page
    }
    async loginAndVerifyUser({email,password,username}:user){
        await this.page.goto("/");
        await this.page.getByTestId(LOGINCONSTANTS.email).fill(email)
        await this.page.getByTestId(LOGINCONSTANTS.password).fill(password)

        await expect(this.page.getByTestId(LOGINCONSTANTS.loginButton)).toBeEnabled({ timeout: 10000 });
        await this.page.getByTestId(LOGINCONSTANTS.loginButton).click();

        await expect(this.page.getByTestId(LOGINCONSTANTS.profile)).toBeVisible({ timeout: 10000 });
    }   
}