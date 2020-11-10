const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const publicPath = path.join(__dirname, 'client/build');
app.use(express.static(publicPath));

mongoose.connect(process.env.MONGODB_URI);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.listen(port, () => {
    console.log(`Server on port ${port}!`);
 });