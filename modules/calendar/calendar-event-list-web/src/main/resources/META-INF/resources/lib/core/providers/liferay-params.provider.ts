import LiferayParams from '../models/liferay-params';
import {Injectable, StaticProvider} from '@angular/core';

@Injectable()
export class LiferayParamsProvider {
  constructor(private liferayParams: LiferayParams) {
  }

  instanceOf(): LiferayParams {
    return this.liferayParams;
  }
}

export function getLiferayParamsProvider(liferayParams: LiferayParams): StaticProvider {
  return {provide: LiferayParamsProvider, useValue: new LiferayParamsProvider(liferayParams)};
}
