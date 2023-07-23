import React, { useCallback, useState } from 'react';
import MainMenu from './Menu';
import ConvMenu from './ConvMenu';
import InputMenu from './InputMenu';
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";


const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];
let newNode: Node;

const CreateConv: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [openConvMenu, setOpenConv] = useState(false);
  const [openInputMenu, setOpenInput] = useState(false);

  
  const getNodeId = () => `randomnode_${+new Date()}`;

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onAdd = useCallback((key: string) => {
    switch (key) {
      case 'Conv':
        newNode = {
          id: getNodeId(),
          data: { label: 'Conv2d', type: 'conv', params: { kernel_size: 3, stride: 1, padding: 0, dilation: 1, groups: 1, bias: true, padding_mode: 'zeros' }},
          position: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          },
        };
        break;
      case 'Input':
      case 'Output':
        newNode = {
          id: getNodeId(),
          data: { label: key, type: key.toLowerCase() },
          position: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          },
          type: key.toLowerCase(),
        };
        break;
      default:
        // Handle any other cases here or simply do nothing
        return;
    }
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onELementClick = useCallback(
    (event: React.MouseEvent, element: Node) => {
      if (element.data.label == 'Conv2d' ) {
        setOpenConv(true);
        setOpenInput(false);
      }
      else if (element.data.label == 'Input') {
        setOpenInput(true);
        setOpenConv(false);
      }
    }
  , []);

  const onCloseMenu = useCallback(() => {
    setOpenConv(false);
    setOpenInput(false); 
  }, []);

  const onMouseHover = useCallback(
    (event: React.MouseEvent, element: Node) => {
      console.log(event);
    }
  , []);

  return (
    <div style={{ height: '98vh', width: '98vw', display: 'flex'}}>
      <MainMenu onAdd={onAdd} />
      <ConvMenu openValue={openConvMenu} onClose={onCloseMenu}/> 
      <InputMenu openValue={openInputMenu} onClose={onCloseMenu}/>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onELementClick}
        onNodeMouseEnter={onMouseHover}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CreateConv;
