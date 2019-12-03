var router = require('express').Router();
var Clinic = require('../model/clinic');
var errorLog = require('chalk').red;

router
.get('/' , (req, res) => {
    //res.json({'message': 'hello from clinic router'});
    
    Clinic.find((err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.get('/search/:search' , (req, res) => {
    //res.json({'message': 'hello from clinic router'});
    var search = req.params.search;
    console.log('search clinic name by', search )
    Clinic.find({clinicName : { '$regex': search , '$options': 'i'} },(err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.post('/', (req ,res) => {
   // console.log(body({"body":"hello"}))
   var doc =  req.body;
   Clinic.create(doc,(err, result)=> {
       if(err) console.log(errorLog(err));
       res.json(result);
   })
})
.put('/:id', (req, res) =>{
    var doc =  req.body;
    var id = req.params.id;
   Clinic.findByIdAndUpdate(id, doc ,(err, result)=> {
       if(err) console.log(errorLog(err));
       res.json(result);
   })
})
.delete('/:id', (req, res)=>{
    var id= req.params.id;
    Clinic.findOneAndRemove({_id:id}, (err, result)=> {
        if(err) console.log(errorLog(err))
        res.json(result);
    })
})


module.exports = router;