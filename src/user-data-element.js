// adapted from https://github.com/lit/lit/blob/main/packages/labs/task/README.md#lit-labstask

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {Task, TaskStatus} from '@lit-labs/task';

class AbortableTask extends Task {
  _abortController = undefined;

  abort() {
    if (this._abortController) {
      this._abortController.abort();
    }
  }
}

@customElement('user-data-element')
export class UserDataElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
        font-size: 16px;
        font-family: 'Helvetica Neue', sans-serif;
      }
      input {
        font-size: 14px;
        font-family: 'Helvetica Neue', sans-serif;
      }
    `;
  }

  @state()
  userId = 'rudifa';

  @state()
  _simulateSlowConnection = false;

  fullUrl() {
    return `${
      this._simulateSlowConnection ? 'https://deelay.me/3000/' : ''
    }https://api.github.com/users/${this.userId}`;
  }

  prefix = '';

  delayPrefix = 'https://deelay.me/3000/';

  _apiTask = new AbortableTask(
    this,

    async ([]) => {
      this._apiTask._abortController = new AbortController(); // a fresh one for each run
      const signal = this._apiTask._abortController.signal;
      const user = fetch(this.fullUrl(), {signal})
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then((user) => {
          return user;
        })
        .catch((error) => {
          throw error;
        });
      return user;
    },

    () => [this.userId]
  );

  firstUpdated() {
    // console.log('firstUpdated', this);
  }

  render() {
    return html`
      <div>
        github user:
        <input
          type="text"
          @change=${(e) => {
            this.userId = e.target.value;
          }}
        />
      </div>
      <div>
        <p>
          ${this._apiTask.render({
            pending: () => html`Loading ...`,
            complete: (user) => {
              return html`${user.name}<br />
                ${user.login}
                <br />
                ${user.bio}
                <br />
                ${user.location}
                <br />
                ${user.blog} `;
            },
            error: (e) => html`<p>${e}</p>`,
          })}
        </p>
      </div>
      <div>
        <p>
          <input
            type="checkbox"
            id="slow-conn"
            @change=${(e) => {
              this._simulateSlowConnection = e.target.checked;
            }}
          />
          <label for="slow-conn"> Simulate slow connection</label>
        </p>
      </div>
      <div>
        <input
          type="button"
          ?hidden=${!this._simulateSlowConnection}
          value="Abort"
          @click=${() => {
            this._apiTask.abort();
          }}
        />
      </div>
    `;
  }
}
