const usuarioRepository = require("../repositories/usuario.repository");

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const loginResponse = await usuarioRepository.findOneByUsername(username);
  const passwordDB = loginResponse.get('password');

  if (password !== passwordDB) {
    res.status(401).send({
      authorization: false
    });
  }
  
  const congregation = loginResponse.get('congregation');

  const result = {
    authorization: true,
    congregation : congregation
  }  

  res.send(result);
};

const findOneByUsername = async (req, res) => {
  const username = req.params.username;

  const result = await usuarioRepository.findOneByUsername(username);
  res.send(result);
}

const findByCongregation = async (req, res) => {
  const congregation = req.params.congregation;

  const result = await usuarioRepository.findByCongregation(congregation);
  res.send(result);
}

const postUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const congregation = req.body.congregation;

  const newUser = {
    username: username,
    password: password,
    congregation: congregation
  }

  const result = await usuarioRepository.insert(newUser);
  res.send(result);
}

const updateUser = async (req, res) => {
    const username = req.params.username;
    const dataToUpdate = req.body;
    
    const result = await usuarioRepository.updateOne(username, dataToUpdate);
    res.send(result);
};

const deleteUser = async (req, res) => {
    const username = req.params.username;

    const result = await usuarioRepository.deleteOne(username);
    res.send(result);
}

module.exports = {
  login,
  findOneByUsername,
  findByCongregation,
  postUser,
  updateUser,
  deleteUser
}