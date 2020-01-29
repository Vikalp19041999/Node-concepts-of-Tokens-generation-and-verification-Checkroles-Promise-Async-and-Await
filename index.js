const express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//NOOBIE POST REQUEST
app.post('/post', (req, res) => {
    res.send("Post Request");
});

//TOKEN GENERATION
app.get('/token', (req, res) => {
    var token = jwt.sign({
        username: req.body.username,
        password: req.body.password
    }, "masterkey")
    res.send(token);
    console.log(token);
});

//TOKEN VERIFICATION
app.use((req, res, next) => {
    if (req.originalUrl.indexOf('/token') == -1) {
        try {
            var token = jwt.verify(req.headers["authorization"], "masterkey");
            console.log(token.username);
        }
        catch (ex) {
            console.log(ex);
            return res.status(401).send({ msg: "unauthorized access" });
        }
    }
    next();
});

//CHECKROLE
function checkrole(req, res, next) {
    if (req.originalUrl.indexOf('/token') == -1) {
        try {
            var token = jwt.verify(req.headers["authorization"], "masterkey");
            r = token.password;
            if (r == "vikalp") {
                console.log("true");
            }
            else {
                console.log("Wrong");
            }
        }
        catch (ex) {
            console.log(ex);
            return res.status(401).send({ msg: "unauthorized access" });
        }
    }
    next();
}

app.get('/get', checkrole, (req, res) => {
    var token = jwt.verify(req.headers["authorization"], "masterkey");
    console.log(token);
    res.send(token);
});

//ASYC, AWAIT AND PROMISE
function foo() {
    return new Promise(async (resolve, reject) => {
        try {
            var y = 5 / 0;
            console.log("Try statement");
            resolve(y);
        } catch (ex) {
            console.log("Catch Statement");
            reject(y);
        }
    })
};

app.get('/promise', async (req, res) => {
    var p = await foo().then(data => {
        data = "Vicky"
        return data;
    }
    );
    console.log(p);
    res.send(p);
}
);

app.listen(4000);
