import {asFunction, createContainer} from 'awilix';
import photoRepository from '../data/repository/PhotoRepository.tsx';
import photoListViewModel from "../presentation/home/PhotoListViewModel.ts";
import photoDetailViewModel from "../presentation/detail/PhotoDetailViewModel.ts";

const container = createContainer();

container.register({
  photoRepository: asFunction(photoRepository),
  photoListViewModel: asFunction(photoListViewModel),
  photoDetailViewModel: asFunction(photoDetailViewModel),
});

export const DI = container;
