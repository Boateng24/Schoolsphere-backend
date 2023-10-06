import { SetMetadata } from '@nestjs/common';
import { Role } from '../@types/types'; // adjust the path as needed

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
