const { Router } = require('express');
const { Artist, Track } = require('../../db/models');
const checkArtistId = require('../middlewares/checkArtistId');
const artistsRouter = Router();

artistsRouter.route('/').get(async (req, res) => {
  try {
    const allArtists = await Artist.findAll();
    res.json(allArtists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, text: 'Ошибка исполнителей' });
  }
});

// /api/artists/:artistId/tracks

artistsRouter.get('/:artistId/tracks', checkArtistId, async (req, res) => {
  try {
    const { artistId } = req.params;
    const targetArtist = await Artist.findOne({
      where: { id: artistId },
      include: Track,
    });
    if (!targetArtist) return res.status(404).json({ message: 'Исполнитель не найден' });
    res.json(targetArtist.Tracks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message, text: 'Ошибка треков по исполнителю' });
  }
});

module.exports = artistsRouter;
