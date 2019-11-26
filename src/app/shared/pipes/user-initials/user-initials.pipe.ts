import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInitials',
})
export class UserInitialsPipe implements PipeTransform {
  transform(displayName: string, firstOnly: null): any {
    if (!displayName) {
      return null;
    }

    if (firstOnly) {
      return displayName[0].toUpperCase();
    }

    return displayName.split(' ').reduce((acc, x) => acc + (x[0] || '').toUpperCase(), '');
  }
}
