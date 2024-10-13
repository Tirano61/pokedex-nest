import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}

  async exceteSEED(){
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
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
