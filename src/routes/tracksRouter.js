const express = require('express');
const { Track, TracksArtist } = require('../../db/models');

const tracksRouter = express.Router();

tracksRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allTracks = await Track.findAll();
      res.json(allTracks);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ text: 'Ошибка получения всех треков', message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, duration = 0, artistId } = req.body;
      if (!title) return res.status(400).send({ text: 'Не указано название трека' });
      if (!artistId) return res.status(400).send({ text: 'Не указан исполнитель' });
      const newTrack = await Track.create({ title, duration });
      await TracksArtist.create({ trackId: newTrack.id, artistId });
      res.status(201).json(newTrack);
    } catch (error) {
      console.error(error);
      res.status(500).send({ text: 'Ошибка создания трека', message: error.message });
    }
  });

tracksRouter
  .route('/:trackId')
  .get(async (req, res) => {
    try {
      const { trackId } = req.params;
      const track = await Track.findOne({ where: { id: trackId } });
      res.json(track);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ text: 'Ошибка получения одного трека', message: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { trackId } = req.params;
      await Track.destroy({ where: { id: trackId } });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send({ text: 'Ошибка удаления трека', message: error.message });
    }
  });

module.exports = tracksRouter;
