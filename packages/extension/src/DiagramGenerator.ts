import { SEdge, SGraph, SLabel, SModelElement, SModelRoot, SNode } from "sprotty-protocol";
import { IDiagramGenerator } from "sprotty-protocol/lib/diagram-services";

export class DiagramGenerator implements IDiagramGenerator {

    protected idCounter = 0;

    generate(): SModelRoot | Promise<SModelRoot> {
        return this.graph(
            this.node("1", this.label("Hello")),
            this.node("2", this.label("World!")),
            this.edge("1", "2")
        );
    }

    protected graph(...children: SModelElement[]): SGraph {
        return {
            type: "graph",
            id: "root",
            children: children
        };
    }

    protected edge(sourceId: string, targetId: string): SEdge {
        return {
            id: this.uniqueId(),
            type: "edge",
            sourceId,
            targetId
        };
    }

    protected node(id: string, label: SLabel): SNode {
        return {
            type: "node",
            id,
            children: [label],
            layout: "stack",
            layoutOptions: {
                paddingTop: 5.0,
                paddingBottom: 5.0,
                paddingLeft: 5.0,
                paddingRight: 5.0
            }
        };
    }

    protected label(caption: string): SLabel {
        return {
            text: caption,
            id: this.uniqueId(),
            type: "label"
        };
    }

    protected uniqueId(): string {
        return "ent" + (this.idCounter++).toString();
    }
}

