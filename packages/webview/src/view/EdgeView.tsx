/** @jsx svg */
import { injectable } from "inversify";
import { VNode } from "snabbdom";
import { PolylineEdgeView, SEdge,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    svg
} from "sprotty";
import { Point, toDegrees } from "sprotty-protocol";

@injectable()
export class EdgeView extends PolylineEdgeView {

    protected renderAdditionals(edge: SEdge, segments: Point[]): VNode[] {
        const p1 = segments[segments.length - 2];
        const p2 = segments[segments.length - 1];
        return [
            <path class-sprotty-edge-arrow={true}
                  d="M 6,-3 L 0,0 L 6,3 Z"
                  transform={`rotate(${this.angle(p2, p1)} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`}/>
        ] as VNode[];
    }

    protected angle(x0: Point, x1: Point): number {
        return toDegrees(Math.atan2(x1.y - x0.y, x1.x - x0.x));
    }
}
