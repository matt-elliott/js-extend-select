/*
  SuperSelect receives:
  • an array of items
  • an icon url image/text for dropw down arrow
*/

class SuperSelect extends HTMLElement {
  constructor() {
    super();

    // create shadow root (the hidden dom we attach all our functionality to)
    var shadow = this.attachShadow({ mode: 'open' });
    this.wrapper = document.createElement('div');
    this.list = document.createElement('ul');
    let defaultOption = document.createElement('li');
    let style = document.createElement('style');
    let arr = JSON.parse(this.getAttribute('text'));
    let bgColor = this.getAttribute('background-color');
    let hgColor = this.getAttribute('highlight-color');
    let textColor = this.getAttribute('text-color');
    let borderColor = this.getAttribute('border-color');

    this.list.classList = 'options';
    defaultOption.classList = 'active';
    defaultOption.setAttribute('disabled', true);
    defaultOption.innerText = '—— Select ——';
    this.list.prepend(defaultOption)
    this.wrapper.classList = 'super-select';
    this.value = 'test';

    style.textContent = `
      .super-select {
        width: auto;
        margin: 0 auto;
        background-color: ${bgColor};
        color: ${textColor};
      }
      .options {
        position: relative;
        padding: 8px;
        border: 1px solid ${borderColor};
        border-radius: 5px;
        list-style: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
      }
      .options li {
        padding: 8px 0;
      }
      .options li[disabled=true]::after {
        content: 'V';
        margin: 0 8px 0 4px;
      }
      .options li {
        position: absolute;
        top: 0;
        left: 0;
        visibility: hidden;
      }
      .options.open li,
      .options li.active {
        position: relative;
        visibility: visible;
      }
    `;

    arr.forEach(item => {
      let li = document.createElement('li');
      li.setAttribute('value', item.value)
      li.innerText = item.key;
      this.list.append(li);

      li.addEventListener('click', event => this.changeValue(event))
      this.list.addEventListener('click', () => this.openSelect())
    });

    this.wrapper.append(this.list);
    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);
  }

  get value() {
    return this.wrapper.getAttribute('value')
  }
  set value(data) {
    this.wrapper.setAttribute('value', `${data}`.trim());
  }

  changeValue(event) {
    this.list.querySelectorAll('.active').forEach(el => {
      console.error(el)
      el.classList.remove('active')
    });
    event.target.classList.toggle('active');
    this.value = event.target.value;
  }

  openSelect() {
    this.list.classList.toggle('open');
  }
}

// define new element
customElements.define('super-select', SuperSelect);