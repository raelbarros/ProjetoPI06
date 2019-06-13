export class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public nickname: string;
    public email: string;
    public password: string;

    public acceptPolicy: boolean; // only FRONT END
}