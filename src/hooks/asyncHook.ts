import mongoose from "mongoose";

const convert = <T extends mongoose.Document>(model: T, vm: T): T => {
  const source = Object.create(model);
  const keys = Object.keys(vm);

  let viewModel = {} as any;
  keys.forEach((k) => {
    viewModel[k] = source[k];
  });
  return viewModel;
};

export const getAll = async <T extends mongoose.Document>(
  collection: mongoose.Model<T>,
  vm: T
): Promise<T[]> => {
  const models = await collection.find().exec();
  const vms = models.map((model) => convert<T>(model, vm));
  return vms;
};

export const save = async <T extends mongoose.Model<T>>(
  collection: T,
  payload: T
): Promise<any> => {
  const obj = {
    ...payload,
    id: new mongoose.Types.ObjectId(),
  };
  const savedObj = await collection.create(obj);
  return savedObj.id;
};
