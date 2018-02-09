const controllers = require('../controllers')
const restrictedPages = require('./auth')

module.exports = app =>{
    app.get('/', controllers.home.index)

    //Example how to you Authentication or Role
    app.get('/about', restrictedPages.isAuthenticated, controllers.home.about)
    // app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about)
    
    app.get('/loginRegister', controllers.user.registerGet)
    app.post('/register', controllers.user.registerPost)   
    
    app.post('/logout', controllers.user.logout)
    app.get('/loginRegister', controllers.user.loginGet)
    app.post('/login', controllers.user.loginPost)
    
    //Add Picture
    app.get('/addPicture', controllers.picture.getAddPictureView)

    app.all('*', (req,res)=>{
        res.status(404)
        res.send('404 NOT Found')
        res.end()
    })
}