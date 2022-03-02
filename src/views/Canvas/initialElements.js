import React from 'react';

export default [
  {
    id: 'start',
    type: 'action',
    data: {
      isStart: true,
      label: (
        <>
          Start of <strong>Auto Correspondance Flow</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: 'creator1',
    type: 'creator',
    position: { x: 275, y: 75 },
  },
  {
    id: 'e-start-creator1',
    source: 'start',
    target: 'creator1',
    type: 'default',
    arrowHeadType: 'arrow',
  },
];

/*
{
  id: 'question1',
  type: 'rule',
  data: {
    rules: {
      questionId: 'past-due',
      comparator: '>',
      value: '60',
    },
    label: 'Is past due greater than 60%? asfasfasasfasfsafasf',
  },
  position: { x: 250, y: 100 },
},
{
  id: 'action1',
  type: 'action',
  data: {
    action: 'sending-email',
    label: 'Sending Email',
  },
  position: { x: 350, y: 200 },
},
{
  id: 'end1',
  type: 'action',
  position: { x: 350, y: 300 },
  data: {
    isEnd: true,
  },
},
{
  id: 'e-start-question1',
  source: 'start',
  target: 'question1',
  type: 'step',
  animated: false,
  arrowHeadType: 'arrow',
},
{
  id: 'e-question1-action1',
  source: 'question1',
  target: 'action1',
  type: 'smoothstep',
  animated: false,
  arrowHeadType: 'arrow',
},
{
  id: 'e-action1-end1',
  source: 'action1',
  target: 'end1',
  type: 'smoothstep',
  animated: false,
  arrowHeadType: 'arrow',
},
*/
