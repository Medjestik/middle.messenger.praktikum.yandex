import Component from '../services/Component';
import Store, { StoreEvents } from '../services/Store';
import isEqual from './isEqual';
import Indexed from '../types/indexed';

function connect<T>(
  Block: new (props: T) => Component,
  mapStateToProps: (state: Indexed) => Indexed,
) {
  return class extends Block {
    constructor(props: Indexed) {
    // сохраняем начальное состояние
      let state = mapStateToProps(Store.getState());

      super({ ...props, ...state } as T);

      // подписываемся на событие
      Store.on(StoreEvents.Updated, () => {
        // при обновлении получаем новое состояние
        const newState = mapStateToProps(Store.getState());
        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
          state = newState;
        }

        // не забываем сохранить новое состояние
      });
    }
  };
}

export default connect;
