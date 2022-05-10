import {LitElement, html, css} from 'lit';
import {property, state, customElement} from 'lit/decorators.js';

@customElement('info-links')
export class InfoLinks extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        max-width: 832px;
        background-color: #fff8f5;
      }

      h1 {
        font-size: 3rem;
      }
      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 20px;
        padding: 20px;
        background-color: #2196f3;
        background: linear-gradient(315deg, #b4d2ea 0%, #2196f3 100%);
        font-size: 1.8rem;
        font-family: Helvetica;
      }
      .link {
        color: white;
      }
    `;
  }

  aHref(url, text) {
    return html` <a href=${url} class="link" target="_blank">${text} </a>`;
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.aHref('https://lit.dev/', 'Lit')}
        ${this.aHref('https://vitejs.dev/guide/', 'Vite')}
      </div>
    `;
  }
}
