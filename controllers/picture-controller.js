const Picture = require('mongoose').model('Picture')
const Category = require('mongoose').model('Category')

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

        Picture.create(pictureObj)
        .then((h)=>{
            Category.findOne({categoryName: req.body.type})
            .then(foundCategory =>{
                foundCategory.pictures.push(h._id)
                foundCategory.save().then(()=>{
                res.render('pictures/generatePicture',{successMessage:'All is O.K.'})            
                })
            }) 
        }).catch(e=>{
            res.locals.globalError = e.message 
            res.render('pictures/generatePicture')
        })

    },
    getAddPictureView: (req, res)=>{
        Category.find({}).then(categories => {

            res.render('pictures/generatePicture', { categories})            
        })
    },
    getDetails:(req,res)=>{
        let targetPicture = req.query.id

        Picture.findById(targetPicture).populate('comments.creator').then(selectedPicture => {
           selectedPicture.prop = selectedPicture.like.length

            selectedPicture.viewCounter += 1
            selectedPicture.save().then(()=>{


                let comments = []
            for (let elem of selectedPicture.comments){
                let tempObj = {
                    userName: elem.creator.username,
                    userComment: elem.description,
                    userTitle: elem.title,
                    datePosted: elem.creationDate.toUTCString()
                }
                comments.push(tempObj)
            }
            
            res.render('pictures/details', {selectedPicture, comments})    
            })                
        })
    },
    likeDislike: (req, res)=>{
        let pictureId = req.params.id

        Picture.findById(pictureId).then((selectedPicture)=>{
            let userId = req.user_id
            let indexOfElem = selectedPicture.like.indexOf(userId)

            if(indexOfElem >= 0){
                selectedPicture.like.splice(indexOfElem, 1)
            }else{
                selectedPicture.like.push(userId)
            }

            selectedPicture.save().then((e) => {
                if(e){
                    console.log(e)
                }
                res.redirect('back')
            })
        })
    },
    getList:(req,res)=>{

            let page = Number(req.query.page) || 1
    
             //limit = 2 for test purpose        
            let limit = 2
            
            Picture.count({}).then(pictureCount =>{

            let maxPages = Math.ceil(pictureCount/limit)
            
                if(page > maxPages){
                    page = maxPages
                }
                if(page < 0){
                    page = 1
                }

                //TODO if last page, nextPage button to be last, to exist or something logic for user exerience
                let pages = {
                    nextPage: page +1 > maxPages?maxPages:page+1,
                    prevPage: page -1 < 1 ? 1 : page-1
                }

            Picture.find({}).skip((page - 1)* limit).limit(limit).then(pictures =>{
                    
                res.render('pictures/pictureList', {pictures, pages})

                })
            })
        }
}