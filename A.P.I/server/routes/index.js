import jwt from 'jsonwebtoken'
import user from '../models/dummyUser'
import debug from 'debug'
import { applyPatch } from 'fast-json-patch'
import thumb from 'node-thumbnail'

module.exports = (app) => {

    //Public Endpoint 
    app.post('/user/login', (req, res, ) => {
        let { username } = req.body
        let { password } = req.body

        //checking to make sure the user entered the correct username/password combo
        if (username === username && password === password) {
            //if user log in success, generate a JWT token for the user with a secret key
            jwt.sign({ user }, 'privatekey', (err, token) => {
                if (err) { debug.log(err) }
                res.send(token);
            });
        } else {
            debug.log('ERROR: Could not log in');
        }
    })

    //This is a protected route to verify signed token and and run a patch operation 
    app.patch('/user/edit', checkToken, (req, res) => {
        let { new_name } = req.body
        let { new_age } = req.body
        //verify the JWT token generated for the user
        jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
            if (err) {
                //If error send Forbidden (403)
                debug.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                name_message = 'Name is '
                age_message = 'Age is '
                var details = { name: name, age: age }

                var patch = [
                    { op: "replace", path: "/name", value: new_name },
                    { op: "replace", path: "/age", value: new_age },
                ];
                document = jsonpatch.applyPatch(details, patch).newDocument;
                //Send a message
                res.json({
                    message: name_message + new_name + age_message + new_age,
                    authorizedData
                });
            }
        })
    });

    //This is a protected route to serve image thumbnails
    app.get('/user/thumbnails', checkToken, (req, res) => {

        //verifies if a JWT token was  generated for the user
        jwt.verify(req.token, 'privatekey', (err, ) => {
            if (err) {
                //If error send Forbidden (403)
                debug.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {

                thumb({
                    source: 'src', //image uri comes here 
                    destination: 'dest', width: 50, height: 50
                }).then(function () {
                    res.json({
                        message: 'Successful log in', // return img uri here
                    });
                }).catch(function (e) {
                    debug.log('Error', e.toString());
                });

            }
        })
    });
}

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {

        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;

        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}



