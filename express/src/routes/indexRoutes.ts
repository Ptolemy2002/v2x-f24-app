import express from 'express';
import apiV1Router from './api/v1';
const router = express.Router();

// Root route
router.get('/', function(req, res, next) {
    res.send("Root route. For docs, go <a href='/api/v1/docs'>here</a>.");
});

router.get("/ping", (req, res) => {
    /*
        #swagger.tags = ['General']
        
        #swagger.description = `
            Ping the server to ensure the API is up and running.
            It should respond with a 200 response and the text "pong".
        `

        #swagger.responses[200] = {
            description: "Server is up and running.",
            schema: "pong"
        }
    */
    res.send("pong");
});

router.use("/api/v1", apiV1Router);



const indexRoutes = router;
export default indexRoutes;