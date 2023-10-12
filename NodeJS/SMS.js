var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
    'method': 'POST',
    'hostname': 'mm2edw.api.infobip.com',
    'path': '/sms/2/text/advanced',
    'headers': {
        'Authorization': '428cb19b2eebfbe5ce2590a724928036-49c21b05-9f34-4ea1-9ff1-71674f920317',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});

var postData = JSON.stringify({
    "messages": [
        {
            "destinations": [
                {
                    "to": "41793026727"
                }
            ],
            "from": "InfoSMS",
            "text": "This is a sample message"
        }
    ]
});

req.write(postData);

req.end();