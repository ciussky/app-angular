import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(arr: any[], searchTerm: any[], key: string[]): any {
    searchTerm.forEach((char, index) => {
      if (char) {
        arr = arr.filter((item) => {
          return (
            item[key[index]].toString().toLowerCase().indexOf(char.toLowerCase()) !== -1
          )
        });
      }
    });
    return arr;
  }
}
