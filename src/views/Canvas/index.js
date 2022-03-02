import React, { useState, useRef } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
  removeElements,
  addEdge,
  updateEdge,
  getIncomers,
} from 'react-flow-renderer';

import nodeTypes from '../../components/Nodes/nodeTypes';
import Modal from '../../components/Modal';

import initialElements from './initialElements';

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const CREATOR_PREFIX = 'creator';
const ACTION_TYPE = 'action';
const CREATOR_TYPE = 'creator';
const RULE_TYPE = 'rule';

// const RAND_UPPER_LIMIT = 99999999;
const GAP_X = 100;
const GAP_Y = 100;

const actionInput = {
  currentNodeId: CREATOR_PREFIX + 1,
  type: ACTION_TYPE,
  action: 'send-email',
  label: 'Sending Email',
};

const ruleInput = {
  currentNodeId: CREATOR_PREFIX + 1,
  type: RULE_TYPE,
  rules: {
    questionId: 'past_due',
    comparator: '>',
    value: 60,
  },
  label: 'Is past due greater than 60%?',
};

const OverviewFlow = () => {
  // React-Flow
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  // Custom Logic
  const count = useRef(100);
  const [open, setOpen] = React.useState(false);
  const [currentNodeId, setCurrentNodeId] = useState('');

  const getNodeById = (id) => {
    return elements.find((element) => element.id === id);
  };

  const findEdgeByTargetId = (targetId) => {
    return elements.find((element) => element.target === targetId);
  };

  /*
   * Input: Custom actionNode/ruleNode object
   * 1. Finds the clickedNode (which was clicked) & it's parentNode
   * 2. Removes the clickedNode along with it's edges
   * 3. Creates the newNode depending upon the input
   * 3. Adds new creator nodes depending upon the newNode type
   * 5. Adds edges between parent & newNode
   * 6. Adds edges between newNode & it's creatorNode
   */
  const addNode = (actionOrRuleNode) => {
    const clickedNode = getNodeById(actionOrRuleNode.currentNodeId);
    console.log('clickedNode:', clickedNode);

    const currentX = clickedNode.position.x;
    const currentY = clickedNode.position.y;

    const parentId = getIncomers(clickedNode, elements)[0].id;
    console.log('parentId:', parentId);

    // const oldEdgeLabel = getEdgeLabel(`e${}${}`);

    let type;
    if (actionOrRuleNode.type === ACTION_TYPE) {
      type = ACTION_TYPE;
    } else {
      type = RULE_TYPE;
    }

    // const uniqueNumber = Math.ceil(Math.random() * RAND_UPPER_LIMIT);
    const uniqueNumber = count.current;
    const id = type + uniqueNumber;
    count.current++;

    const newNode = {
      id,
      type,
      data: {
        action: actionOrRuleNode.action,
        rules: actionOrRuleNode.rules,
        label: actionOrRuleNode.label,
        isEnd: actionOrRuleNode.isEnd,
      },
      position: { x: currentX, y: currentY },
    };

    const eParentNewNode = {
      source: parentId,
      target: id,
      animated: false,
      arrowHeadType: 'arrow',
    };

    const creatorId1 = CREATOR_PREFIX + uniqueNumber;

    const newCreator1 = {
      id: creatorId1,
      type: CREATOR_TYPE,
      position: { x: currentX, y: currentY + GAP_Y },
    };

    const eNewNodeNewCreator1 = {
      source: id,
      target: creatorId1,
      animated: false,
      arrowHeadType: 'arrow',
    };

    // Updates the edge between parentNode & clickedNode
    setElements((elements) =>
      updateEdge(
        findEdgeByTargetId(clickedNode.id),
        { source: parentId, target: id },
        elements
      )
    );

    // Removes clickedNode i.e. the OG CreatorNode
    setElements((elements) => removeElements([clickedNode], elements));

    if (actionOrRuleNode.type === ACTION_TYPE) {
      if (actionOrRuleNode.isEnd) {
        setElements((elements) => [...elements, newNode]);
        setElements((elements) => addEdge(eParentNewNode, elements));
      } else {
        setElements((elements) => [...elements, newNode, newCreator1]);
        setElements((elements) => addEdge(eParentNewNode, elements));
        setElements((elements) => addEdge(eNewNodeNewCreator1, elements));
      }
    } else {
      newCreator1.id += 'Left';
      eNewNodeNewCreator1.sourceHandle = id + 'Left';
      eNewNodeNewCreator1.label = 'Yes';
      eNewNodeNewCreator1.target += 'Left';
      newCreator1.position.x -= GAP_X;

      const creatorId2 = CREATOR_PREFIX + uniqueNumber + 'Right';

      const newCreator2 = {
        id: creatorId2,
        type: CREATOR_TYPE,
        position: { x: currentX + GAP_X, y: currentY + GAP_Y },
      };

      const eNewNodeNewCreator2 = {
        source: id,
        sourceHandle: id + 'Right',
        target: creatorId2,
        animated: false,
        arrowHeadType: 'arrow',
        label: 'No',
      };

      setElements((elements) => [
        ...elements,
        newNode,
        newCreator1,
        newCreator2,
      ]);
      setElements((elements) => addEdge(eParentNewNode, elements));
      setElements((elements) => addEdge(eNewNodeNewCreator1, elements));
      setElements((elements) => addEdge(eNewNodeNewCreator2, elements));
    }
  };

  const handleElementClick = (event, element) => {
    if (element.type === CREATOR_TYPE) {
      setCurrentNodeId(element.id);
      setOpen(true);
    }
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        addNode={addNode}
        currentNodeId={currentNodeId}
      />
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        nodeTypes={nodeTypes}
        snapToGrid={false}
        snapGrid={[15, 15]}
        onElementClick={handleElementClick}
        nodesConnectable={false}
      >
        <Controls />
        <Background color="#000" gap={16} />
      </ReactFlow>
    </>
  );
};

export default OverviewFlow;
