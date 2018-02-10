const Picture = require('mongoose').model('Picture')

module.exports = {
    addComment:(req, res)=>{
        console.log(req.body)
        
        let currentPicture = req.params.id
        let userId = req.user._id
        let commentBody = req.body

        let commentObj = {
            creator: userId,
            title: commentBody.title,
            description: commentBody.comment,
            creationDate: Date.now()
        }

        Picture.findById(currentPicture).then(selectedPicture => {
            selectedPicture.comments.push(commentObj)

            selectedPicture.save().then(()=>{
                res.redirect('back')
            })
        })
    }
}

