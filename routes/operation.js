var router = require('express').Router();
var Operation = require('../model/operation');
var errorLog = require('chalk').red;
var Item = require('../model/item');

router
.get('/' , (req, res) => {
    //res.json({'message': 'hello from operation router'});
    
    Operation.find({}).populate("ingredients.item").exec((err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.get('/search/:search' , (req, res) => {
    var search = req.params.search;    
    Operation.find({operationName : { '$regex': search , '$options': 'i'} }).populate("ingredients.item").exec((err, doc)=>{
        if(err) console.log(error);
       res.json(doc);
    })
})
.post('/', (req ,res) => {
   
   var doc =  req.body; 
   Operation.create(doc,(err, result)=> {
       if(err) console.log(errorLog(err));
       else {
       res.json(result);
       }
   })
})
.put('/:id', (req, res) =>{
    var doc =  req.body;
    var id = req.params.id;
   Operation.findByIdAndUpdate(id, doc ,(err, result)=> {
       if(err) console.log(errorLog(err));
       res.json(result);
   })
})
.delete('/:id', (req, res)=>{
    var id= req.params.id;
    Operation.findOneAndRemove({_id:id}, (err, result)=> {
        if(err) console.log(errorLog(err))
        res.json(result);
    })
})


module.exports = router;