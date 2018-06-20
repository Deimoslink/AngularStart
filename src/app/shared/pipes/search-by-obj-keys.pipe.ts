import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByObjKeys',
  pure: false
})
export class SearchByObjKeysPipe implements PipeTransform {

  transform(array: Array<any> = [], search: string, keys: Array<string>): any {
    const pattern = new RegExp(search, 'i');
    return array.filter(item => {
      const testString = keys.map(el => item[el]).join();
      return pattern.test(testString);
    });
  }

}
