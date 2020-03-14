import { Pipe, PipeTransform } from '@angular/core';
import { ResourceType } from '@shared/models/resource';

@Pipe({
  name: 'resourceIcon',
})
export class ResourceIconPipe implements PipeTransform {
  transform(value: ResourceType): any {
    switch (value) {
      case ResourceType.Article:
        return 'create';
      case ResourceType.Audio:
        return 'mic';
      case ResourceType.Video:
        return 'videocam';
      default:
        return 'image';
    }
  }
}
