const { google } = require('googleapis');
const queryParse = require('query-string');
const urlParse = require('url-parse');
const axios = require('axios');
const request = require('request');
const token = (req, res) => {
    const queryUrl = new urlParse(req.url);
    const oauth2Client = new google.auth.OAuth2(
        "203748571834-tdvt7eqamd9j051jbdtddvumhelh541u.apps.googleusercontent.com",
        "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",
        "http://localhost:3000/check"
    );
    const scopes = ["https://mail.google.com/", "profile", "email", "openid"];
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: JSON.stringify({
            callbackURL: req.body.callbackURL,
            userId: req.body.userId
        })
    });

    request(url, (er, resp, body) => {
        res.send({url});
        const code = queryParse.parse(queryUrl.query).client_id;
        // console.log(code);
    })
}

module.exports = token;