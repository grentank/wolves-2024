'use strict';

const { Track, Artist, TracksArtist } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Artist.bulkCreate([
      { name: 'Queen' },
      { name: 'The Beatles' },
      { name: 'Michael Jackson' },
      { name: 'Adele' },
      { name: 'Ed Sheeran' },
      { name: 'Coldplay' },
      { name: 'Lady Gaga' },
      { name: 'Beyoncé' },
      { name: 'Elton John' },
      { name: 'Mark Ronson' },
      { name: 'Bruno Mars' },
      { name: 'Linkin Park' },
      { name: 'Jay-Z' },
      { name: 'Rihanna' },
      { name: 'Eminem' },
      { name: 'Dr. Dre' },
      { name: 'Five' },
    ]);
    await Track.bulkCreate([
      { title: 'Bohemian Rhapsody', duration: 354 },
      { title: 'Let It Be', duration: 243 },
      { title: 'Thriller', duration: 358 },
      { title: 'Someone Like You', duration: 285 },
      { title: 'Shape of You', duration: 263 },
      { title: 'Yellow', duration: 273 },
      { title: 'Shallow', duration: 215 },
      { title: 'Halo', duration: 261 },
      { title: 'Rocket Man', duration: 272 },
      { title: 'Uptown Funk', duration: 269 },
      { title: 'Numb/Encore', duration: 203 },
      { title: 'Love the Way You Lie', duration: 263 },
      { title: 'Still D.R.E.', duration: 290 },
      { title: 'We Will Rock You', duration: 188 },
      { title: 'Are You Okay?', duration: 280 },
      { title: 'Black And White', duration: 168 },
    ]);

    await TracksArtist.bulkCreate([
      { trackId: 1, artistId: 1 },
      { trackId: 2, artistId: 2 },
      { trackId: 3, artistId: 3 },
      { trackId: 4, artistId: 4 },
      { trackId: 5, artistId: 5 },
      { trackId: 6, artistId: 6 },
      { trackId: 7, artistId: 7 },
      { trackId: 8, artistId: 8 },
      { trackId: 9, artistId: 9 },
      { trackId: 10, artistId: 10 },
      { trackId: 10, artistId: 11 },
      { trackId: 11, artistId: 12 },
      { trackId: 11, artistId: 13 },
      { trackId: 12, artistId: 14 },
      { trackId: 12, artistId: 15 },
      { trackId: 13, artistId: 15 },
      { trackId: 13, artistId: 16 },
      { trackId: 14, artistId: 1 },
      { trackId: 14, artistId: 17 },
      { trackId: 15, artistId: 3 },
      { trackId: 16, artistId: 3 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
