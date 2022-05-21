/*
 * @Description: 
 * @Author: zhangxuelong
 * @Date: 2022-05-21 16:18:09
 */
import { numberAnimation } from './tool';
import { isObject } from './types';

/*
 * @Description: 自定义指令
 * @Author: zhangxuelong
 * @Date: 2022-04-21 10:12:09
 */
const basics = {
  drag: {
    inserted(el, binding) {
      const { value } = binding;
      const { position, top, left, zIndex } = value || {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999
      };

      const { width, height } = document.body.getBoundingClientRect();
      el.style.position = position;
      el.style.top = top
        ? top
        : `${(height - el.clientHeight) / 2}px`;
      el.style.left = left
        ? left
        : `${(width - el.clientWidth) / 2}px`;
      el.style.zIndex = zIndex;
      let disX = 0;
      let disY = 0;

      const bar = el.querySelector('.drag-bar');

      el._handelrDown = downEv => {
        downEv.stopPropagation();
        if (bar && downEv.target !== bar) return;

        disX = downEv.clientX - el.offsetLeft;
        disY = downEv.clientY - el.offsetTop;

        document.addEventListener('mousemove', el._handelrMove);
        document.addEventListener('mouseup', el._handelrUp);
      };

      el._handelrMove = moveEv => {
        let l = moveEv.clientX - disX;
        let t = moveEv.clientY - disY;
        el.style.left = l + 'px';
        el.style.top = t + 'px';
      };

      el._handelrUp = () => {
        document.removeEventListener('mousemove', el._handelrMove);
        document.removeEventListener('mouseup', el._handelrUp);
      };

      document.addEventListener('mousedown', el._handelrDown);
    },

    unbind(el) {
      document.removeEventListener('mousedown', el._handelrDown);
    }
  },
  numAn: {
    inserted(el, binding) {
      const { value } = binding;
      let unit = '';
      if (isObject(value)) {
        unit = value.unit || '';
      }
      el.innerHTML = 0 + unit;
    },

    update(el, binding) {
      const { value } = binding;
      let end = '';
      let unit = '';
      if (isObject(value)) {
        const { value: v, unit: u = '' } = value;
        end = v;
        unit = u;
      } else {
        end = value;
      }

      numberAnimation({
        end,
        callback: val => {
          el.innerHTML = `${val}${unit}`;
        }
      });
    }
  }
};

export default {
  install(Vue) {
    Object.keys(basics).forEach(name => {
      Vue.directive(name, { ...basics[name] });
    });
  }
};
