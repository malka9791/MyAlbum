export class LoginRes{
    constructor(
        public token:string,
        public id:number,
        public fullname:string,
        public email:string,
        public role:string
    ){};
}