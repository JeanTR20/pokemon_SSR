import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  imports: [ RouterLink ],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed( () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ this.pokemon().id }.png` )

  // logEffect = effect( () => {
  //   console.log('pokemonCard: ', this.pokemon() )
  // })
 }
