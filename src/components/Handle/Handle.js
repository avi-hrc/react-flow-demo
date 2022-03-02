import React from 'react';
import { Handle as ReactFlowHandle } from 'react-flow-renderer';
import { defaultHandleColor } from '../../styles/nodeStyles';

const Handle = ({ id, type, position, color }) => (
  <ReactFlowHandle
    id={id}
    type={type}
    position={position}
    style={{ background: color ? color : defaultHandleColor }}
    // onConnect={(params) => console.log('default handle onConnect', params)}
  />
);

export default Handle;
