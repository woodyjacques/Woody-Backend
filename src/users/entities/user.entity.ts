import { Column, DeleteDateColumn, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class UserWoody {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  name: string;
  @Column({ unique: true, nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column()
  paper: string;
  @Column()
  isVerified: boolean;
  @DeleteDateColumn()
  deletedAt: Date;
}
