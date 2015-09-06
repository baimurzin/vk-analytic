app.controller('AppController', AppController);
AppController.$inject = ['$scope', '$http'];
function AppController($scope, $http) {

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