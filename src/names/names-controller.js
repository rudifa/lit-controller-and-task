// from https://lit.dev/docs/composition/controllers/

import {initialState, Task} from '@lit-labs/task';
import * as Names from './names-api.js';

export class NamesController {
  host;
  value;
  kinds = Names.kinds;
  task;
  _kind = '';

  constructor(host) {
    this.host = host;
    this.task = new Task(
      host,
      async ([kind]) => {
        console.log(`fetching ${kind}`);
        if (!kind?.trim()) {
          return initialState;
        }
        const response = await fetch(
          `${Names.baseUrl}${Names.kindIdMap[kind]}`
        );
        const result = await response.json();
        const error = result.error;
        if (error !== undefined) {
          throw new Error(error);
        }
        return result;
      },
      () => [this.kind]
    );
  }

  set kind(value) {
    this._kind = value;
    this.host.requestUpdate();
  }
  get kind() {
    return this._kind;
  }

  render(renderFunctions) {
    return this.task.render(renderFunctions);
  }
}
