const Rabbit = require("../models/Rabbit");
const WeightHistory = require("../models/weightHistory");

const addWeight = async ({rabbitId, date, weight}) => {
  const rabbit = await Rabbit.findById(rabbitId);
  
  if (!rabbit) {
    throw new Error("Rabbit not found to add weight!");
  }

   // 1. تحديد بداية ونهاية اليوم
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // 2. إذا كان هناك وزن مسجل بالفعل في هذا اليوم
    const existingWeight = await WeightHistory.findOne({
        rabbitId: rabbit._id,
        date: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    });

    if (existingWeight) {
        throw new Error("تم تسجيل وزن لهذا الأرنب بالفعل في هذا اليوم!");
    }

    // 3. إذا لم يوجد سجل، يتم حفظ الوزن الجديد 
  const weightRecord = await WeightHistory.create({ rabbitId: rabbit._id, date, weight });

  rabbit.weight = weight;
  await rabbit.save();
  return weightRecord;
};


const getRabbitWeights = async (rabbitId) => {
  const rabbit = await Rabbit.findById(rabbitId).lean();

  if (!rabbit) {
    throw new Error("Rabbit not found to get weight history!");
  }
  const weights = await WeightHistory.find({ rabbitId: rabbit._id })
    .sort({ date: 1 });

  return weights;
};

const getWeightGrowth = async (rabbitId) => {
  const rabbit = await Rabbit.findById(rabbitId).lean();

  if (!rabbit) {
    throw new Error("Rabbit not found");
  }

  const weights = await WeightHistory.find({
    rabbitId: rabbit._id,
  })
    .sort({ date: 1 })
    .lean();

  if (weights.length < 2) {
    return {
      message: "Not enough weight records",
    };
  }

  const firstWeight = weights[0].weight;
  const lastWeight = weights[weights.length - 1].weight;

  const weightGain = (lastWeight - firstWeight).toFixed(2);

  const growthPercentage = (weightGain / firstWeight) * 100;

  return {
    rabbitCode: rabbit.code,
    firstWeight,
    lastWeight,
    weightGain,
    growthPercentage: Number(growthPercentage.toFixed(2))
  };
};

module.exports = {
  addWeight,
  getRabbitWeights,
  getWeightGrowth
};