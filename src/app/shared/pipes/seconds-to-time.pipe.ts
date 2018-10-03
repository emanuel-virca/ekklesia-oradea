import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (value == null) { return '--:--'; }

    return this.convertSecondsToTime(value);
  }

  private convertSecondsToTime(currentTime) {
    const minutes = Math.floor(currentTime / 60),
      seconds = Math.floor(currentTime % 60);

    return this.formatTime(seconds, minutes);
  }

  private formatTime(seconds, minutes) {
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  }

}
