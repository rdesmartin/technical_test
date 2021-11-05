import express from "express";
import router from "./routes/router";
import logger from "morgan";

const app = express();
const port = 3000;

app.use(logger('dev'));

app.use(express.json());

/*
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});
*/

app.use('/', router);

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
