// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// @ts-ignore
const { parse } = require('./parser');

type Templates = { [name: string]: string };

const templates = <Templates>vscode.workspace.getConfiguration('emmetFile').get('templates');
const encoder = new TextEncoder();

const current_folder = vscode.workspace.workspaceFolders?.[0]!;
const watcher = vscode.workspace.createFileSystemWatcher(
    new vscode.RelativePattern(current_folder, '**/*'),
    false,
    false,
    false
);

function emmetReplace(e: vscode.Uri) {
    const edit = new vscode.WorkspaceEdit();
    let parent: string | string[] = e.path.split('/')!;
    parent.pop();
    parent = parent.join('/').substring(1);
    let abbr = e.path.split('/').at(-1)!;
    let replacable = true;
    while (replacable) {
        replacable = false;
        for (const [name, template] of Object.entries(templates)) {
            abbr = abbr.replaceAll(`[${name}]`, () => {
                replacable = true;
                return template;
            });
        }
    }
    let filelist;
    try {
        filelist = <string[]>parse(abbr);
        console.log(abbr, filelist);
    } catch (err) {
        vscode.window.showInformationMessage('Invalid Parsing!');
        return;
    }
    for (const file of filelist) {
        const [filename, filecontents] = <[string, string | undefined]>file.split('{');
        const create = vscode.Uri.joinPath(vscode.Uri.file(parent), filename);
        edit.createFile(
            create,
            filecontents
                ? {
                      contents: encoder.encode(filecontents.slice(0, -1)),
                  }
                : undefined
        );
    }
    edit.deleteFile(e);
    vscode.workspace.applyEdit(edit);
}

function connectEmmetFile() {
    vscode.window.showInformationMessage('Tracking Enabled!');
    watcher.onDidCreate(emmetReplace);
}

function unconnectEmmetFile() {
    vscode.window.showInformationMessage('Tracking Disabled!');
    watcher.onDidCreate(() => {});
}

export function activate(context: vscode.ExtensionContext) {
    const trackCMD = vscode.commands.registerCommand('emmet-file.track', connectEmmetFile);
    const untrackCMD = vscode.commands.registerCommand('emmet-file.untrack', unconnectEmmetFile);
    context.subscriptions.push(trackCMD);
    context.subscriptions.push(untrackCMD);

    connectEmmetFile();
}

// This method is called when your extension is deactivated
export function deactivate() {
    unconnectEmmetFile();
}
