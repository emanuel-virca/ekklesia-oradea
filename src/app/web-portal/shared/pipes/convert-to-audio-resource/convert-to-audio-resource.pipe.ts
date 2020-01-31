import { Pipe, PipeTransform } from '@angular/core';

import { Resource, convertToAudioResource } from '@shared/models/resource';
import { AudioResource } from 'app/audio-player/models/audio-resource';

@Pipe({
  name: 'convertToAudioResource',
})
export class ConvertToAudioResourcePipe implements PipeTransform {
  transform(value: Resource, args?: any): AudioResource {
    return convertToAudioResource(value);
  }
}
