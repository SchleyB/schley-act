import { diffComps, setLocalStorage } from './helpers.js';

export class Component {
  constructor() {
    this.state = {};
  }

  setState(obj) {
    const currentDOM = this.render();
    this.state = Object.assign({}, this.state, obj);
    setLocalStorage(this.state);
    const nextDOM = this.render();
    this.updateComponent(currentDOM, nextDOM);
  }

  updateComponent(current, next) {
    diffComps(current, next);
  }
}

export const createElement = (nodeType, props, ...children) => {
  return {
    type: nodeType,
    props,
    children
  };
}

export const renderDOM = (Class, domEl) => {
  const comp = new Class();
  domEl.appendChild(render(comp.render()));
}

export const render = (node) => {
  function renderChildren(e) {
    const el = document.createElement(e.type);
    Object.keys(e.props).forEach(key => {
      if (key === 'onclick') {
        el.addEventListener('click', e.props[key]);
      } else {
        el.setAttribute(key, e.props[key]);
      }
    });

    e.children && e.children.forEach(c => {
      if (typeof c === 'string') {
        el.innerText = c;
      } else {
        el.appendChild(renderChildren(c));
      }
    });

    return el;
  }

  return renderChildren(node);
}
