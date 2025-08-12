import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], text: string): any[] {
    return products.filter((item) =>
      item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
  }
}
