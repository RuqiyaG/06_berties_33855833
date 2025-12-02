// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

// redirects to log in page
const redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/users/login') 
    } else {
        next ();
    }
}

// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('./')
        }
        res.send(`You are logged out. <a href='/'>Home</a>`)
    })
})

router.get('/weather', function(req, res, next){
    let apiKey = '7c8b4261d015d7bd4f3ba8f9f9968a82' // my api will be active in a couple hours check back
    let city = 'london'
    let url = `http:api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function(err, response, body){
        if(err){
            next(err)
        } else {
            //res.send(body)
            var weather = JSON.parse(body)
            var wmsg = 'It is' + ' ' + weather.main.temp + 'degrees' + weather.name + "! <br> The humidity now is" + weather.main.humidity;
            res.send(wmsg);
        }
    });

})

// Export the router object so index.js can access it
module.exports = router