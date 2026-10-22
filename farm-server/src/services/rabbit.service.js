const Rabbit = require("../models/Rabbit");
const Breeding = require("../models/Breeding");
const createRabbit = async (rabbit) => {
    const newRabbit = await Rabbit.create(rabbit);
    return newRabbit;
};
const getBreedingStatus = (rabbit) => {
    if (
      rabbit.breedingStatus === "active" ||
      rabbit.breedingStatus === "inactive"
    ) {
      return rabbit.breedingStatus;
    }
    const today = new Date();
    const ageInDays = Math.floor((today - new Date(rabbit.birthDate)) / (1000 * 60 * 60 * 24));

    //female 
    if (rabbit.gender === "female") {
        if (ageInDays >= 120 && rabbit.weight >= 3) {
            return "ready";
        }else {
            return "not_ready";
        }
    }
    // male
    if (rabbit.gender === "male") {
        if (ageInDays >= 150 && rabbit.weight >= 3.1) {
            return "ready";
        }else {
            return "not_ready";
        }
    }
}
const getRabbits = async () => {
    const rabbits = await Rabbit.find({}).lean();
    return rabbits.map(rabbit => ({
        ...rabbit,
        breedingStatus: getBreedingStatus(rabbit)
    }));
};
const getRabbit = async (id) => {
    const rabbit = await Rabbit.findById(id).lean();
    return {...rabbit, breedingStatus: getBreedingStatus(rabbit) };
}
const updateRabbit = async (id, rabbit) => {
    const updatedRabbit = await Rabbit.findByIdAndUpdate(id, rabbit, { new: true });
    if (!updatedRabbit) {
        throw new Error("Rabbit not found");
    }
    return updatedRabbit;
}

const canBreed = async (maleCode, femaleCode) => {
  const male = await Rabbit.findOne({ code: maleCode }).lean();
  const female = await Rabbit.findOne({ code: femaleCode }).lean();

  // نتأكد إن الاتنين موجودين
  if (!male || !female) {
    throw new Error("One or both rabbits not found");
  }
  // نتأكد من النوع
  if (male.gender !== "male" || female.gender !== "female") {
    throw new Error("Invalid breeding pair");
  }

  // الأرنب لا يزاوج نفسه
  if (male._id.toString() === female._id.toString()) {
    return {
      canBreed: false,
      reason: "Rabbit cannot breed with itself",
    };
  }

  // أب × بنت أو أم × ابن
  if (
    (female.fatherId &&
      female.fatherId.toString() === male._id.toString()) ||
    (female.motherId &&
      female.motherId.toString() === male._id.toString())
  ) {
    return {
      canBreed: false,
      reason: "Parent and offspring cannot breed",
    };
  }

  if (
    (male.fatherId &&
      male.fatherId.toString() === female._id.toString()) ||
    (male.motherId &&
      male.motherId.toString() === female._id.toString())
  ) {
    return {
      canBreed: false,
      reason: "Parent and offspring cannot breed",
    };
  }

  // إخوات
  if (
    male.fatherId &&
    female.fatherId &&
    male.fatherId.toString() === female.fatherId.toString()
  ) {
    return {
      canBreed: false,
      reason: "Siblings cannot breed",
    };
  }

  if (
    male.motherId &&
    female.motherId &&
    male.motherId.toString() === female.motherId.toString()
  ) {
    return {
      canBreed: false,
      reason: "Siblings cannot breed",
    };
  }

  return {
    canBreed: true,
    reason: "Breeding pair is allowed",
  };
};

const getRabbitDetails = async (id) => {
  const rabbit = await Rabbit.findById(id)
    .populate("fatherId", "code breed gender")
    .populate("motherId", "code breed gender")
    .lean();

  if (!rabbit) {
    throw new Error("Rabbit not found");
  }

  const breedings = await Breeding.find({
    $or: [
      { maleId: rabbit._id },
      { femaleId: rabbit._id },
    ],
  }).lean();

  const children = await Rabbit.find({
    $or: [
      { fatherId: rabbit._id },
      { motherId: rabbit._id },
    ],
  })
    .select("code image gender breed birthDate weight status")
    .lean();

  const matingCount = breedings.length;

  const pregnancyCount = breedings.filter(
    (breeding) => breeding.status === "pregnant"
  ).length;

  return {
    rabbit: {
      ...rabbit,
      breedingStatus: getBreedingStatus(rabbit),
    },

    breedingStats: {
      matingCount,
      pregnancyCount,
      childrenCount: children.length,
    },

    children,
  };
};

module.exports = {
    createRabbit,
    getRabbits,
    getRabbit,
    updateRabbit,
    getBreedingStatus,
    canBreed,
    getRabbitDetails
};