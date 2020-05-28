import React from 'react';
import { RoadmapNodeType } from './index';

interface IProps {
  type: RoadmapNodeType;
  what?: JSX.Element;
  when?: string;
}

const RoadmapNode: React.FC<IProps> = ({ type, when, what }) => {
  if (type === RoadmapNodeType.ELLIPSIS) {
    return <div className="ellipsis"></div>;
  } else {
    return (
      <div className="date">
        <div>{when}</div>
        <div>{what}</div>
      </div>
    );
  }
};

export default RoadmapNode;
