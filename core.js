var VK = require('vksdk'),
    config = require('./config'),
    express = require('express'),
    app = express(),
    q = require('q'),
    fs = require('fs'),
    hashmap = require('hashmap');

var vk = new VK({
    'appId': config.appId,
    'appSecret': config.appSecret,
    'language': config.language
});

vk.setToken(config.token);
vk.setSecureRequests(true);

var usersMessageMap = new hashmap();
var users = [];

var  msgTraverse = function (users) {
    var current = 0;
    var step = 200;
    var finish = 23749;
    while (current < finish) {
        getHistory(49, current).then(function (items) {
            items.forEach(function (item) {
                var key = usersMessageMap.search(item.from_id);
                var oldValue = usersMessageMap.get(key);
                usersMessageMap.set(key, oldValue++);
            })
        });
        current += step;
        appendFile('stata.dat', '\n'+JSON.stringify(usersMessageMap));
    }

};

function changeVal (val) {
    usersMessageMap.set(val.key, val.val);
}
var cur = 0;
function callTraverse() {
    var finish = 23749;
    getHistory(49, cur).then(function (items) {
        var map =
        items.forEach(function (item) {
            var val = {
                key: item.from_id,
                val: usersMessageMap.get(item.from_id)+1
            }
            changeVal(val);
            //var oldValue = usersMessageMap.get(item.from_id);
            //usersMessageMap.set(item.from_id, oldValue++);
        })
    });
    cur += 200;
    appendFile('stata.dat', '\n'+JSON.stringify(usersMessageMap));
    if (cur < finish) {
        setTimeout(callTraverse, 400);
    }
    console.log(cur)
}






function appendFile(file, data) {
    fs.appendFile(file, data);
}

var getChatUsers = function (chatId) {
    var deferred = q.defer();
    vk.request('messages.getChat', {'chat_id': chatId}, function (_o) {
        deferred.resolve(_o.response.users);
    });
    return deferred.promise;
};

var getHistory = function (chatId, offset) {
    var deferred = q.defer();
    vk.request('messages.getHistory', {'chat_id': chatId, count: 200, v: 5.4, start_message_id:1, offset: offset}, function (_o) {

        deferred.resolve(_o.response.items);
    });
    return deferred.promise;
};


app.use(express.static(__dirname));

app.get('/chat/users/:chatId', function (req, res) {
    var chatId = req.params.chatId;
    getChatUsers(chatId, function (users) {
        res.send(users);
    })
});

//getChatUsers(49).then(function (items) {
//    users = items;
//    users.forEach(function (user) {
//        usersMessageMap.set(user, 0); //изначально у всех по 0 сообщений
//    });
//    callTraverse();
//});

var labels ='12330882,16385639, 22503886, 52886075, 54803161, 91195019, 105596448, 142364104, 152745336, 215564621, 221404006';
//vk.request('users.get', {'user_id': 22503886}, function (o) {
//    var u = [];
//    o.forEach(function (i) {
//        u.push(i.first_name);
//    })
//    console.log(u);
//});
var data = {"response":[{"uid":12330882,"first_name":"Alexey","last_name":"Trusov"},{"uid":16385639,"first_name":"Ildar","last_name":"Sultanov","hidden":1},{"uid":22503886,"first_name":"Aynur","last_name":"Dinmukhametov","hidden":1},{"uid":52886075,"first_name":"Nikita","last_name":"Zylov"},{"uid":54803161,"first_name":"Marsel","last_name":"Talkambaev","hidden":1},{"uid":91195019,"first_name":"Denr","last_name":"Abdullin","hidden":1},{"uid":105596448,"first_name":"Rustam","last_name":"Faskhetdinov","hidden":1},{"uid":142364104,"first_name":"Alexander","last_name":"Drovnyashin","hidden":1},{"uid":152745336,"first_name":"Nurshat","last_name":"Nizamov"},{"uid":215564621,"first_name":"Vlad","last_name":"Baymurzin","hidden":1},{"uid":221404006,"first_name":"Ramis","last_name":"Shakirov"}]};
var u = [];
data.response.forEach(function (i) {
        u.push(i.first_name);
    })
console.log(u)
app.post('/chat/users/stat', function (req, res) {
    var users = req.body.users;
    console.log(users);
    res.send(users)
});

app.listen(3000);
