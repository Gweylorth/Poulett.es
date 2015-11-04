var poulettes = angular.module('poulettes', [])

poulettes.controller('IndexController',
    function($scope, IndexModel) {
        var currentAudio, currentAudioName, quotes;
        $scope.currentQuote = "";

        listAllOggFiles();
        getQuotes();

        $scope.clicTag = function (name) {
            if (currentAudioName === name) {
                stopSound();
                return;
            } else {
                stopSound();
            }
            playSound(name);
            $scope.currentQuote = quotes[name];
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
            });
        }

        function getQuotes() {
            IndexModel.getQuotes(function(data) {
                quotes = data;
            });
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
