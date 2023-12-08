const {Baskets, User_details, Products} = require("../db/models");

const validateTokenAdnUser = async (req, res) => {
  const tokenFormat = req.headers.authorization;
  if (!tokenFormat) return res.status(401).json({message: "Invalid token"});

  const [, tokenNewFormat] = tokenFormat.split(" ");

  const user = await User_details.findOne({
    where: {
      token: tokenNewFormat,
    },
  });

  if (!user) {
    return res
      .status(401)
      .json({message: "User not found with the provided token"});
  }

  return user;
};

exports.addBasket = async (req, res, next) => {
  try {
    const user = await validateTokenAdnUser(req, res);

    await Baskets.create({
      id: crypto.randomUUID(),
      user_id: user.user_id,
      token: user.token,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    });

    res.json({message: "Basket created successfully"});
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};

exports.getBaskeByUser = async (req, res) => {
  try {
    const user = await validateTokenAdnUser(req, res);

    const basket = await Baskets.findAll({where: {user_id: user.user_id}});

    res.json({basket});
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};

exports.deleteBasketByUser = async (req, res) => {
  try {
    const basket = await Baskets.findByPk(req.params.id);
    basket.destroy();
    res.json({message: "success", basket});
  } catch (error) {}
};
