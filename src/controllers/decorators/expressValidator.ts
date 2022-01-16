import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { ValidationChain } from 'express-validator';
export function expressValidator(keys: ValidationChain[]) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
    };
}
