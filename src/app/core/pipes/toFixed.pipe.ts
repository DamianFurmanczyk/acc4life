import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({ name: 'toFixed' })
export class ToFixedPipe implements PipeTransform {
    transform(num: number, ...args: any[]) {
        return num.toFixed(args[0] || 2);
    }
}