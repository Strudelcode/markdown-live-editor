const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// Renderer konfigurieren
const renderer = new marked.Renderer();

// Links immer in neuem Tab öffnen
renderer.link = function(href, title, text) {
    return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
};

// Markdown-Optionen setzen
marked.setOptions({
    renderer: renderer,
    breaks: true, // Erlaubt einfache Zeilenumbrüche
    gfm: true
});

// Live-Preview
editor.addEventListener('input', () => {
    preview.innerHTML = marked.parse(editor.value);
});

// Synchrones Scrollen
editor.addEventListener('scroll', () => {
    const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
});

// Toolbar-Funktion
function insertText(startTag, endTag) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    const selection = text.substring(start, end);
    
    editor.value = text.substring(0, start) + startTag + selection + endTag + text.substring(end);
    editor.focus();
    
    // Preview sofort aktualisieren
    preview.innerHTML = marked.parse(editor.value);
}