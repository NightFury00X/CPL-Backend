const express = require('express');
ApiRoutes = express.Router();
LeagueRoutes = express.Router();
LeagueController = require('../../Application/Controller-Service/Controllers/LeagueController');

ApiRoutes.use('/league', LeagueRoutes);

// 1: Get All League Details
LeagueRoutes.get('', LeagueController.getList);

// 2: Create a new League
LeagueRoutes.post('', LeagueController.createLeague);

// 3: Get League by Id
LeagueRoutes.get('/:id', LeagueController.getList);

// 4: Delete League detail by Id
LeagueRoutes.delete('/:id/delete', LeagueController.getList);

// 5: Update League by Id
LeagueRoutes.put('/:id/edit', LeagueController.getList);

module.exports = ApiRoutes;
