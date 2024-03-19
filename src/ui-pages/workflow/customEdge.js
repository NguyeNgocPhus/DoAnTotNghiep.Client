import { useEffect, useState } from 'react';
import {
  BaseEdge,getBezierPath, getStraightPath, EdgeLabelRenderer,
  useReactFlow,
} from 'reactflow';

export const CustomEdge = ({
  id,
  animated,
  data,
  style,
  selected,
  source,
  target,
  sourceHandleId,
  targetHandleId,
  interactionWidth,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  labelStyle,
  labelShowBg,
  labelBgStyle,
  labelBgPadding,
  labelBgBorderRadius,
  markerStart,
  markerEnd,
  pathOptions
}) => {
  // console.log("custom edge", {
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
  // });
  const { setEdges } = useReactFlow();
  const [ showBtnDeleteEdge, setShowBtnDeleteEdge ] = useState(false);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  useEffect(() => {
    if (selected) {
      setShowBtnDeleteEdge(true);
    } else {
      setShowBtnDeleteEdge(false);
    }
  }, [selected]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {showBtnDeleteEdge && <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          delete
        </button>}

      </EdgeLabelRenderer>
    </>
  );
}