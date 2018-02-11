const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port =process.env.PORT || 3100;
let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to connect to server');
        }
    });
    next();
});
// app.use((eq, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        wellcomeMessage: 'wellcome to my web site'

    });
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page'

    });
});


app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
});
