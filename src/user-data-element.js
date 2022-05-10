// from https://github.com/lit/lit/blob/main/packages/labs/task/README.md#lit-labstask

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {Task, TaskStatus} from '@lit-labs/task';

class AbortableTask extends Task {
  // a new instance must be added by fetch()
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

    async ([userId, prefix]) => {
      this._apiTask._abortController = new AbortController();
      console.log('task:', typeof this, this); // task: object <user-data-element>​…​</user-data-element>​#shadow-root (open)<!----><div>​" github user: "<input type=​"text">​</div>​<div>​…​</div>​<div>​…​</div>​<div>​…​</div>​</user-data-element>​
      console.log('_abortController:', this._apiTask._abortController); // task: object <user-data-element>​…​</user-data-element>​#shadow-root (open)<!----><div>​" github user: "<input type=​"text">​</div>​<div>​…​</div>​<div>​…​</div>​<div>​…​</div>​</user-data-element>​
      const signal = this._apiTask._abortController.signal;
      //this.host._abortController = controller; // NO GOOD
      // this._abortController = controller;
      const response = await fetch(this.fullUrl(), {signal});
      console.log(`response: ${response}`); // can't be examined in the browser console
      console.log('response.ok', response.ok);
      console.log('response.status', response.status);
      console.log('response', response); // can be examined in the browser console

      if (!response.ok) {
        console.log('response', response);
        throw new Error(`${response.status}`);
      }
      const user = await response.json();

      const error = user.error;
      if (error !== undefined) {
        console.log(`Error: ${error}`);
        throw new Error(error);
      }
      return user;
    },
    () => [this.userId, this.prefix]
  );

  // _abortController = null; // new AbortController();

  firstUpdated() {
    console.log('firstUpdated', this, this.delayPrefix);
  }

  render() {
    return html`
      <div>
        github user:
        <input
          type="text"
          @change=${(e) => {
            this.userId = e.target.value;
            // console.log('userId', this.userId, this._apiTask.autoRun);
            //this._apiTask.run();
          }}
        />
      </div>
      <div>
        <p>
          ${this._apiTask.render({
            pending: () => html`Loading ...`,
            complete: (user) => {
              console.log(`user:`, user);
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

{
  /* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
<label for="vehicle1"> I have a bike</label><br> */
}
// complete: (user) => html`${user.name}`,
// complete: (user) =>{return  html`${user.name}`},
