
// from https://github.com/lit/lit/blob/main/packages/labs/task/README.md#lit-labstask

import {Task, TaskStatus} from '@lit-labs/task';
// ...

class MyElement extends LitElement {
  @state()
  private _userId: number;

  private _apiTask = new Task(
    this,
    ([userId]) =>
      fetch(`//example.com/api/userInfo?${userId}`).then((response) =>
        response.json()
      ),
    () => [this.userId]
  );

  render() {
    return html`
      <div>User Info</div>
      ${this._apiTask.render({
        pending: () => html`Loading user info...`,
        complete: (user) => html`${user.name}`,
      })}
      <!-- ... -->
    `;
  }
}