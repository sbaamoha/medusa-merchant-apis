import { Column, Entity } from "typeorm";

@Entity()
export class Token {
  @Column()
  snapchat_token: string;
  @Column()
  bing_token: string;
}
