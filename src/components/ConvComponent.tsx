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

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];



const CreateConv: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  //const [rfInstance, setRfInstance] = useState(null);
  
  const getNodeId = () => `randomnode_${+new Date()}`;

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Conv2d', type: 'conv', params: { kernel_size: 3, stride: 1, padding: 0, dilation: 1, groups: 1, bias: true, padding_mode: 'zeros' }},
      position: {
        x: window.innerWidth/2,
        y: window.innerHeight/2,
      },

    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onELementClick = useCallback(
    (event: React.MouseEvent, element: Node) => {
      console.log(element.data.label);
    }
  , []);

  return (
    <div style={{ height: '98vh', width: '98vw', display: 'flex'}}>
      <SwipeableTemporaryDrawer onAdd={onAdd} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onELementClick}
        //onInit={setRfInstance}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CreateConv;
