import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    duration: number;

    @Column()
    releaseDate: Date;

    @Column()
    category: string;
    
}