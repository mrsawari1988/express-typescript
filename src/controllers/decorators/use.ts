import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadataKeys.miidleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(MetadataKeys.miidleware, middlewares, target, key);
    };
}
