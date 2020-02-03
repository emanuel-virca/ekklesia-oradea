import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInitials',
})
export class UserInitialsPipe implements PipeTransform {
  transform(name: string, firstOnly: boolean = null): any {
    if (!name) {
      return null;
    }

    if (firstOnly) {
      return name[0].toUpperCase();
    }

    return name.split(' ').reduce((acc, x) => acc + (x[0] || '').toUpperCase(), '');
  }
}
