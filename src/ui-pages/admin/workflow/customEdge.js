import { useCallback } from 'react';
import { useStore, getStraightPath ,EdgeLabelRenderer, getBezierPath} from 'reactflow';

import { getEdgeParams } from './utils.js';

export const CustomEdge = ({ id, source, target, markerEnd, style, data }) => {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });
  return (
    <>
     <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
    {data !==undefined && <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
           
        
           
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {data ?  
            <div style={{ padding:'2px',
            fontSize: 12,
            borderRadius:'10px',
            fontSize:'9px',
            color:'white',backgroundColor:"green"}}>Đúng</div>:
            <div style={{padding:'2px',
            fontSize: 12,
            borderRadius:'10px',
            fontSize:'9px',
            color:'white',backgroundColor:"red"}}>Sai</div>
          }
        </div>
      </EdgeLabelRenderer>}
    
    </>
   
  );
}
