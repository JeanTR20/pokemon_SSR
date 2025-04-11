import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit{

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi About Page'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'About Page'
    })

  }
 }
