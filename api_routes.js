module.exports = function(app) {
  var request = require('request');
  var fs = require('fs');
  var key = 'YOUR KEY HERE';
  var baseUrl = 'YOUR SERVER HERE';

  app.get('/api/search/', function(req, res) {
    var searchItems = require('./public/assets/json/search_options.json');
    res.send(searchItems);
  });

  app.get('/api/arena/tracker', function(req, res) {
    var searchItems = require('./public/assets/json/arena_tracker.json');
    res.send(searchItems);
  });

  app.get('/api/mix/all', function(req, res) {
    var url = baseUrl + 'mixes/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/mix/:id', function(req, res) {
    var url = baseUrl + 'mixes/' + req.params.id + '/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/monster/all', function(req, res) {
    var url = baseUrl + 'monsters/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/monster/:id', function(req, res) {
    var url = baseUrl + 'monsters/' + req.params.id + '/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/item/all', function(req, res) {
    var url = baseUrl + 'items/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/item/:id', function(req, res) {
    var url = baseUrl + 'items/' + req.params.id + '/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/ability/all', function(req, res) {
    var url = baseUrl + 'abilities/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/ability/:id', function(req, res) {
    var url = baseUrl + 'abilities/' + req.params.id + '/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/location/all', function(req, res) {
    var url = baseUrl + 'locations/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/location/:id', function(req, res) {
    var url = baseUrl + 'locations/' + req.params.id + '/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/keyitem/all', function(req, res) {
    var url = baseUrl + 'key_items/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.get('/api/keyitem/:id', function(req, res) {
    var url = baseUrl + 'key_items/' + req.params.id + '/key/' + key;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).data);
      }
    });
  });

  app.post('/api/readsave', function(req, res) {
      var randSuffix = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
      var fstream;

      // Open JSON list with offsets
      var monsterList = require('./public/assets/json/arena_tracker.json');

      // Functions for main loop
      var hex2dec = function(num){
        return parseInt(num, 16);
      };

      var countFromFile = function(monsters, saveBuffer){
        monsters.forEach(function(monster){
          var offsetStart = hex2dec(monster.offset);
          var offsetEnd = offsetStart + 1;
          var monsterCount = hex2dec(saveBuffer.toString('hex', offsetStart, offsetEnd));
          var complete = monsterCount == 10 ? true : false;

          monster.count = monsterCount;
          monster.complete = complete;
        });
      };

      // Open and parse savefile
      req.pipe(req.busboy);
      req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if(mimetype == 'application/octet-stream' && filename.indexOf('ffx_') === 0){
          fstream = fs.createWriteStream(__dirname + '/tmp/' + filename + '_' + randSuffix);
          file.pipe(fstream);

          fstream.on('close', function() {
            var stats = fs.statSync(fstream.path);

            if(stats.size < 40000){
              fs.readFile(fstream.path, function(err, data) {
                for(var location in monsterList) {
                  if (monsterList.hasOwnProperty(location) && location !== 'version') {
                    var monsters = monsterList[location];
                    // Getting into some O(n^2) level shit
                    // Jesus, forgive me
                    countFromFile(monsters, data);
                  }
                }
                // Serve the new JSON list
                res.send(monsterList);

                // Delete the file.  Damn POSIX names
                fs.unlink(fstream.path);
              });
            } else {
              res.status(500).send('Invalid File');
              fs.unlink(fstream.path);
            }
          });
        } else {
          res.status(500).send('Invalid File');
        }
      });
  });
};
