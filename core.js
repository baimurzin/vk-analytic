var VK = require('vksdk'),
    config = require('./config'),
    express = require('express'),
    app = express();

var vk = new VK({
    'appId': config.appId,
    'appSecret': config.appSecret,
    'language': config.language
});

vk.setToken(config.token);
vk.setSecureRequests(true);


var  msgTraverse = function () {
    var current = 1;
    var step = 200;
    var finish;
    while (current < finish) {

    }
};

var getChatUsers = function (chatId, usersFn) {
    vk.request('messages.getChat', {'chat_id': chatId}, function (_o) {
        usersFn(_o.response.users);
    });
};

var getHistory = function (chatId, historyFn) {
    vk.request('messages.getHistory', {'chat_id': chatId}, function (_o) {
        usersFn(_o.response.users);
    });
};
app.use(express.static(__dirname));

app.get('/chat/users/:chatId', function (req, res) {
    var chatId = req.params.chatId;
    getChatUsers(chatId, function (users) {
        res.send(users);
    })
});

app.listen(3000);
