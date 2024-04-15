import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class BookWoody {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    name: string;
    @Column()
    categories: string;
    @Column()
    description: string;
    @Column()
    linkLeer: string;
    @Column()
    linkImagen: string;
}
