const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require("express");
const cors = require('cors')
const router = express.Router();
const app = express();
// Connect Database
connectDB();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT,POST, DELETE, PATCH"
}
app.use(cors(corsOptions))
// Init middleware
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//health check api
router.get('/health', (req, res) => {
    res.status(200).send('Health Ok');
});

// Define Routes
app.use('/api', router);
app.use('/api/v1', require('./routes/api/v1/books'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
