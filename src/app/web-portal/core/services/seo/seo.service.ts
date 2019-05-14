import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {
  constructor(private meta: Meta, private titleService: Title) {}

  generateTags(tags) {
    // default values
    tags = {
      title: 'Ekklesia Oradea',
      description: 'Biserica Penticostal Ekklesia din Oradea',
      image:
        // tslint:disable-next-line:max-line-length
        'https://firebasestorage.googleapis.com/v0/b/ekklesia-oradea-705d6.appspot.com/o/web_hi_res_512.png?alt=media&token=0e8d0812-2e24-45b3-9a5d-5818640b9bba',
      slug: '',
      ...tags,
    };

    // Set a title
    this.titleService.setTitle(tags.title);

    // Set meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@angularfirebase' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Ekklesia Oradea' });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:image', content: tags.image });
    this.meta.updateTag({ property: 'og:url', content: `https://ekklesia-oradea-705d6.firebaseapp.com/${tags.slug}` });
  }
}
