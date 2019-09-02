

//链接mongoose
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connect success');
})
//类似于mysql的表，mongo里有文档字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true }
}))
//新增数据
User.create({
    user: 'lili',
    age: 15
}, function (err, doc) {
    if (!err) {
        console.log(doc)
    } else {
        console.log(err)
    }
})
//删除数据
User.remove({ age: 18 }, function (err, doc) {
    if (!err) {
        console.log('delete success')
        console.log(doc)
    }
})
//修改数据
User.update({ user: "xiao ming" }, { '$set': { age: 26 } }, function (err, doc) {
    console.log(doc)
})
//新建app
const express = require('express');
const app = express();
app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>')
})
app.get('/data', function (req, res) {
    // User.find({},function(err,doc){
    //     res.json(doc)
    // })
    User.findOne({ user: 'xiao ming' }, function (err, doc) {
        res.json(doc)
    })
})
// app.get('/delete',function(){

// })
app.listen(9093, function () {
    console.log('Node app start at port 9093')
})