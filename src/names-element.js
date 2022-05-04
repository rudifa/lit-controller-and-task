
// from https://lit.dev/docs/composition/controllers/

import {LitElement, html} from 'lit';
import {NamesController} from './names-controller.js';

export class MyElement extends LitElement {
  names = new NamesController(this);

  render() {
    return html`
      <h3>Names List</h3>
      Kind: <select @change=${this._kindChange}>
      ${this.names.kinds.map((k) => html`<option value=${k}>${k}</option>`)}
    </select>
    ${this.names.render({
      complete: (result) => html`
        <p>List of ${this.names.kind}</p>
        <ul>${result.map((i) => html`<li>${i.value}</li>`)}
        </ul>
      `,
      initial: () => html`<p>Select a kind...</p>`,
      pending: () => html`<p>Loading ${this.names.kind}...</p>`,
      error: (e) => html`<p>Error: ${e}</p>`,
    })}`;
  }

  _kindChange(e) {
    this.names.kind = e.target.value;
  }
}
customElements.define('my-element', MyElement);
