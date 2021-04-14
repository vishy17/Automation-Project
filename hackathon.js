const puppy = require("puppeteer");
let fs = require('fs');
const id = "vish.a6479";
const pass = "manchd123";

let userName = ["soulful_pinch", "Fitness_fanaticofficial"];
let likeContendor = ["gradlebuilders"];
let informativeUsers = ["siddhant_792", "the_vishal17", "ur_sudhansh", "janvichhabra_", "anirudhsharma2502", "mus_0__", "mansheennnk"];
async function main() {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });
    let pages = await browser.pages();
    let tab = await pages[0];
    await tab.goto("https://www.instagram.com/");

    // task1 : auto follow====================================================================================================
    await tab.waitForSelector("input[name='username']", { visible: true });

    await tab.type("input[name='username']", id);
    await tab.type('input[name="password"]', pass);

    await tab.click('[type="submit"]');

    await tab.waitForSelector(".cmbtv", { visible: true });
    await tab.click(".cmbtv");

    await tab.waitForSelector(".aOOlW.HoLwm", { visible: true });
    await tab.click(".aOOlW.HoLwm");

    await tab.waitForSelector(".XTCLo.x3qfX", { visible: true });
    for (let i = 0; i < userName.length; i++) {
        await autofollowUser(tab, "https://www.instagram.com/", i);
    }
    await tab.goto("https://www.instagram.com/");

    // task2 : request accepting and follow back and sending message to them============================================================


    await tab.waitForSelector("._0ZPOP.kIKUG.H9zXO", { visible: true });
    await tab.click("._0ZPOP.kIKUG.H9zXO");

    let exist = await tab.evaluate(() => {
        let el = document.querySelector(".FPmhX.notranslate.yrJyr");
        return el ? el.innerText : "";
    })
    await tab.waitForSelector(".FPmhX.notranslate.yrJyr", { visible: true });
    if (exist != ) {
        let notification = await tab.$$(".FPmhX.notranslate.yrJyr");

        let followersUrls = [];
        for (let i = 0; i < notification.length; i++) {
            let url = await tab.evaluate(function (ele) {
                return ele.getAttribute("href");
            }, notification[i]);
            followersUrls.push(url);
        }

        for (let i = 0; i < notification.length; i++) {
            await autoFollowBackAndMessageSend(tab, "https://www.instagram.com" + followersUrls[i]);
        }
    }
    await tab.goto("https://www.instagram.com/");

    // task3: auto like and auto comment=======================================================================================

    await tab.waitForSelector(".XTCLo.x3qfX", { visible: true });
    for (let i = 0; i < likeContendor.length; i++) {
        await autoLike(tab, "https://www.instagram.com/", i);
    }
    await tab.goto("https://www.instagram.com/");

    // task4: fetch the information of the user , the userId given by ==========================================================


    for (let i = 0; i < informativeUsers.length; i++) {
        await friendsInformation(tab, i);
    }
    fs.writeFileSync("hackathon.json", JSON.stringify(infoData));

    browser.close();
}
let infoData = [];

async function friendsInformation(tab, idx) {
    await tab.goto("https://www.instagram.com/");
    await tab.waitForSelector(".XTCLo.x3qfX", { visible: true });
    await tab.type(".XTCLo.x3qfX", informativeUsers[idx]);
    await tab.waitForSelector(".-qQT3");
    await tab.keyboard.press("ArrowDown");
    await tab.keyboard.press("Enter");

    infoData.push({ "friendName": informativeUsers[idx] });

    await tab.waitForSelector(".rhpdm");
    let names = await tab.$(".rhpdm");
    nam = await tab.evaluate(function (ele) {
        return ele.textContent;
    }, names);
    infoData[idx]["Name"] = nam;
    await tab.waitForSelector(".g47SY", { visible: true })
    let followerFollowingPosts = await tab.$$(".g47SY");


    for (let i = 0; i < followerFollowingPosts.length; i++) {
        let info = await tab.evaluate(function (ele) {
            return ele.textContent;
        }, followerFollowingPosts[i]);
        if (i == 0) {
            infoData[idx]["TotalPosts"] = info;
        }
        else if (i == 1) {
            infoData[idx]["TotalFollowers"] = info;
        }
        else {
            infoData[idx]["TotalFollowing"] = info;
        }
    }

    let exist = await tab.evaluate(() => {
        let el = document.querySelector(".-vDIg span");
        return el ? el.textContent : ""
    })

    if (exist != "" && !exist.includes("Followed", 0)) {
        await tab.waitForSelector(".-vDIg span", { visible: true });
        let bios = await tab.$(".-vDIg span");
        let bio = await tab.evaluate(function (ele) {
            return ele.textContent;
        }, bios);
        infoData[idx]["bio"] = bio;
    }

}

async function autoLike(tab, url, idx) {
    await tab.goto("https://www.instagram.com/");
    await tab.waitForSelector(".XTCLo.x3qfX", { visible: true });
    await tab.type(".XTCLo.x3qfX", likeContendor[idx]);
    await tab.waitForSelector(".-qQT3");
    await tab.keyboard.press("ArrowDown");
    await tab.keyboard.press("Enter");

    await tab.waitForSelector("._9AhH0", { visible: true });
    await tab.click("._9AhH0");

    let exist = null;
    do {
        await tab.waitForSelector(".fr66n", { visible: true });
        await tab.click(".fr66n");

        await tab.click("._65Bje");

        exist = await tab.evaluate(() => {
            let el = document.querySelector("._65Bje");
            return el ? el.textContent : ""
        })


    } while (exist != "");
    await tab.waitForSelector(".fr66n", { visible: true });
    await tab.click(".fr66n");


}



async function autoFollowBackAndMessageSend(tab, profile) {
    await tab.goto(profile);


    let exist = await tab.evaluate(() => {
        let el = document.querySelector("._5f5mN.jIbKX._6VtSN.yZn4P");
        return el ? el.textContent : ""
    })
    if (exist == "Follow Back") {
        await tab.waitForSelector("._5f5mN.jIbKX._6VtSN.yZn4P", { visible: true });
        await tab.click("._5f5mN.jIbKX._6VtSN.yZn4P");

        await tab.waitForSelector('._862NM  button[type="button"]', { visible: true });
        await tab.click('._862NM  button[type="button"]');

        await tab.waitForSelector('[placeholder="Message..."]', { visible: true });
        await tab.type('[placeholder="Message..."]', "Hello, My Name Is Vishal");
        await tab.keyboard.press("Enter");
    }

}

async function autofollowUser(tab, url, idx) {
    await tab.goto(url);
    await tab.waitForSelector(".XTCLo.x3qfX", { visible: true });
    await tab.type(".XTCLo.x3qfX", userName[idx]);
    await tab.waitForSelector(".-qQT3");
    await tab.keyboard.press("ArrowDown");
    await tab.keyboard.press("Enter");
    await tab.waitForSelector(".vBF20._1OSdk");
    await tab.click(".vBF20._1OSdk");
}

main();