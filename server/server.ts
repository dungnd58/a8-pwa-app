//import * as express from 'express';
import express from 'express';
import cors from 'cors';
import * as webpush from 'web-push';
import bodyParser from 'body-parser';
import {USER_SUBSCRIPTIONS} from "./in-memory-db";

const validKeys = {
    publicKey: 'BEgUyeTQluV91KxTGjdJdzQNjYVxN7ejQuKzsWmKIU7iqNf6DTZCFtfuprdZJrJKdPRrkqSu96eQWrjwLNtYWZ4',
    privateKey: 'iIKWsfDYY1ceC1uio9k8jOI57pwFD6kjAnSbNTLFk7I'
};

webpush.setVapidDetails(
    'mailto:dung.ngo@saigontechnology.com',
    validKeys.publicKey,
    validKeys.privateKey
);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.route('/api/notifications').post(saveSubscription);
export function saveSubscription(req, res) {
    const sub = req.body;

    console.log('Received Subscription on the server: ', sub);

    USER_SUBSCRIPTIONS.push(sub);

    res.status(200).json({message: "Subscription added successfully."});
};

app.route('/api/newsletter').post(sendNewsletter);
export function sendNewsletter(req, res) {
    console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "src/assets/icons/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}

const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});