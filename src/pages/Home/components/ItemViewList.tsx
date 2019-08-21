import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RootState, ItemsActions } from "../../../redux/types";
import { connect } from "react-redux";
import { ItemsState, Item } from "../../../redux/reducers/item";
import ItemViewCard from "./ItemViewCard";
import getSortedItems from "../../../redux/selectors";
import { withFirebase } from "../../../firebase";
import { compose } from "recompose";
import { doSetItems } from "../../../redux/actions/item";

class ItemViewList extends React.Component<any, ItemsState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.firebase.items().on("value", (snapshot: any) => {
      const itemsObject = snapshot.val();

      const itemsList = Object.keys(itemsObject).map(key => ({
        ...itemsObject[key],
        id: key
      }));
      this.props.onSetItems(itemsList);
    });
  }

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  render() {
    const { items } = this.props;
    return (
      <div className="row">
        {items.map((item: Item) => (
          <ItemViewCard
            key={item.id}
            make={item.make}
            model={item.model}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: getSortedItems(state)
});

const mapDispatchToProps = (dispatch: React.Dispatch<ItemsActions>) => ({
  onSetItems: (items: any) => dispatch(doSetItems(items))
});

const ConnectedItemViewList = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFirebase
)(ItemViewList);

export default ConnectedItemViewList;
