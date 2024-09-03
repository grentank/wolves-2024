'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate({ Track, TracksArtist }) {
      this.belongsToMany(Track, { through: TracksArtist, foreignKey: 'artistId' });
    }
  }
  Artist.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Artist',
    },
  );
  return Artist;
};
