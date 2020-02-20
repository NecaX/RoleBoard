import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';


const SortableItem = SortableElement(({value, display, index}) => display(value, index));

const SortableList = SortableContainer(({items, display}) => {
  return (
    <div>
      {items.map((value, index) => {
        if(value.done) {
          return display(value, index)
        }else{
          return <SortableItem key={`item-${index}`} index={index} value={value} display={display} disabled={value.done}/>
        }
        
      })}
    </div>


  );
});

class SortableMaterialList extends Component {
  render() {
    return <SortableList items={this.props.items} onSortEnd={this.props.onSortEnd} display={this.props.display} />;
  }
}

export default SortableMaterialList;