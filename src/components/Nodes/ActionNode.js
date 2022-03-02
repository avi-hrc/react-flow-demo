import React, { memo } from 'react';
import Handle from '../Handle';
import {
  rectangleNodeStyle,
  labelStyle,
  startNodeColor,
  endNodeColor,
  darkColor,
} from '../../styles/nodeStyles';

export default memo(({ data }) => {
  const showLabel = () => {
    if (data?.label) {
      return data.label;
    } else if (data.isStart) {
      return 'Start';
    } else if (data.isEnd) {
      return 'End';
    } else if (data?.action) {
      return data.action;
    } else {
      return 'Action Node';
    }
  };

  let color = darkColor;
  if (data.isStart) {
    color = startNodeColor;
  } else if (data.isEnd) {
    color = endNodeColor;
  }

  return (
    <div
      style={{
        ...rectangleNodeStyle,
        borderColor: color,
      }}
    >
      {data.isStart ? null : (
        <Handle type="target" position="top" color={color} />
      )}
      <div style={{ ...labelStyle }}>{showLabel()}</div>
      {data.isEnd ? null : (
        <Handle type="source" position="bottom" color={color} />
      )}
    </div>
  );
});
