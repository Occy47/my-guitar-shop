import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemView: React.FC = () => {
  return (
    <div className="card mt-3" style={{ width: "200px" }}>
      <div className="card-body">
        <h3 className="card-title">Gibson Les Paul</h3>
        <p className="card-text">
          Excellent guitar from USA manufactorer Gibson
        </p>
      </div>
    </div>
  );
};

export default ItemView;
