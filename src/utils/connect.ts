import Component from '../services/Component.ts';
import Store, { StoreEvents } from '../services/Store.ts';
import isEqual from './isEqual.ts';
import Indexed from '../types/indexed.ts';

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
