import Component from '../services/Component';
import Store, { StoreEvents } from '../services/Store';
import isEqual from './isEqual';
import Indexed from '../types/indexed';

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Block: typeof Component) : typeof Component {
    return class extends Block {
      constructor(tagName: string, propsAndChildren: Record<string, any>) {
        let state = mapStateToProps(Store.getState());
        super(tagName, { ...propsAndChildren, ...state });
        Store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(Store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    };
  };
}
