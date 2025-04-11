import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemos-list-skeleton',
  imports: [],
  templateUrl: './pokemos-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemosListSkeletonComponent { }
