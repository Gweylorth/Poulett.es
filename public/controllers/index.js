var poulettes = angular.module('poulettes', [])

poulettes.controller('IndexController',
    function($scope, $window, $location, IndexModel) {
        var currentAudio, currentAudioName;
        var titles = ["Le seul site fort en pommes.",
            "Parce que c'est bon pour la santé du cigare."
        ];

        $scope.playedQuotes = [];
        $scope.randomTitle = titles[Math.floor(Math.random() * titles.length)];

        IndexModel.getQuotes(function(data) {
            var characters = Object.keys(data);
            characters.sort();

            var sorted = {};
            for (var i = 0; i < characters.length; i++) {
                var c = characters[i];
                var info = data[c];
                sorted[c] = info;
            }
            $scope.database = sorted;

            if ($window.character != "" && $window.quoteId != "") {
                quote($window.character, $window.quoteId);
            }

            $scope.clickQuoteId = function(character, quoteId) {
                quote(character, quoteId)
            }
        });

        function quote(character, quoteId){
            playSound(character, quoteId);
            $scope.playedQuotes.push($scope.database[character].quotes[quoteId]);
        }

        function playSound(character, quoteId) {
            currentAudioName = character.toLowerCase() + "_" + quoteId;
            currentAudio = new Audio('/sounds/' + currentAudioName + '.ogg');
            currentAudio.onended = function() {
                stopSound();
            };
            currentAudio.play();
        }

        function stopSound() {
            currentAudioName = null;
            if (currentAudio == null) {
                return;
            }
            currentAudio.pause();
            currentAudio = null;
        }
    }
);

poulettes.service('IndexModel',
    function($http) {
        return {
            getQuotes: function(callback) {
                $http.get('/api/getQuotes/').success(
                    function(data, status, headers, config) {
                        callback(data['database']);
                    }
                )
            }
        }
    }
);
