const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');


// 1808 IMPORTS
const { phishShows, setLists } = require('./datasets/phishShowData.js');
const { adoptableDogs, rescues } = require('./datasets/adopt-a-dog.js');
const { tvShow, spinOff, episodes } = require('./datasets/Buffy.js');
const { characters, stages } = require('./datasets/smash_data_json.js');
const { countries, continents } = require('./datasets/countries.js');
const { coloradoBeer, coloradoBreweries } = require('./datasets/coloradoBeer.js');
const { nationalParks, trails } = require('./datasets/nationalParks-data.js');


// 1810 IMPORTS
const { beachCounties, beaches } = require('./datasets/beaches.js');
const { games, genres } = require('./datasets/board-games.js');
const { parlors, flavors } = require('./datasets/icecream.js');
const { cards, decks } = require('./datasets/magic-gathering.js');
const { nationalParks1810, states1810 } = require('./datasets/nationalparks-1810.js');
const { nflTeams, cities } = require('./datasets/nfl.js');
const { tea, moods } = require('./datasets/tea.js');


const datasets = [ 
  { name: 'beachCounties', data: beachCounties },
  { name: 'beaches', data: beaches },
  { name: 'games', data: games },
  { name: 'genres', data: genres },
  { name: 'parlors', data: parlors },
  { name: 'flavors', data: flavors },
  { name: 'cards', data: cards },
  { name: 'decks', data: decks },
  { name: 'nationalParks1810', data: nationalParks1810 },
  { name: 'states1810', data: states1810 },
  { name: 'nflTeams', data: nflTeams },
  { name: 'cities', data: cities },
  { name: 'tea', data: tea },
  { name: 'moods', data: moods },

  { name: 'phishShows', data: phishShows },
  { name: 'setLists', data: setLists },
  { name: 'adoptableDogs', data: adoptableDogs },
  { name: 'rescues', data: rescues },
  { name: 'tvShow', data: tvShow },
  { name: 'spinoff', data: spinOff },
  { name: 'episodes', data: episodes },
  { name: 'characters', data: characters },
  { name: 'stages', data: stages },
  { name: 'countries', data: countries },
  { name: 'continents', data: continents },
  { name: 'coloradoBeer', data: coloradoBeer },
  { name: 'coloradoBreweries', data: coloradoBreweries },
  { name: 'nationalParks', data: nationalParks },
  { name: 'trails', data: trails }
];




// EXPRESS CONFIGURATION
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

datasets.forEach(dataset => {
  app.get(`/api/v1/${dataset.name}`, (request, response) => {
    response.send({ [dataset.name]: dataset.data });
  });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`Dataset is running on ${app.get('port')}.`);
  });
}

module.exports = app;