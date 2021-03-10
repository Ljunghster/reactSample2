const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const Cors = require('cors');
const passport = require('passport');

const publicPath = path.join(__dirname, 'client/build');
app.use(express.static(publicPath));

mongoose.connect(process.env.MONGODB_URI);

require('./middleware/passport')

app
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(Cors())
    .use(passport.initialize());

const userRoutes = require('./routes/user-routes');
app.use(userRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.listen(port, () => {
    console.log(`Server on port ${port}!`);
 });