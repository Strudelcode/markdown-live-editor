const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// 1. Live-Preview mit Zeilenumbruch-Support
editor.addEventListener('input', () => {
    // { breaks: true } sorgt dafür, dass Zeilenumbrüche im Editor als <br> gerendert werden
    preview.innerHTML = marked.parse(editor.value, { breaks: true });
});

// 2. Synchrones Scrollen
editor.addEventListener('scroll', () => {
    const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
});

// 3. Toolbar-Funktion
function insertText(startTag, endTag) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    const selection = text.substring(start, end);
    
    editor.value = text.substring(0, start) + startTag + selection + endTag + text.substring(end);
    editor.focus();
    
    // Preview sofort aktualisieren
    preview.innerHTML = marked.parse(editor.value, { breaks: true });
}