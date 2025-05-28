import { Tag } from "./tag";

export class Image {
  constructor(
    public id: number,
    public name: string,
    public imgUrl: string,
    public description: string,
    public emotions: string,
    public imgType: string,
    public createdAt: Date,
    public tag: Tag
  ) {}
}
