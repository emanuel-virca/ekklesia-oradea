import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInitials',
})
export class UserInitialsPipe implements PipeTransform {
  transform(displayName: string): any {
    if (!displayName) {
      return null;
    }

    return displayName.split(' ').reduce((acc, x) => acc + (x[0] || '').toUpperCase(), '');
  }
}
