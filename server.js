const express = require('express');
const app = express();
const PORT = 8823;

app.get('/api/test', (req, res) => {
	res.send("Hello world");
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
