import { User } from "./user";

export class LoginRes{
    constructor(
        public token:string,
        public user:User,
    ){};
}