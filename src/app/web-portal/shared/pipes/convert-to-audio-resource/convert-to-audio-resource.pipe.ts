import { Pipe, PipeTransform } from '@angular/core';

import { Resource, AudioResource } from '@shared/models/resource';

@Pipe({
  name: 'convertToAudioResource',
})
export class ConvertToAudioResourcePipe implements PipeTransform {
  transform(value: Resource, args?: any): any {
    return new AudioResource(value);
  }
}
