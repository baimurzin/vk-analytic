app.controller('AppController', AppController);
AppController.$inject = ['$scope', '$http'];
function AppController($scope, $http) {



    $http.get('https://api.vk.com/method/users.get?user_ids=12330882,16385639,%2022503886,%2052886075,%2054803161,%2091195019,%20105596448,%20142364104,%20152745336,%20215564621,%20221404006').success(function (data) {
        console.log(data);
    })
    $scope.labels =[ 'Alexey',
        'Ildar',
        'Aynur',
        'Nikita',
        'Marsel',
        'Denr',
        'Rustam',
        'Alexander',
        'Nurshat',
        'Vlad',
        'Ramis' ];

    $scope.data = [
        [363,599, 6174, 2661, 1402, 935, 1379, 502,  1069, 3280, 795 ]
    ];
}