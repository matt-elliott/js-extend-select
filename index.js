/*
  SuperSelect receives:
  • an array of items
  • an icon url image/text for dropw down arrow
*/

class SuperSelect extends HTMLElement {
  constructor() {
    super();
    this.wrapper = document.createElement('div');
    this.list = document.createElement('ul');
    this.styleEl = document.createElement('style');

    this.list.classList = 'options';
    let defaultOption = document.createElement('li');
    defaultOption.classList = 'active';
    defaultOption.setAttribute('disabled', true);
    defaultOption.innerText = '—— Select ——';
    this.list.prepend(defaultOption)
    this.wrapper.classList = 'super-select';
    this.value = '';

    this.list.addEventListener('click', () => this.openSelect())
    document.addEventListener('click', event => {
      console.error(event.path.includes(this))
      if (!event.path.includes(this)) {
        this.closeSelect();
      }
    });
    this.wrapper.append(this.list);
  }

  connectedCallback() {
    console.error('erher')
    this.styleEl.textContent = `
      .super-select,
      .super-select * {
        box-sizing: border-box;
      }
      .super-select {
        width: 100px;
        margin: 0;
        background-color: #f3f3f3;
        color: #121212;
        overflow: hidden;
      }
      .options {
        position: relative;
        padding: 8px;
        border: 1px solid #9f9f9f6b;
        border-radius: 5px;
        list-style: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
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
        max-width: 100%;
        padding: 8px 4px;
        text-overflow: ellipsis;
      }
      .options.open li,
      .options li.active {
        position: relative;
        visibility: visible;
      }
    `;

    this.appendChild(this.styleEl);
    this.appendChild(this.wrapper);
  }

  get value() {
    return this.wrapper.getAttribute('value')
  }
  set value(data) {
    this.wrapper.setAttribute('value', `${data}`.trim());
  }

  addOption(data) {
    let li = document.createElement('li');
    let closeBtn = document.createElement('button');
    li.setAttribute('value', data.value)
    li.innerText = data.key;
    closeBtn.classList = 'btn delete';
    closeBtn.innerText = '(x)';
    closeBtn.type = 'button';

    li.append(closeBtn);
    this.list.append(li);
    let id = Array.from(this.list).length + 1;

    closeBtn.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      this.removeElement(id);
    });
    li.addEventListener('click', event => this.changeValue(event));
  }

  removeElement(id) {
    console.log('remove', id)
    this.querySelectorAll('li')[id].remove();
    // this.querySelectorAll('li').forEach(el => {
    //   if (el.key == key) { console.error(`kill ${el}`); el.remove(); }
    // })
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
    this.opencb = this.closeSelect.bind(this);
  }
  closeSelect() {
    console.error('close me!')
    document.removeEventListener('click', this.opencb)
    this.list.classList.remove('open');
  }
}

// define new element
customElements.define('super-select', SuperSelect);

// DEMO INIT
window.onload = function () {
  let select = document.createElement('super-select');
  document.body.append(select);
  select.addOption({ key: 'Option # 1', value: '1' });
  select.addOption({ key: 'Option # 2', value: '2' });
  select.addOption({ key: 'Option Number 3', value: '3' });
  select.addOption({ key: 'Option # 4', value: '4' });

}