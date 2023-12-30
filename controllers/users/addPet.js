const { User } = require('../../models/user');
const { Pet } = require('../../models/pet');

const addPet = async (req, res) => {
  const { _id: userId} = req.user;

const pet = await Pet.create({...req.body, owner: userId});
    
  if (userId && pet) {
    const addedtoUserPets = await User.findByIdAndUpdate(
      userId,
      {
        $push: { pets: { $each: [pet._id], $position: 0 } },
      },
      { new: true, select: '-password' },
    )
      .populate('noticesViewed noticesFavorites')
      .populate('pets', '-owner');
    res.status(200).json(addedtoUserPets);
  } 
};

module.exports = addPet;
