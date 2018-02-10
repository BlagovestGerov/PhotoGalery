const Category = require('mongoose').model('Category')

module.exports = {
    getView:(req,res)=>{
        res.render('category/categoryForm')
    },
    createCategory:(req,res)=>{

        Category.create({
            categoryName: req.body.category
        }).then((e)=>{
            res.redirect('/')
        })
    }
}