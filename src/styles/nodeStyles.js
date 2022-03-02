// Colors
const darkColor = '#000';
const lightColor = '#fff';
const greyColor = '#555';
export const defaultHandleColor = greyColor;
export const startNodeColor = '#0041d0';
export const endNodeColor = '#ff0072';
export const creatorNodeColor = 'limegreen';

// Styles
const centerFlexStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const defaultNodeStyle = {
  ...centerFlexStyle,
  background: lightColor,
  padding: '10px',
  border: `1px solid ${darkColor}`,
};

export const rectangleNodeStyle = {
  ...defaultNodeStyle,
  width: '100px',
};

export const circleNodeStyle = {
  ...defaultNodeStyle,
  width: '10px',
  height: '10px',
  border: '1px solid lime',
  borderRadius: '50%',
};

export const diamondNodeStyle = {
  ...defaultNodeStyle,
  border: 'none',
  width: '75px',
  height: '75px',
};

export const diamondRotation = 45;

export const innerDiamondNodeStyle = {
  ...centerFlexStyle,
  height: '100%',
  width: '100%',
  border: '1px solid #000',
  transform: `rotate(${diamondRotation}deg)`,
};

export const labelStyle = {
  color: '#000',
  textAlign: 'center',
  fontSize: '12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
