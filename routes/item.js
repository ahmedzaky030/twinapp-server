var router = require('express').Router();
var Item = require('../model/item');
var errorLog = require('chalk').red;
var Store = require('../model/store');

router
.get('/' , (req, res) => {
    //res.json({'message': 'hello from Item router'});
    
    Item.find((err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.get('/search/:search' , (req, res) => {
    //res.json({'message': 'hello from clinic router'});
    var search = req.params.search;    
    Item.find({itemName : { '$regex': search , '$options': 'i'} },(err, result)=>{
        if(err) console.log(error);
        res.json(result);
    })
})
.post('/', (req ,res) => {
   // console.log(body({"body":"hello"}))
   var doc =  req.body;
   Item.create(doc,(err, result)=> {
       if(err) console.log(errorLog(err));
       var store = new Store();
       store.item = result._id;
       store.createdAt = new Date();
       store.updatedAt = new Date();
       store.quantityConsumed = 0;
       store.quantityRemained = result.quantity;
       Store.create(store, (err, storeResult)=>{
           if(err) console.log(err);
           else {
               console.log('store saved..', storeResult);
           }
       })
       res.json(result);
   })
})
.put('/:id', (req, res) =>{
    var doc =  req.body;
    var id = req.params.id;
   Item.findByIdAndUpdate(id, doc ,(err, result)=> {
       if(err) console.log(errorLog(err));
       res.json(result);
   })
})
.delete('/:id', (req, res)=>{
    var id= req.params.id;
    Item.findOneAndRemove({_id:id}, (err, result)=> {
        if(err) console.log(errorLog(err))
        res.json(result);
    })
})


module.exports = router;