import React, { useCallback } from 'react';
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
import SwipeableTemporaryDrawer from './Menu';
import ConvMenu from './ConvMenu';
import { Marker, Popup, Tooltip } from "react-leaflet";


const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];
let newNode: Node;

const CreateConv: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  //const [rfInstance, setRfInstance] = useState(null);
  
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
        newNode = {
          id: getNodeId(),
          data: { label: 'Input', type: 'input' },
          position: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          },
          type: 'input',
        };
        break;
      case 'Output':
        newNode = {
          id: getNodeId(),
          data: { label: 'Output', type: 'output' },
          position: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          },
          type: 'output',
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
      console.log(element.data.label);
      return (
        <ConvMenu onAdd={onAdd} />
      );
    }
  , []);

  const onMouse = useCallback(
    (event: React.MouseEvent, element: Node) => {
      console.log(event);
    }
  , []);

  return (
    <div style={{ height: '98vh', width: '98vw', display: 'flex'}}>
      <SwipeableTemporaryDrawer onAdd={onAdd} />
      <ConvMenu onAdd={onAdd} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onELementClick}
        onNodeMouseEnter={onMouse}
        //onInit={setRfInstance}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CreateConv;
