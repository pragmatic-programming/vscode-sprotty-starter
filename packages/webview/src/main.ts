import "reflect-metadata";
import "sprotty-vscode-webview/css/sprotty-vscode.css";

import "./css/diagram.css";
import "sprotty/css/sprotty.css";

import { Container, ContainerModule } from "inversify";
import { SprottyDiagramIdentifier } from "sprotty-vscode-webview";
import { SprottyLspEditStarter } from "sprotty-vscode-webview/lib/lsp/editing";
import {
    configureCommand,
    configureModelElement,
    CreateElementCommand,
    labelEditUiModule,
    loadDefaultModules,
    overrideViewerOptions,
    RectangularNodeView,
    SEdge,
    SGraph,
    SGraphView,
    SLabel,
    SLabelView,
    SNode,
    ViewerOptions
} from "sprotty";
import { EdgeView } from "./view/EdgeView";

export class StatesSprottyStarter extends SprottyLspEditStarter {

    createContainer(diagramIdentifier: SprottyDiagramIdentifier): Container {
        return this.createStateDiagramContainer(diagramIdentifier.clientId);
    }

    protected addVscodeBindings(container: Container, diagramIdentifier: SprottyDiagramIdentifier): void {
        super.addVscodeBindings(container, diagramIdentifier);
    }

    protected createStateDiagramContainer(widgetId: string): Container {
        const container = new Container();
        loadDefaultModules(container, {exclude: [labelEditUiModule]});
        container.load(this.createContainerModule());
        overrideViewerOptions(container, this.createViewerOptions(widgetId));
        return container;
    }

    protected createViewerOptions(widgetId: string): Partial<ViewerOptions> {
        return {
            baseDiv: widgetId,
            hiddenDiv: widgetId + "_hidden",
            needsClientLayout: true,
            needsServerLayout: true,
        };
    }

    protected createContainerModule(): ContainerModule {
        return new ContainerModule(
            (bind, unbind, isBound, rebind) => {
                const context = {bind, unbind, isBound, rebind};
                configureModelElement(context, "edge", SEdge, EdgeView);
                configureModelElement(context, "graph", SGraph, SGraphView);
                configureModelElement(context, "label", SLabel, SLabelView);
                configureModelElement(context, "node", SNode, RectangularNodeView);

                configureCommand(context, CreateElementCommand);
            }
        );
    }
}

new StatesSprottyStarter().start();
