const Picture = require('mongoose').model('Picture')

module.exports = {

    addPicture:(req, res)=>{
        let bodyParams = req.body

        let pictureObj = {
            title: bodyParams.title,
            location: bodyParams.location,
            image: bodyParams.image,
            category: bodyParams.type,
            description: bodyParams.textArea,
            dateCreation: Date.now()

        }

        Picture.create(pictureObj).then((h)=>{
            res.render('pictures/generatePicture',{successMessage:'All is O.K.'})
        }).catch(e=>{
            res.locals.globalError = e.message 
            res.render('pictures/generatePicture')
        })

    },
    getAddPictureView: (req, res)=>{
        res.render('pictures/generatePicture')
    },
    getDetails:(req,res)=>{
        let targetPicture = req.query.id

        Picture.findById(targetPicture).then(selectedPicture => {

            res.render('pictures/details', {selectedPicture})
        })
    }
}