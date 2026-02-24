const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.get('/', (req, res) => {
    res.json({message: "API running"});
});

app.listen(8000, () => console.log("Server running on port 8000"))