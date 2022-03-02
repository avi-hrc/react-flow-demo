import React, { memo } from 'react';
import Handle from '../Handle';
import {
  circleNodeStyle,
  labelStyle,
  creatorNodeColor,
} from '../../styles/nodeStyles';

export default memo(({ data }) => {
  return (
    <div
      style={{
        ...circleNodeStyle,
      }}
    >
      <Handle type="target" position="top" color={creatorNodeColor} />
      <div style={{ ...labelStyle, color: creatorNodeColor }}>
        {data?.label ? data.label : '+'}
      </div>
    </div>
  );
});
