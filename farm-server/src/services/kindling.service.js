const Kindling = require("../models/Kindling");
const Breeding = require("../models/Breeding");

const createKindling = async ({
    breedingId,
    kindlingDate,
    totalBorn,
    alive,
    dead
}) => {
    // 1 حدوث تزاوج بالفعل
    const breeding = await Breeding.findById(breedingId);
    if (!breeding) {
        throw new Error("Breeding record not found");
    }

    // 2  حدوث تزاوج بالفعل والحمل مؤكد
    if (breeding.status !== "pregnant") {
        throw new Error("Breeding is not pregnant");
    }
    
    // 3 التحقق من مدة الحمل
    const breedingDate = new Date(breeding.breedingDate);
    const actualKindlingDate = new Date(kindlingDate);

    const pregnancyDays = Math.floor(
        (actualKindlingDate - breedingDate) /
        (1000 * 60 * 60 * 24)
    );

    if (pregnancyDays < 28 || pregnancyDays > 35) {
        throw new Error(
            "Kindling date must be between 28 and 35 days after breeding date"
        );
    }
    
    // 3 مينفعش ولادتين لنفس التزاوج
    const existingKindling = await Kindling.findOne({ breedingId });
    if (existingKindling) {
        throw new Error("Kindling for this breeding already exists");
    }

    // 4 التحقق من الاعداد
    if (totalBorn <= 0) {
        throw new Error("Total born must be greater than 0");
    } else if (alive + dead !== totalBorn ) {
        throw new Error("Total born must be equal to alive + dead");
    }
    // 5 انشاء سجل الولادة
    const kindling = await Kindling.create({
        breedingId,
        maleId: breeding.maleId,
        femaleId: breeding.femaleId,
        kindlingDate,
        totalBorn,
        alive,
        dead
    });

    return kindling;
}
const getKindlings = async () => {
    const kindlings = await Kindling.find({}).populate("maleId","code gender").populate("femaleId","code gender").sort({ kindlingDate: -1 }).lean();
    return kindlings;
}

const getKindlingsByRabbit = async (id) => {
    const kindlings = await Kindling.find({$or:[{maleId:id},{femaleId:id}]}).populate("maleId","code gender").populate("femaleId","code gender").sort({ kindlingDate: -1 }).lean();
    return kindlings;
}

const getKindling = async (id) => {
    const kindling = await Kindling.findById(id).populate("maleId","code gender").populate("femaleId","code gender").lean();
    return kindling;
}


const updateKindling = async (id, data) => {
    const kindling = await Kindling.findByIdAndUpdate(id, data, { new: true }).populate("maleId","codegender").populate("femaleId","codegender").lean();
    return kindling;
}


module.exports = { 
    createKindling,
    getKindlings,
    getKindlingsByRabbit,
    getKindling,
    updateKindling
};