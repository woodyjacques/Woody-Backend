import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class ProductWoody {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    name: string;
    @Column()
    categories: string;
    @Column()
    description: string;
    @Column()
    linkVer: string;
    @Column()
    linkImagen: string;
}
