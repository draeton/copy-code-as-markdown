// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let cmd = vscode.commands.registerCommand('copy-code-as-markdown.CopySelectionAsMarkdown', function () {
		var editor = vscode.window.activeTextEditor;
		if(!Boolean(editor)){
			return
		}

		const getRelFilename = ()=>{
			let workspaces = vscode.workspace.workspaceFolders;
			// let workspace = vscode.workspace.workspaceFolders.length ? vscode.workspace.workspaceFolders[0] : null;
			let activeFile = vscode.window.activeTextEditor.document;
			let absoluteFilePath = activeFile.uri.fsPath
			// let activeWorkspace = workspace;

			let relativeFilePath = absoluteFilePath;
			for (let workspace of workspaces) {
				if (absoluteFilePath.replace(workspace.uri.fsPath, '') !== absoluteFilePath) {
					// activeWorkspace = workspace;
					relativeFilePath = absoluteFilePath.replace(workspace.uri.fsPath, '').substr(path.sep.length);
					break;
				}
			}
			return relativeFilePath
		}

		var selection = editor.selection;
		var text = editor.document.getText(selection);
		if (!Boolean(text)) return;
		const lang = editor.document.languageId
		const filename = getRelFilename()
		const lineNumbers = editor.selection.active.line
		const mdText = `*${filename}* ${lineNumbers}:\n\`\`\`${lang}\n${text}\n\`\`\``
		vscode.env.clipboard.writeText(mdText)
		vscode.window.showInformationMessage("Markdown copyied!");
	});


	context.subscriptions.push(cmd);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
