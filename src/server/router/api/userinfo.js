const express = require('express');

const router = express.Router();

const User = require('../../models/UserSchema');


//test 
router.get('/test', (req, res) => {
    res.json({msg: "test success"});
});

//get all users
router.get('/', function(req, res) {
    console.log('this is in get users part');
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }
        res.status(200).json({users});
    });
});
/*
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
    if (err) {
        res.status(500).send(err);
    }
    res.status(200).json(users);
    });
    });
    */

//Create One User
router.post('/users', function(req, res) {
    console.log('this is in the post users part');
    const newUser = new User(req.body);
    console.log(req.body);
    newUser.save(err => {
        if (err) {
            res.status(500).json({err});
            console.log(err);
        }else {
            res.status(200).json({newUser});
        }
    });
});
/*
router.post('/users', (req, res) => {
   let user = new User();
   user.firstname = req.body.firstname;
   user.lastname = req.body.lastname;
   user.sex = req.body.sex;
   user.age = req.body.age;
   user.password = req.body.password;
   user.repeatpassword = req.body.repeatpassword;
   user.save(err => {
       if (err) {
           res.status(501).send(err);
       };
       res.status(200).json({message: 'User created!'});
   });
});
*/

//Get One User By Id
router.route('/users/:user_id')
.get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
})

//Edit User With This Id
.put(function(req, res) {
    console.log(req.body);
    console.log(req.params.user_id);
    User.findByIdAndUpdate(req.params.user_id, req.body, (err) => {
        if (err) {
            res.set(header).status(500).json({err});
            throw err;
        }
        res.status(200).json({message: `User with id ${req.params.user_id} has been edited!`});
    });
}) 

//Delete User with This Id
.delete(function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Successfully deleted'});
    });
});
/*
router.get('/users/:user_id', (req, res) => {
    getOne(req,res, req.params.user_id);
});
 
let getOne = (req, res, id) => {
    User.find({"_id": id}, function(err, users) {
        res.status(200);
        res.json(users);
    })
}
*/

/*
router.put('/users/:user_id', (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.send(err);
        }
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastName;
        user.sex = req.body.Sex;
        user.age = req.body.Age;
        user.password = req.body.password;
        user.repeatpassword = req.body.repeatpassword;
        user.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({message : 'User updated!'});            
        });
    });
});

router.delete('/users/:user_id', (req, res) => {
        User.findByIdAndDelete({_id: req.params.user_id}, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                res.status(200).json(result);
                res.json({message: 'User Deleted!'});
            }
        });
});
*/

//search 
router.route('/search/:keyword')
.get(function(req, res) {
    const keyword = req.params.keyword;
    User.find({
        $or: [{firstname : {$regex: keyword}}, {lastname : {$regex : keyword}}, {sex : keyword}, {age: keyword}]}, (err, users) => {
            console.log('server test keyword is', keyword);
            if (err) {
                throw err;
            }
            console.log(users);
            res.status(200).json(users);
    });
});

//pagination
router.route('/count')
.get(function(req, res) {
User.count({}, (err, count) => {
    if (err) {
        throw err;
    }
    res.status(200).json({count});
});
});

router.route('/fetch')
.get(function(req, res) {
    User.findById(1000, (err, users) => {
        if (err) {
            throw err;
        }
        console.log('fetch success');
        res.status(200).json({users});
    });
});

router.get('/range/:offset/:number', (req, res)=> {
    const offset = parseInt(req.params.offset);
    const number = parseInt(req.params.number);
    User.find({})
    .skip(offset)
    .limit(number)
    .exec((err, user) => {
        if (err) {
            throw err;
        }
        res.status(200).json(user);
    })
});

module.exports = router;



