import React from "react";
import { usePolyverseContext } from "../../../context/Auth";
import Card from "../../Card";
import { useNavigate } from "react-router-dom";

const Creator = () => {
  const navigate = useNavigate();
  const handleNavigate = (item: any) => {
    navigate(`/profile/${item.name}`, { state: item });
  };
  const { allCreator } = usePolyverseContext();
  return (
    <div className="flx flex-wrap gap-4 w-full">
      {allCreator.map((item, i) => (
        <Card content={item} key={i} handleClick={() => handleNavigate(item)} />
      ))}
    </div>
  );
};

export default Creator;
