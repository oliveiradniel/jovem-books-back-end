export interface IRepository<
  Model,
  SearchModel,
  CreateModel,
  DeleteModel,
  ListModel = any,
  UpdateModel = any,
> {
  list?(data: ListModel): Promise<Model[]>;
  findById(data: SearchModel): Promise<Model | null>;
  create(data: CreateModel): Promise<Model | void>;
  update?(data: UpdateModel): Promise<Model | void>;
  delete(data: DeleteModel): Promise<void>;
}
