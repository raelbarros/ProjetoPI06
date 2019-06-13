import { UserModel } from './user';

export class AuthModel {
    public token: string;
    public user: UserModel;
}