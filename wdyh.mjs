import {getCaptchKey, getToken} from "./yzm.mjs";

async function getImage(type) {

    const d = new Date().getTime();
    const ck = getCaptchKey(d);
    const token = getToken(d, ck, type)

    const res = await fetch(`https://captcha.chaoxing.com/captcha/get/verification/image?callback=cx_captcha_function&captchaId=qDG21VMg9qS5Rcok4cfpnHGnpf5LhcAv&type=${type}&version=1.1.20&captchaKey=${ck}&token=${token}&referer=https%3A%2F%2Fin25n.aichaoxing.com%2Findex.html%3Fb%3D3&iv=4f70870c7d86d513fd1455de1e692890&_=1742348509143$`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-fetch-dest": "script",
            "sec-fetch-mode": "no-cors",
            "sec-fetch-site": "cross-site",
            "sec-fetch-storage-access": "active"
        },
        "referrer": "https://in25n.aichaoxing.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    });

    const data = await res.text()

    // 处理文本数据，提取JSON部分
    const startPos = data.indexOf('(') + 1;
    const endPos = data.lastIndexOf(')');
    const jsonString = data.substring(startPos, endPos);

    // 将JSON字符串转化为JavaScript对象
    return JSON.parse(jsonString);
}

async function getValidateData(token, x) {
    const resp = await fetch(`https://captcha.chaoxing.com/captcha/check/verification/result?callback=cx_captcha_function&captchaId=qDG21VMg9qS5Rcok4cfpnHGnpf5LhcAv&type=slide&token=${token}&textClickArr=%5B%7B%22x%22%3A${x}%7D%5D&coordinate=%5B%5D&runEnv=10&version=1.1.20&t=a&iv=672a07832ea5be7e3b9760df859b4fe8&_=1742348509149`, {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "sec-fetch-dest": "script",
          "sec-fetch-mode": "no-cors",
          "sec-fetch-site": "cross-site",
          "sec-fetch-storage-access": "active"
        },
        "referrer": "https://in25n.aichaoxing.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      });

    const data = await resp.text()

    // 处理文本数据，提取JSON部分
    const startPos = data.indexOf('(') + 1;
    const endPos = data.lastIndexOf(')');
    const jsonString = data.substring(startPos, endPos);

    /**
     * 
     * cx_captcha_function({"error":1,"msg":"verification error[cc]","result":false})
     * 
     * cx_captcha_function({
            "error": 0,
            "msg": "ok",
            "result": true,
            "extraData": "{\"validate\":\"validate_qDG21VMg9qS5Rcok4cfpnHGnpf5LhcAv_E88EC554C247DE099286406C9A2AA91C\"}"
        })

     */
    return JSON.parse(jsonString);
}


// const type = "slide", "rotate"
getImage("rotate").then(res => {
    console.log(res)
})
