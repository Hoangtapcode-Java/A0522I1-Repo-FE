import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, lines: number): string {
    const linesArray = value.split('\n');
    if (linesArray.length > lines) {
      return linesArray.slice(0, lines).join('\n');
    }
    return value;
  }

}
