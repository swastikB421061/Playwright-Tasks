import { Page } from "@playwright/test";
import { test, expect } from "../fixture";

test.describe("", () => {
    test.beforeEach("before each", async ({ task1 }) => {
        await task1.buildPage();
    })



    test("navigate to design section for subrask1", async ({ task1 }) => {
        let page2:Page;
        await test.step("design form and publish", async () => {
            page2=await task1.buildFor1();
        })
        await test.step("submit and verify", async () => 
            task1.submit(page2)
        )
        await test.step("Clean Up - Delete the Form", async () => 
             task1.deleteForm()
        );
    })


    test("navigate to design section for subtask2", async ({ task1 }) => {
        await test.step("create form validate and submit",async()=>
            task1.buildFor2()
        );
        await test.step("Clean Up - Delete the Form", async () => 
            task1.deleteForm()
        );
    })

    test("navigate to design section for subtask3", async ({ task1 }) => {
        await test.step("Create a form and Verify", async () => 
            task1.publishForm()
        );

        await test.step("Open form in a new tab ", async () => 
            await task1.afterVisit()
        );

        await test.step("Fill form in another new tab ", async () => 
            task1.afterStart()
        );

        await test.step("Submit form in a third new tab ", async () => 
            task1.afterSubmit()
        );

        await test.step("Delete the form", async () =>  
            task1.deleteForm()
        );
    });

})

    





