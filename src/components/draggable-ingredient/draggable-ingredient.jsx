import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import {
  DELETE_ITEM_CONSTRUCTOR,
  MOVE_ITEM_CONSTRUCTOR,
} from '@services/actions/burger-constructor.js';

import styles from './draggable-ingredient.module.css';

export const DraggableIngredient = ({ item, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'sortIngred',
    item: () => {
      return { id: item.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'sortIngred',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex)
      dispatch({
        type: MOVE_ITEM_CONSTRUCTOR,
        payload: {
          fromIndex: dragIndex,
          toIndex: hoverIndex,
        },
      });
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const dispatch = useDispatch();
  return (
    <li
      className={styles.element_row_box}
      ref={ref}
      style={{ opacity: opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon />
      <div className={styles.constructor_element_box}>
        <ConstructorElement
          isLocked={false}
          text={item?.name}
          price={item?.price}
          thumbnail={item?.image}
          handleClose={() => {
            dispatch({ type: DELETE_ITEM_CONSTRUCTOR, payload: item.id });
          }}
        />
      </div>
    </li>
  );
};
