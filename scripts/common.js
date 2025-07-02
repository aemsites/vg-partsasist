let placeholders = null;

export async function getPlaceholders() {
  const language = window.location.pathname.match(/\/fr\//);
  let url = '/placeholder.json';
  if (language) {
    url = `${language[0]}placeholder.json`;
  }
  placeholders = await fetch(url).then((resp) => resp.json());
}

export function getTextLabel(key) {
  return placeholders.data.find((el) => el.Key === key)?.Text || key;
}

/**
   * Create an element with the given id and classes.
   * @param {string} tagName the tag
   * @param {Object} options the element options
   * @param {string[]|string} [options.classes=[]] the class or classes to add
   * @param {Object} [options.props={}] any other attributes to add to the element
   * @returns {HTMLElement} the element
   */
export function createElement(tagName, options = {}) {
  const { classes = [], props = {} } = options;
  const elem = document.createElement(tagName);
  const isString = typeof classes === 'string';
  if (classes || (isString && classes !== '') || (!isString && classes.length > 0)) {
    const classesArr = isString ? [classes] : classes;
    elem.classList.add(...classesArr);
  }
  if (!isString && classes.length === 0) elem.removeAttribute('class');

  if (props) {
    Object.keys(props).forEach((propName) => {
      const value = propName === props[propName] ? '' : props[propName];
      elem.setAttribute(propName, value);
    });
  }

  return elem;
}
/**
   * Adds the favicon.
   * @param {string} href The favicon URL
   */
export function addFavIcon(href) {
  const link = createElement('link', { props: { rel: 'icon', type: 'image/svg+xml', href } });
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

export const unwrapDivs = (element) => {
  Array.from(element.children).forEach((node) => {
    if (node.tagName === 'DIV' && node.attributes.length === 0) {
      while (node.firstChild) {
        element.insertBefore(node.firstChild, node);
      }
      node.remove();
      unwrapDivs(element);
    } else {
      unwrapDivs(node);
    }
  });
};

/*
* Convert a list of classes to BEM notation for variants.
* @param {DOMTokenList} blockClasses the classes of the block
* @param {string[]} expectedVariantsNames the expected variant names
* @param {string} blockName the name of the block
* @returns {void}
*/
export const variantsClassesToBEM = (blockClasses, expectedVariantsNames, blockName) => {
  expectedVariantsNames.forEach((variant) => {
    if (blockClasses.contains(variant)) {
      blockClasses.remove(variant);
      blockClasses.add(`${blockName}--${variant}`);
    }
  });
};

/**
   * Check if one trust group is checked.
   * @param {String} groupName the one trust croup like: C0002
   */
export function checkOneTruckGroup(groupName) {
  const oneTrustCookie = decodeURIComponent(document.cookie.split(';').find((cookie) => cookie.trim().startsWith('OptanonConsent=')));
  return oneTrustCookie.includes(`${groupName}:1`);
}
