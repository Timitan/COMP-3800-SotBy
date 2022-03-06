const {By,Key,Builder} = require("selenium-webdriver");
const until = require("selenium-webdriver/lib/until");
const assert = require('assert');
const addRows = require("./addRowsTests");
require("chromedriver");

async function main() {
    let driver = await new Builder().forBrowser("chrome").build();
    let driver2 = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/");
    await driver2.get("http://localhost:3001/");

    const user1 = {fname: "Patrick", lname: "Star", email: "patstar@fake.com", pass: "pass"};
    const user2 = {fname2: "Squidward", lname2: "TennisBalls", email2: "squidtenta@fake.com", pass2: "pass"};

    await addRows.testTwoAddRow(driver, driver2, user1, user2);
}

main();