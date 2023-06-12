import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        const formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
        return formattedDate;
      }
    }
    return value; // Return the input value if it's null, undefined, or in an invalid format
  }
}
