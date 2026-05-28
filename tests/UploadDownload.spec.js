const {test, expect}= require('@playwright/test');
const ExcelJs= require('exceljs');
async function writeExcelTest(searchText,Replacedtext,change,filePath)
{
const workbook= new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath);    
const worksheet= workbook.getWorksheet('Sheet1');  
const output=await readExcel(worksheet,searchText);     
//const cell= worksheet.getCell(output.row,output.column); 
const cell= worksheet.getCell(output.row,output.column+change.colChange); 
cell.value=Replacedtext;
await workbook.xlsx.writeFile(filePath);


}
   

async function readExcel(worksheet,searchText)
{
        let output={row:-1,column:-1};


worksheet.eachRow((row,rowNumber)=>
{
    row.eachCell((cell,colNumber)=>
    {
        //console.log(cell.value)
        if (cell.value===searchText)
        {

            console.log(rowNumber,colNumber);
            output.row=rowNumber;
            output.column=colNumber;
        }      
    });
});
return output;
 }
  //writeExcelTest("Apple","Iphone","C:/Users/HP ZBOOK 15 G3/Downloads/ExceldownloadTest.xlsx");
 //writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/HP ZBOOK 15 G3/Downloads/ExceldownloadTest.xlsx");
 test ('Upload Download excel validateion', async({page})=>
{
const textSearch='Apple';    
const updateValue='350';
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
const downloadPromise=page.waitForEvent('download');
await page.getByRole('button',{name:'Download'}).click();
await downloadPromise;
await writeExcelTest("Apple",350,{rowChange:0,colChange:2},"C:/Users/HP ZBOOK 15 G3/Downloads/download.xlsx");
await page.locator("#fileinput").click();
await page.locator("#fileinput").setInputFiles("C:/Users/HP ZBOOK 15 G3/Downloads/download.xlsx");
const textLocator=page.getByText(textSearch);
const desiredRow=await page.getByRole('row').filter({has: textLocator});
//desiredRow.locator("#cell-4-undefined");
await expect (desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
}) 