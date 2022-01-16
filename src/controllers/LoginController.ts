import { Request, Response, NextFunction } from 'express';
import { get, controller, use, post, bodyValidator, expressValidator } from './decorators';
import { loginInputValidator } from './loginValidators/loginInputValidator';

@controller('/auth')
export class LoginController {
    @get('/login')
    getLogin(req: Request, res: Response) {
        res.send(`
          <form method="POST">
            <div>
              <label>Email</label>
              <input name="email" />
            </div>
            <div>
              <label>Password</label>
              <input name="password" type="password" />
            </div>
            <button>Submit</button>
          </form>
        `);
    }
    @post('/login')
    // @bodyValidator('email', 'password')
    @expressValidator(loginInputValidator)
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;

        if (email === 'hi@hi.com' && password === 'password') {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.send('Invalid email or password');
        }
    }
    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect('/');
    }
}
