var logs = [];
var team = "Distillers";

function log(...args) {
  logs.push(...args);
}


function getDate(matchTime) {
  var year = matchTime.split('\/')[2].split(' ')[0];
  var month = matchTime.split('\/')[1];
  var day = matchTime.split('\/')[0];
  var time = matchTime.split('\/')[2].split(' ')[1];
  //YYYY-MM-DDTHH:mm
  return new Date(year+'-'+month+'-'+day+'T'+time);
}

function getNextMatch(input) {
  var now = new Date().getTime();
  log("Now", now);

  for (var i = 0; i < input.Week.length; i++) {
    var week = input.Week[i];
    if (!week.Fixture || !Array.isArray(week.Fixture)) continue;

    for (var j = 0; j < week.Fixture.length; j++) {
      var f = week.Fixture[j];
      if (!f) continue;

      // Only consider matches with Distillery Dynamite
      if (f.HomeTeam === team || f.AwayTeam === team) {
        if (f.DateTime) {
          var matchTime = getDate(f.DateTime).getTime();
          log("D", f);
          log("Time messing", matchTime);

          if (matchTime > now) {
            return f; // First upcoming match found
          }
        }
      }
    }
  }

  return input.Week[nput.Week.length -1]; // No fixture found
}

function transform(input) {
  var nextMatch = getNextMatch(input.League);

  if (!nextMatch) {
    var nextMatch = {};
  }

  return {
    data: {
      name: input.League.LeagueName + " - " + nextMatch.VenueName || "Unknown League",
      description: nextMatch.DateTime + " - " + nextMatch.HomeTeam + " vs " + nextMatch.AwayTeam,
      place: nextMatch.PlayingAreaName || "Unknown Venue"
    }
  };
}

// Example usage:
// console.log(transform(t));