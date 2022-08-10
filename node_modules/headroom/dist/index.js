import { debounce } from 'lodash-es';
let styleInserted = false;
const insertStyle = (selector) => {
    if (!styleInserted) {
        styleInserted = true;
        document.head.insertAdjacentHTML('beforeend', `
      <style>
        ${selector} {
          position: sticky;
          top: 0;
          transition: transform .25s ease-in-out, box-shadow .5s;
          will-change: transform;
        }

        ${selector}.hidden {
          transform: translateY(-100%);
        }

        ${selector}.unpinned {
          box-shadow: 0 0 35px 0 rgba(2, 2, 2, .08);
        }
      </style>
      `);
    }
};
const headroom = (target = '.headroom', { useStyle = true, wait = 50 } = {}) => {
    let header;
    if (typeof target === 'string') {
        const match = document.querySelector(target);
        if (match)
            header = match;
        else
            throw new Error('[Head Room] Selector matched none');
        if (useStyle)
            insertStyle(target);
    }
    else if (target instanceof Element)
        header = target;
    else
        throw new TypeError('[Head Room] Invalid target');
    let scrollY = 0;
    const listener = debounce(() => {
        header.classList.toggle('unpinned', window.pageYOffset >= header.clientHeight);
        header.classList.toggle('hidden', header.classList.contains('unpinned') && window.pageYOffset >= scrollY);
        scrollY = window.pageYOffset;
    }, wait);
    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
};
export { headroom };
//# sourceMappingURL=index.js.map