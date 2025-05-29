export class User {
  constructor(
    public id: number,
    public fullName: string,
    public email: string,
    public role: string,
    public createdAt: Date,
    public lastUpdatedAt: Date,
    public password: string
  ) {}
}
