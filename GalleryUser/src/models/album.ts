import { Image } from "./image";

export class  Album  {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public createdAt: Date,
        public updateAt: Date,
        public userId: number,
        public images: Image[],
    ){}
};