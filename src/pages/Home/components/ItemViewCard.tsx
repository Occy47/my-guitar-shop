import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type CardProps = {
  name: string;
  price: number;
  description: string;
};

const ItemViewCard: React.FC<CardProps> = props => {
  return (
    <div className="col-sm">
      <div className="card mt-3" style={{ width: "200px" }}>
        <div className="card-body">
          <h3 className="card-title">{props.name}</h3>
          <p className="card-text">{props.description}</p>
          <p>{props.price} kn</p>
        </div>
      </div>
    </div>
  );
};

export default ItemViewCard;
