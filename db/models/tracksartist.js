'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TracksArtist extends Model {
    static associate(models) {
      // define association here
    }
  }
  TracksArtist.init(
    {
      trackId: DataTypes.INTEGER,
      artistId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TracksArtist',
    },
  );
  return TracksArtist;
};
