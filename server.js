const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./app/controllers/auth.config');

mongoose.Promise = global.Promise;

const uri = "mongodb+srv://default-user:MxxjSTfOAuQYtEuk@cluster0.ddazz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Database Connected');
    console.log("Successfully connected to MongoDB.");
}).catch(err => {
    console.log(err);
    console.log('Could not connect to MongoDB.');
});

let corsOptions = {
    origin: "http://localhost:8081"
};

const app = express();

app.use(cors(corsOptions));
//app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));


// Token Verification
app.use((req, res, next) => {
    if (req.headers &&
        req.headers.authorization) {
        jwt.verify(req.headers.authorization,
            config.secret,
            (err, decode) => {
                if (err) req.user = undefined;
                else {
                    req.user = decode;
                }
                next();
            });
    } else {
        req.user = undefined;
        next();
    }
});

require('./app/routes/comment.routes.js')(app);
require('./app/routes/auth.routes.js')(app);

app.listen(5000, () => {
    console.log("Server has started!")
})
