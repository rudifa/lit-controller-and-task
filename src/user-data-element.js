// from https://github.com/lit/lit/blob/main/packages/labs/task/README.md#lit-labstask

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {Task, TaskStatus} from '@lit-labs/task';

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
    `;
  }
  @state()
  userId = 'rudifa';
  //   private _userId: number;

  // https://api.github.com/users/rudifa

  delay = 'https://deelay.me/2000/';

  _apiTask = new Task(
    this,

    // ([userId]) =>
    //   fetch(
    //     `https://deelay.me/1000/https://api.github.com/users/${userId}`
    //   ).then((response) => response.json()),

    async ([userId]) => {
      const response = await fetch(
        //`https://deelay.me/500/https://api.github.com/users/${userId}`
        `https://api.github.com/users/${userId}`
      );
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
    () => [this.userId]
  );

  render() {
    return html`
      <div>
        github user:
        <input
          type="text"
          @change=${(e) => {
            this.userId = e.target.value;
            console.log('userId', this.userId, this._apiTask.autoRun);
            //this._apiTask.run();
          }}
        />
      </div>
      ${this._apiTask.render({
        pending: () => html`Loading ...`,
        complete: (user) => {
          console.log(`user: ${user}`);
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
    `;
  }
}

// complete: (user) => html`${user.name}`,
// complete: (user) =>{return  html`${user.name}`},
