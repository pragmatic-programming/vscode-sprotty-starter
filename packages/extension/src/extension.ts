import * as vscode from "vscode";
import { DefaultElementFilter, ElkLayoutEngine } from "sprotty-elk/lib/elk-layout";
import ElkConstructor from "elkjs/lib/elk.bundled";
import { WebView } from "./WebView";
import { registerDefaultCommands } from "sprotty-vscode";

export function activate(context: vscode.ExtensionContext) {

    console.log("Congratulations, your extension is now active!");

    const webviewPanelManager = new WebView({
            extensionUri: context.extensionUri,
            defaultDiagramType: "sprotty-starter",
            supportedFileExtensions: [".txt"],
            singleton: true
        },
        context,
        () => new ElkLayoutEngine(
            () => new ElkConstructor({algorithms: ["layered"]}),
            new DefaultElementFilter(),
        ),
    );
    registerDefaultCommands(webviewPanelManager, context, {extensionPrefix: "sprotty-starter"});
}

export function deactivate() {
}
