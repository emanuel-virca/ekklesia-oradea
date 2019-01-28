import { Pipe, PipeTransform } from '@angular/core';

import { Resource } from '../../models/resource.model';
import { AudioResource } from '../../models/audio-resource.model';

@Pipe({
  name: 'convertToAudioResource'
})
export class ConvertToAudioResourcePipe implements PipeTransform {

  transform(value: Resource, args?: any): any {
    return new AudioResource(value);
  }

}
