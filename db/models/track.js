'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    static associate({ Artist, TracksArtist }) {
      this.belongsToMany(Artist, { through: TracksArtist, foreignKey: 'trackId' });
    }
  }
  Track.init(
    {
      title: DataTypes.STRING,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Track',
    },
  );
  return Track;
};
