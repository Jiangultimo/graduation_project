var mongo = require('./db');

var User = function (user) {
    this.nickname = user.nickname;
    this.email = user.email;
    this.password = user.password;
    this.planName = user.planName;
    this.endPlan = user.endPlan;
    this.curPage = user.curPlan;
};

module.exports = User;

//存储用户信息
User.prototype.save = function (callback) {
    var user = { //用户信息
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        planName: this.planName,
        endPlan: this.endPlan,
        curPage: this.curPage
    };

    //打开数据库
    mongo.open(function (err, db) {
        if (err) {
            return callback(err); //返回错误信息
        }
        //读取users集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongo.close();
                return callback(err);
            }
            //插入数据
            collection.insert(user, {safe: true}, function (err, user) {
                mongo.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user[0]); //成功，err为null，并返回存储后的的用户文档
            });
        });
    });
};

//读取用户信息
User.get = function (name, callback) {
    mongo.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取users集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongo.close();
                return callback(err);
            }
            collection.findOne({email: name}, function (err, user) {
                mongo.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user); //查询成功，返回用户信息
            });
        });
    });
};

User.prototype.savePlan = function (planName, callback) {
    mongo.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('users', function (err, callback) {
            if (err) {
                mongo.close();
                return callback(err);
            }
            collection.update({planName: PlanName}, function (err, callback) {
                mongo.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user);
            });
        });
    });
}

User.prototype.savePage = function (curPage, callback) {
    mongo.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('users', function (err, callback) {
            if (err) {
                mongo.close();
                return callback(err);
            }
            collection.update({curPage: curPage}, function (err, callback) {
                mongo.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user);
            });
        });
    });
}
