import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { urlencoded } from 'express';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ){}


  async exceteSEED(){
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonToInsert: {name: string, no: number}[] = [];
    data.results.forEach(({name, url}) =>{
      const segment = url.split('/');
      const no = +segment[ segment.length - 2 ];
     
      pokemonToInsert.push({name, no});
    });
    const resp = await this.pokemonModel.insertMany( pokemonToInsert );
    return `Se han insertado ${ resp.length } registros.`;
  }
}
