const getMain = async (req, res) => {
  res.send({
    apiName: `Territorio - Scrapping API`
  });
};

module.exports = {
  getMain
}