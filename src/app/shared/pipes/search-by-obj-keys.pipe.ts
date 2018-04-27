import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByObjKeys',
  pure: false
})
export class SearchByObjKeysPipe implements PipeTransform {

  transform(array: Array<any> = [], search: string, keys: Array<string>): any {
    let pattern = new RegExp(search, 'i');
    return array.filter(item => {
      let testString = keys.map(el => item[el]).join();
      return pattern.test(testString);
    });
  }

}
