class Component {
  constructor() {
    this.state = {};
  }

  setState(obj) {
    const currentDOM = this.render();
    this.state = Object.assign({}, this.state, obj);
    const nextDOM = this.render();
    this.updateComponent(currentDOM, nextDOM);
  }

  updateComponent(current, next) {
    diffComps(current, next);
  }
}

const findMissingChild = (cArr, nArr) => {
  let missingNode;
  nArr.forEach(node => {
    if (!cArr.includes(node)) {
       missingNode = node;
    }
  });

  return missingNode;
}

const diffComps = (current, next) => {
  const diff = (c, n) => {
    if (c.children && c.children.length !== n.children.length) {
      const currentElement = document.getElementsByClassName(c.props.class)[0];
      currentElement.appendChild(render(findMissingChild(c.children, n.children)));
    } else if (c.children) {
      c.children.forEach((child, i) => {
        diff(child, n.children[i]);
      });
    } 
  } 

  diff(current, next);
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const inputVal = document.getElementsByClassName('input')[0].value;
    if (inputVal) {
      this.setState({ todos: this.state.todos.concat(inputVal) })
      document.getElementsByClassName('input')[0].value = '';
    }
  }

  render() {
    const todos = this.state.todos.map(todo => createElement('div', {}, todo));

    return createElement('div', {}, 
      createElement('input', { class: 'input' }),
      createElement('button', { onclick: this.handleButtonClick }, 'Submit'),
      createElement('h4', {}, 'Todos'),
      createElement('ul', { class: 'todos-list' }, 
        ...todos
      )
    )
  }
}

let createElement = (nodeType, props, ...children) => {
  return {
    type: nodeType,
    props,
    children
  };
}

const renderDOM = (Class, domEl) => {
  const comp = new Class();
  domEl.appendChild(render(comp.render()));
}

const render = (node) => {
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

renderDOM(
  Main,
  document.getElementsByClassName('app')[0]
);
