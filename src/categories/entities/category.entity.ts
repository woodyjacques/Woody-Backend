import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CategoryWoody {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    name: string;
    @Column()
    element: string;
    @Column()
    description: string;
}
