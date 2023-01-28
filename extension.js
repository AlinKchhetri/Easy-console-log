// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const axios = require('axios');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let disposable = vscode.commands.registerCommand('easy-console-log.consoleLog', function () {
		var editor = vscode.window.activeTextEditor;
		if (!editor) return;

		axios.get('https://backend-omega-seven.vercel.app/api/getjoke')
			.then((response) => {
				var question = response.data[0].question;
				var punchline = response.data[0].punchline;

				var selection = editor.selection;

				var text = editor.document.getText(selection).replace(' ', '');

				var fileName = path.basename(editor.document.fileName);
				var lineNumber = selection.start.line + 2;
				var newLine = editor.document.lineAt(selection.end.line).range.end;
				editor.edit(editBuilder => {
					editBuilder.insert(newLine, `\nconsole.log("🔥 ~ [${fileName} : ${lineNumber}] ~ ${text} ", ${text});`)
					editBuilder.insert(newLine, `\n\n // 🚀 ~ Joke of the Day ~`);
					editBuilder.insert(newLine, `\n // ~ Question : ${question} 🤔`);
					editBuilder.insert(newLine, `\n // ~ Punch line : ${punchline} 🤣`);
				})
			})
			.catch((error) => {
				vscode.window.showErrorMessage('An error occurred while processing your request')
			})


	});

	context.subscriptions.push(disposable);

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
