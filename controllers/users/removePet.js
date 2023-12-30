const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { Pet } = require('../../models/pet');

const removePet = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: petId } = req.params;

  const foundPet = await Pet.findById(petId);

  if (!foundPet) {
    throw HttpError(404, 'This pet is not found');
  }

  if (foundPet.owner !== userId.toString()) {
    throw HttpError(409, "You aren't owner of this pet");
  }

  await Pet.findOneAndRemove({ _id: petId, owner: userId });

  const removedFromoUserPets = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { pets: petId },
    },
    { new: true, select: '-password' },
  )
    .populate('noticesViewed noticesFavorites')
    .populate('pets', '-owner');
  res.status(200).json(removedFromoUserPets);
};

module.exports = removePet;
