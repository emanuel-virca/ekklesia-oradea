import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
  name: 'secondsToTime',
})
export class SecondsToTimePipe implements PipeTransform {
  transform(value: number, args?: any): any {
    if (isNaN(Number(value))) {
      return '--:--';
    }

    return this.convertSecondsToTime(value);
  }

  private convertSecondsToTime(duration) {
    const roundedSeconds = Math.round(duration);
    const minutes = Math.floor(roundedSeconds / 60);
    const seconds = Math.floor(roundedSeconds % 60);

    return this.formatTime(seconds, minutes);
  }

  private formatTime(seconds, minutes) {
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  }
}
