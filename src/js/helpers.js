import { render } from './core.js';

const findMissingChild = (cArr, nArr) => {
  let missingNode;
  nArr.forEach(node => {
    if (!cArr.includes(node)) {
       missingNode = node;
    }
  });

  return missingNode;
}

const findExtraChildIndex = (cArr, nArr) => {
  return cArr.findIndex((node, i) => !nArr.find(n => n.children[0] === node.children[0]));
};

export const diffComps = (current, next) => {
  const diff = (c, n) => {
    if (c.children && c.children.length !== n.children.length) {
      const currentElement = document.getElementsByClassName(c.props.class)[0];
      if (n.children.length > c.children.length) {
        currentElement.appendChild(render(findMissingChild(c.children, n.children)));
      } else {
        currentElement.removeChild(currentElement.childNodes[findExtraChildIndex(c.children, n.children)]);
      }
    } else if (c.children) {
      c.children.forEach((child, i) => {
        diff(child, n.children[i]);
      });
    } 
  } 

  diff(current, next);
};

export const getLocalStorage = () => {
  if (window.localStorage) {
    const data = window.localStorage.getItem("schleyact");
    return data && JSON.parse(data);
  }

  return null;
};

export const setLocalStorage = obj => {
  if (window.localStorage) {
    window.localStorage.setItem("schleyact", JSON.stringify(obj));
  }
}
