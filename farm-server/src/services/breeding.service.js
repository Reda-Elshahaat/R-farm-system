const Rabbit = require("../models/Rabbit");
const Breeding = require("../models/Breeding");
const rabbitService = require("./rabbit.service")

const createBreeding = async ({
  maleCode,
  femaleCode,
  breedingDate,
}) => {
  // 1. نجيب الذكر والأنثى
  const male = await Rabbit.findOne({ code: maleCode });
  const female = await Rabbit.findOne({ code: femaleCode });

  // 2. نتأكد إن الاتنين موجودين
  if (!male || !female) {
    throw new Error("One or both rabbits not found");
  }

  // 3. نتأكد من النوع
  if (male.gender !== "male") {
    throw new Error("Selected male, rabbit is not male");
  }

  if (female.gender !== "female") {
    throw new Error("Selected female, rabbit is not female");
  }

  // 4. نتأكد إن التزاوج مسموح
  const breedingAllowed = await rabbitService.canBreed(
    maleCode,
    femaleCode
  );

  if (!breedingAllowed.canBreed) {
    throw new Error(breedingAllowed.reason);
  }

  
  // تحويل تاريخ التزاوج
  const [year, month, day] = breedingDate
    .split("-")
    .map(Number);

  const breedingDateObj = new Date(
    year,
    month - 1,
    day
  );

  // منع تسجيل نفس عملية التزاوج في نفس اليوم
  const existingBreeding = await Breeding.findOne({
    maleId: male._id,
    femaleId: female._id,
    breedingDate: breedingDateObj,
  });

  if (existingBreeding) {
    throw new Error("This breeding record already exists");
  }

  // موعد الفحص المتوقع بعد 10 أيام
  const expectedCheckDate = new Date(breedingDateObj);

    expectedCheckDate.setDate(
    expectedCheckDate.getDate() + 10
  );

  // 5. إنشاء سجل التزاوج
  const breeding = await Breeding.create({
    maleId: male._id,
    femaleId: female._id,
    breedingDate,
    expectedCheckDate,
    status: "pending",
  });

  return breeding;
};

const checkBreeding = async (breedingId, status) => {
  const breeding = await Breeding.findById(breedingId);

  if (!breeding) {
    throw new Error("Breeding record not found");
  }

  if (breeding.status !== "pending") {
    throw new Error("Breeding has already been checked");
  }

  if (!["pregnant", "empty"].includes(status)) {
    throw new Error("Invalid breeding status");
  }

  breeding.status = status;
  breeding.checkDate = new Date();

  if (status === "pregnant") {
    const expectedKindlingDate = new Date(
      breeding.breedingDate
    );

    expectedKindlingDate.setDate(
      expectedKindlingDate.getDate() + 31
    );

    breeding.expectedKindlingDate = expectedKindlingDate;
  }

  if (status === "empty") {
    breeding.expectedKindlingDate = null;
  }

  await breeding.save();

  return breeding;
};
const getPregnantBreedings = async () => {
  const breedings = await Breeding.find({status:"pregnant"}).populate("maleId","code gender").populate("femaleId","code gender").sort({ breedingDate: -1 }).lean();
  return breedings;
}
const getBreedingsByRabbit = async (rabbitId) => {
  const breedings = await Breeding.find({$or:[{maleId:rabbitId},{femaleId:rabbitId}]}).populate("maleId","code gender").populate("femaleId","code gender").sort({ breedingDate: -1 }).lean();
  return breedings;
}

module.exports = {
  createBreeding,
  checkBreeding,
  getPregnantBreedings,
  getBreedingsByRabbit
};