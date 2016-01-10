var poulettes = angular.module('poulettes', [])

poulettes.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.html5mode = true;
    }
]);

poulettes.controller('IndexController',
    function($scope, $window, $location, IndexModel) {
        var currentAudio, currentAudioName, quotes;
        $scope.currentTag = "";
        $scope.currentQuote = "";
        $scope.share = "";

        var titles = ["Le seul site fort en pommes.",
        "Parce que c'est bon pour la santé du cigare."];
        $scope.randomTitle = titles[Math.floor(Math.random() * titles.length)];

        listAllOggFiles();

        IndexModel.getQuotes(function(data) {
            quotes = data;
        });

        if ($window.hashTagId != "") {
            clickTag($window.hashTagId, $window.hashTagQuote);
        }

        $scope.clickTag = function (name) {
            clickTag(name);
        }

        function clickTag (name, quote)  {
            if (currentAudioName === name) {
                stopSound();
                return;
            } else {
                stopSound();
            }
            playSound(name);

            $scope.currentTag = name;
            if (quote === undefined){
                $scope.currentQuote = quotes[name];
            } else {
                $scope.currentQuote = quote;
            }
            //$location.path(name).replace();
        }

        function playSound (name) {
            currentAudioName = name;
            currentAudio = new Audio('/sounds/' + name + '.ogg');
            currentAudio.onended = function() {
                stopSound();
            };
            currentAudio.play();
        }

        function randomColor() {
            var colors = ["#d7757e","#9a8e00","#2b5764","#b80f2b","#f2c436",
            "#8b95db","#b1f01f","#a1958c","#33ae8a","#f732e7","#a76fa8",
            "#e49c6d","#1abffa","#ae2862","#a753f6","#a8ea28"];
            return colors[Math.floor(Math.random()*colors.length)];
        }

        function stopSound(){
            currentAudioName = null;
            if (currentAudio == null) {
                return;
            }
            currentAudio.pause();
            currentAudio = null;
        }

        function listAllOggFiles() {
            IndexModel.listAllOggFiles(function(data) {
                $scope.files = data;
                $scope.colors = assignColors(data);
            });
        }

        function assignColors(files) {
            var colors = [];
            for (var i = 0; i < files.length; i++) {
                colors[files[i]] = randomColor();
            }
            return colors;
        }
    }
);

poulettes.service('IndexModel',
    function($http){
        return {

            listAllOggFiles : function(callback) {
                $http.get('/api/listAllOggFiles/').success(
                    function(data, status, headers, config) {
                        callback(data);
                    }
                )
            },

            getQuotes : function(callback) {
                $http.get('/api/getQuotes/').success(
                    function(data, status, headers, config) {
                        callback(data['quotes']);
                    }
                )
            }
        }
    }
);
