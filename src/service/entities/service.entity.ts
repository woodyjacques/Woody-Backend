import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceWoody {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    name: string;
    @Column()
    description: string;
    @Column()
    linkImagen: string;
}
