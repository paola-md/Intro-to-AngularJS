var app = angular.module('notificationsApp', [])

app.controller('NotificationsListCtrl', ($scope, $http) => {
    $scope.notifications = [
        // {
        //     isRead: false,
        //     body: "Hola a todos",
        //     header: "Prueba",
        //     timestamp: "hoy"
        // }
    ];
    $scope.read = [];
    $scope.remaining = 0;
    $scope.method = "POST";
    $scope.url = "https://jsonplaceholder.typicode.com/comments";
    $scope.data = {};
    $scope.getNotification = () => {
        var url = $scope.url + (($scope.method != "POST") ? "/1" : "");
        if ($scope.method != "GET") {
            $scope.data = {
                postId: $scope.notifications.length + 1,
                name: "(" + ($scope.notifications.length + 1) + ") " + "In porttitor, enim ac posuere",
                body: "Fusce nec felis orci. Vivamus dolor nunc, finibus id est sed, "
                + "semper ornare tellus. Sed faucibus ante est. Donec ullamcorper, nunc nec "
                + "tempor euismod, ante ex elementum tellus, nec vestibulum quam ligula in dolor. "
                + "Vivamus lobortis lacus elit, quis maximus neque facilisis sed. Nullam tempor "
                + "massa ut massa finibus, id ultricies lorem convallis. Sed et magna nisl.",
                email: "EXAMPLE@ITAM.MX"
            }
        }
        $http({ method: $scope.method, url: url, data: $scope.data }).
            then(function (response) {
                $scope.notifications.push({
                    id: $scope.notifications.length + 1,
                    isRead: false,
                    body: response.data["body"],
                    header: response.data["name"],
                    email: response.data["email"],
                    timestamp: Date.now()
                });
                $scope.remaining++;
            }, function (response) {
                $scope.data = response.data || 'Request failed';
            });
    };
    $scope.getMainNotifications = () => {
        for (let index = 0; index < 2; index++) {
            $scope.getNotification();
        }
    }
    $scope.readAll = () => {
        $scope.notifications.forEach(notification => {
            notification.isRead = true;
            $scope.read.push(notification);
        });
        $scope.notifications = [];
    }
    $scope.unReadAll = () => {
        $scope.read.forEach(notification => {
            notification.isRead = false;
            $scope.notifications.push(notification);
        });
        $scope.read = [];
    }
    $scope.goTo = (array, index) => {
        if (array == "read") {
            var element = $scope.notifications[index];
            $scope.read.push(element);
            $scope.remove($scope.notifications, element);
        } else {
            var element = $scope.read[index];
            $scope.notifications.push(element);
            $scope.remove($scope.read, element);
        }
    }
    $scope.remove = (arr, item) => {
        for (var i = arr.length; i--;) {
            if (arr[i] === item) {
                arr.splice(i, 1);
            }
        }
    }
});