import { test, expect } from "../fixture";  

test.describe("", () => {
    test.beforeEach("navigate to home page",async({page})=>{
        await page.goto("/");
    })  

    test("navigate to design section for subtask1", async ({ task3 }) => {
        await test.step("build subtask1.page", async () => 
            task3.buildPage()
        )
        await test.step("navigate to design section", async () => 
             task3.addLogo()
        )
        await test.step("Clean Up - Delete the Form", async () => 
             task3.deleteForm()
        );
    })
    
    
    test("navigate to design section for subtask2", async ({ task3 }) => {
        await test.step("build subtask2.page", async () => 
            task3.buildPage()
        )
        await test.step("create form",async()=>
             task3.createForm()
        )
        await test.step("submit form",async()=>
             task3.submitForm()
        )
        await test.step("check submission",async()=>
             task3.openPdf()
        )
        await test.step("Clean Up - Delete the Form", async () => 
             task3.deleteForm()
        );

    })

    

    test("navigate to design section for subtask3", async ({ task3 }) => {
        await test.step("build subtask1.page", async () => 
            task3.buildPage()
        )
        await test.step("create form for tsk 3",async()=>
             task3.createForm3()
        )
        await test.step("publish form",async()=>
             task3.publishForm()
        )
        await test.step("Clean Up - Delete the Form", async () => 
             task3.deleteForm()
        );
    });
})


  
