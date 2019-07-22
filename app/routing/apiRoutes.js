// Loading Data
// =============================================================
var friendsArray = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDiff: 1000
    };
    // console.log(req.body);

    // get user info
    var userInput = req.body;
    var userScores = userInput.scores;
    // console.log(userScores);

    // // difference of each user
    var totalDiff = 0;

    // loop through all friends possibilities in database
    for (var i = 0; i < friendsArray.length; i++) {
      console.log(friendsArray[i]);

      // // difference of each user
      var totalDiff = 0;
      for (var f = 0; f < friendsArray[i].scores[f]; f++) {
        totalDiff += Math.abs(
          parseInt(userScores[f]) - parseInt(friendsArray[i].scores[f])
        );

        if (totalDiff <= bestMatch.friendDiff) {
          bestMatch.name = friendsArray[i].name;
          bestMatch.photo = friendsArray[i].photo;
          bestMatch.friendDiff = totalDiff;
        }
      }
    }

    friendsArray.push(userInput);
    console.log(userInput);
    res.json(bestMatch);
  });
};
