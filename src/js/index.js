import * as Core from './core.js';
import { getLocalStorage } from './helpers.js';

class Main extends Core.Component {
  constructor() {
    super();
    this.state = getLocalStorage() || {
      todos: []
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const inputVal = document.getElementsByClassName('input')[0].value;
    if (inputVal) {
      this.setState({ todos: this.state.todos.concat(inputVal) })
      document.getElementsByClassName('input')[0].value = '';
    }
  }

  handleRemoveTodo(removedTodo) {
    this.setState({ todos: this.state.todos.filter(todo => todo !== removedTodo) });
  }

  render() {
    const todos = this.state.todos.map(todo => Core.createElement('li', {}, todo,
      Core.createElement('span', { class: 'remove-item', onclick: () => this.handleRemoveTodo(todo) }, 'x') 
    ));

    return Core.createElement('div', { class: 'main-form-wrapper' }, 
      Core.createElement('h1', { class: 'main-header' }, 'Todo List App'),
      Core.createElement('div', { class: 'form-wrapper' }, 
        Core.createElement('div', { class: 'input-wrapper' }, 
          Core.createElement('input', { class: 'input' }),
          Core.createElement('button', { onclick: this.handleButtonClick, class: 'submit-button' }, 'Submit')
        ),
        Core.createElement('h4', { class: 'todos-list-header' }, 'Todos'),
        Core.createElement('ul', { class: 'todos-list' }, 
          ...todos
        )
      )
    )
  }
}


Core.renderDOM(
  Main,
  document.getElementsByClassName('app')[0]
);
