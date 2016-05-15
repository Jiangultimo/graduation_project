var mongo = require('./db');

var Plan = function(plan) {
    this.planName = plan.planName;
}

module.exports = Plan;

//选择计划
Plan.prototype.get = function(planName, callback) {
        mongo.open(function(err, db) {
                if (err) {
                    return callback(err);
                }
                // 读取计划下的单词
                db.collection('words', function(err, collection) {
                        if (err) {
                            mongo.close();
                            return callback(err);
                        }
                        collection.findOne({ 'planName': planName }, function(err, plan) {
                            mongo.close();
                            if (err) {
                                return callback(err);
                            }
                            callback(null, plan); //查询成功，返回计划内的单词
                        });
                    });
                });
        }
