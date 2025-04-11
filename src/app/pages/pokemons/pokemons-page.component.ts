import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { toSignal  } from '@angular/core/rxjs-interop'
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PokemosListSkeletonComponent } from "./ui/pokemos-list-skeleton/pokemos-list-skeleton.component";

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemosListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit{

  // public currentName = signal('Jean');

  private pokemonsServicio = inject(PokemonsService);

  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map( params => params.get('page') ?? '1' ),
      map( page => (isNaN(+page) ? 1 : +page) ),
      map( page => Math.max(1, page ))
    )
  )

  // public isloading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log( {isStable} )
  // })

  ngOnInit(): void {

    // this.route.queryParamMap.subscribe( params => console.log(params) );

    this.loadPokemons();
    // setTimeout(() => {
    //   this.isloading.set( false)
    // }, 1500);
  }

  public loadPokemons( page = 0 ) {

    const pageToLoad = this.currentPage()! + page;
    // console.log({ pageToLoad, currentPage: this.currentPage() })

    this.pokemonsServicio.loadPage(pageToLoad)
    .pipe(
      tap(() => this.router.navigate([], {queryParams: { page: pageToLoad }}) ),
      tap( () => this.title.setTitle( `Pokemons SSR - Page ${ pageToLoad }` ) )
    )
    .subscribe( pokemons => {
      this.pokemons.set(pokemons)
    })
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

 }
