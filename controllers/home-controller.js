const Picture = require('mongoose').model('Picture')

module.exports = {
    index: (req, res)=>{
        Picture.find({}).sort('-dateCreation').limit(20).then(pictures =>{
            res.render('home/index', {pictures})               
        })     
    },
    about: (req,res)=>{
        res.render('home/about')
    }
}