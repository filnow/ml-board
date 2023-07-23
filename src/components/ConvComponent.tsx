import React, { useCallback, useState } from 'react';
import MainMenu from './Menu';
import ConvMenu from './ConvMenu';
import InputMenu from './InputMenu';
import OutputMenu from './OutputMenu';
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
  const [openInputMenu, setOpenInput] = useState(false);
  const [openOutputMenu, setOpenOutput] = useState(false);
  const [convMenuStates, setConvMenuStates] = useState<{ [key: string]: boolean }>({});

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
        setConvMenuStates((prevStates) => ({ ...prevStates, [element.id]: true }));
        setOpenInput(false);
        setOpenOutput(false);
      }
      else if (element.data.label == 'Input') {
        setOpenInput(true);
        setOpenOutput(false);
        setConvMenuStates((prevStates) => ({ ...prevStates, [element.id]: false }));
      }
      else if (element.data.label == 'Output') {
        setOpenOutput(true);
        setOpenInput(false);
        setConvMenuStates((prevStates) => ({ ...prevStates, [element.id]: false }));
      }
    }
  , []);

  const onCloseMenu = useCallback(() => {
    setOpenInput(false);
    setOpenOutput(false);
    setConvMenuStates({}); 
  }, []);

  const onMouseHover = useCallback(
    (event: React.MouseEvent, element: Node) => {
      console.log(event);
    }
  , []);

  return (
    <div style={{ height: '98vh', width: '98vw', display: 'flex'}}>
      <MainMenu onAdd={onAdd} />
      {nodes.map((node) => (
        <ConvMenu key={node.id} openValue={Boolean(convMenuStates[node.id])} onClose={onCloseMenu}/>
      ))}
      <InputMenu openValue={openInputMenu} onClose={onCloseMenu}/>
      <OutputMenu openValue={openOutputMenu} onClose={onCloseMenu}/>
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
