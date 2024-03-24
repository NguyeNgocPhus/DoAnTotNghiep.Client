import { useCallback } from 'react';
import { useStore, getStraightPath , getBezierPath} from 'reactflow';

import { getEdgeParams } from './utils.js';

export const CustomEdge = ({ id, source, target, markerEnd, style }) => {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
}


// import { useEffect, useState } from 'react';
// import {
//   BaseEdge,getBezierPath, getStraightPath, EdgeLabelRenderer,
//   useReactFlow,
// } from 'reactflow';

// export const CustomEdge = ({
//   id,
//   animated,
//   data,
//   style,
//   selected,
//   source,
//   target,
//   sourceHandleId,
//   targetHandleId,
//   interactionWidth,
//   sourceX,
//   sourceY,
//   targetX,
//   targetY,
//   sourcePosition,
//   targetPosition,
//   label,
//   labelStyle,
//   labelShowBg,
//   labelBgStyle,
//   labelBgPadding,
//   labelBgBorderRadius,
//   markerStart,
//   markerEnd,
//   pathOptions
// }) => {
//   // console.log("custom edge", {
//   //   id,
//   //   animated,
//   //   data,
//   //   style,
//   //   selected,
//   //   source,
//   //   target,
//   //   sourceHandleId,
//   //   targetHandleId,
//   //   interactionWidth,
//   //   sourceX,
//   //   sourceY,
//   //   targetX,
//   //   targetY,
//   //   sourcePosition,
//   //   targetPosition,
//   //   label,
//   //   labelStyle,
//   //   labelShowBg,
//   //   labelBgStyle,
//   //   labelBgPadding,
//   //   labelBgBorderRadius,
//   //   markerStart,
//   //   markerEnd,
//   //   pathOptions
//   // });
//   const { setEdges } = useReactFlow();
//   const [ showBtnDeleteEdge, setShowBtnDeleteEdge ] = useState(false);

//   const [edgePath, labelX, labelY] = getBezierPath({
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//   });
//   useEffect(() => {
//     if (selected) {
//       setShowBtnDeleteEdge(true);
//     } else {
//       setShowBtnDeleteEdge(false);
//     }
//   }, [selected]);

//   return (
//     <>
//       <BaseEdge id={id} path={edgePath} />
//       <EdgeLabelRenderer>
//         {showBtnDeleteEdge && <button
//           style={{
//             position: 'absolute',
//             transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
//             pointerEvents: 'all',
//           }}
          
//           onClick={() => {
//             setEdges((es) => es.filter((e) => e.id !== id));
//           }}
//         >
//           delete
//         </button>}

//       </EdgeLabelRenderer>
//     </>
//   );
// }
