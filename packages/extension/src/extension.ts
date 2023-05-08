import * as vscode from "vscode";
import { DiagramExtension } from "./DiagramExtension";
import { DefaultElementFilter, ElkLayoutEngine } from "sprotty-elk/lib/elk-layout";
import ElkConstructor from "elkjs/lib/elk.bundled";
import { DiagramGenerator } from "./DiagramGenerator";

export function activate(context: vscode.ExtensionContext) {

    console.log("Congratulations, your extension is now active!");

    new DiagramExtension(
        context,
        new ElkLayoutEngine(
            () => new ElkConstructor({algorithms: ["layered"]}),
            new DefaultElementFilter(),
        ),
        new DiagramGenerator()
    );
}

export function deactivate() {
}
