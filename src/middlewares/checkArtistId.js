function checkArtistId(req, res, next) {
  const { artistId } = req.params;
  const num = Number(artistId);
  if (!artistId || Number.isNaN(num)) {
    return res.status(400).json({ text: 'Параметр должен быть числом' });
  }
  next();
}

module.exports = checkArtistId;
