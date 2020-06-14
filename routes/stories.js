const express=require('express');
const {ensureIsAuth}=require('../helpers/auth')
const Story=require('../models/Story');
const User=require('../models/user');


const router=express.Router();

router.get('/',(req,res)=>{
    let user1;
    if(req.user){
        user1= User.findById(req.user.id).lean()
    }else{
           user1=null
    }
    Story.find({status:'public'}).lean()
    .populate('user')
    .sort({date:'desc'})
    .then(stories=>{
        res.render('stories/index',{
            stories,
            user1
        })


    })
})

router.get('/add',ensureIsAuth,(req,res)=>{
    res.render('stories/add')
})

router.get('/show/:id',(req,res)=>{
    Story.findById(req.params.id).lean()
    .populate('user')
    .populate('comments.commentUser')
    .then(story=>{
        res.render('stories/show',{
            story:story
        })
    })
})




router.get('/my',ensureIsAuth,(req,res)=>{
    let user1
    if(req.user){
         user1=User.findById(req.user._id).lean()
    }else{
           user1=null
    }
    Story.find({user:req.user._id}).lean()
    .populate('user')
    .populate('comments.commentUser')
    .then(stories=>{
        res.render('stories/index',{
            stories,
            user1
        })
    })
})


router.get('/edit/:id',ensureIsAuth,(req,res)=>{
    Story.findById(req.params.id).lean()
    .then(story=>{
        if(story.user!=req.user.id){
            res.redirect('/stories')
        }else{
        res.render('stories/edit',{
            story:story
        })
    }
    })
})


router.post('/',(req,res,next)=>{
    console.log(req.body)
    let allowcomment;
    if(req.body.allowComment){
        allowcomment=true
    }else{
        allowcomment=false
    }
    const story=new Story({
        title:req.body.title,
        status:req.body.status,
        allowComment:allowcomment,
        body:req.body.body,
        user:req.user.id
    })
    story.save()
    .then(s=>{
        res.redirect(`/stories/show/${story._id}`)

    })

})

router.put('/:id',ensureIsAuth,(req,res)=>{
    Story.findById(req.params.id)
    .then(story=>{
        if(req.body.allowComment){
            allowcomment=true
        }else{
            allowcomment=false
        }
       
        story.title=req.body.title;
        story.status=req.body.status;
        story.allowComment=allowcomment;
        story.body=req.body.body;
        story.save()
        .then(story=>{
            res.redirect('/dashboard');
        })
        
    })
})

router.delete('/:id',ensureIsAuth,(req,res)=>{
    Story.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.redirect('/dashboard')
    })

})


router.post('/comment/:id',(req,res)=>{
    Story.findById(req.params.id)
    .then(story=>{
        const newcomment={
        commentBody:req.body.commentBody,
        commentUser:req.user.id
    }
      story.comments.unshift(newcomment)  
      story.save().then(()=>{
            res.redirect(`/stories/show/${req.params.id}`)
      }) 


    })
})


router.get('/user/:userId',(req,res)=>{
    let user1
    if(req.user){
         user1=User.findById(req.user.id).lean()
    }else{
           user1=null
    }
    Story.find({user:req.params.userId,status:'public'}).lean()
    .populate('user')
    .then(stories=>{
        res.render('stories/index',{
            stories,
            user1
        })
    })
})

module.exports=router