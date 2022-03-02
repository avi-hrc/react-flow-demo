import React, { memo } from 'react';
import Handle from '../Handle';
import {
  diamondNodeStyle,
  diamondRotation,
  innerDiamondNodeStyle,
  labelStyle,
} from '../../styles/nodeStyles';

export default memo(({ id, data }) => {
  const showLabel = () => {
    if (data?.label) {
      return data.label;
    } else if (data?.rules?.questionId) {
      return data.rules.questionId;
    } else {
      return 'Rule Node';
    }
  };

  return (
    <div
      style={{
        ...diamondNodeStyle,
      }}
    >
      <Handle type="target" position="top" />
      <div
        style={{
          ...innerDiamondNodeStyle,
        }}
      >
        <div
          style={{
            ...labelStyle,
            transform: `rotate(-${diamondRotation}deg)`,
            height: '75%',
            width: '75%',
          }}
        >
          {showLabel()}
        </div>
      </div>
      <Handle id={id + 'Left'} type="source" position="left" />
      <Handle id={id + 'Right'} type="source" position="right" />
    </div>
  );
});
