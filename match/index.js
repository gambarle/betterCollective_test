var Match = function() {
  this.data = {
    league_name: null,
    id: null,
    code: null,
    event_slug: null,
    start: null,
    home_team: null,
    home_team_logo: null,
    away_team: null,
    away_team_logo: null,
  };

  this.fill = function(info) {
    for (var prop in this.data) {
      if (this.data[prop] !== 'undefined') {
        this.data[prop] = info[prop];
      }
    }
  };

  this.getInformation = function() {
    return this.data;
  };
};

module.exports = function(info) {
	var instance = new Match();

	instance.fill(info);

	return instance;
};
