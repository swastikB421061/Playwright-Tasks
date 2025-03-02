import { test as base, expect } from "@playwright/test";
import {LoginPage} from "../poms/login";
import { Task1 } from "../poms/task1";
import { Task2 } from "../poms/task2";
import { Task3 } from "../poms/task3";



interface ExtendedFixtures {
    loginPage: LoginPage;
    task1: Task1;
    task2: Task2;
    task3: Task3;
}

export const test = base.extend<ExtendedFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    task1: async ({ page }, use) => {
        const task1 = new Task1(page);
        await use(task1);
    },
    task2: async ({ page }, use) => {
        const task2 = new Task2(page);
        await use(task2);
    },
    task3: async ({ page }, use) => {
        const task3 = new Task3(page);
        await use(task3);
    },


})

export { expect };

