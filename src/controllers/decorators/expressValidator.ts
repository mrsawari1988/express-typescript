import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { ValidationChain } from 'express-validator';
export function expressValidator(validationRules: ValidationChain[]) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKeys.validator, validationRules, target, key);
    };
}
