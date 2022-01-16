import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';
import { RequestHandler, Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

function expressValidators(): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('Invalid Request');
            return;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).send('email and password are required !');
            return;
        }
        next();
    };
}

export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];

            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);

            const middlewares =
                Reflect.getMetadata(MetadataKeys.miidleware, target.prototype, key) || [];

            const requiredBodyProps =
                Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];

            const validator = expressValidators();

            if (path) {
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    requiredBodyProps,
                    validator,
                    routeHandler
                );
            }
        }
    };
}
