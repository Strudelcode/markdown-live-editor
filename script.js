const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// Renderer für Links (neuer Tab)
const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
    return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
};

// Konfiguration
marked.setOptions({
    renderer: renderer,
    breaks: true,
    gfm: true
});

// Live-Update
editor.addEventListener('input', () => {
    preview.innerHTML = marked.parse(editor.value);
});

// Synchrones Scrollen
editor.addEventListener('scroll', () => {
    const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
});

// Toolbar: Text einfügen
function insertText(startTag, endTag) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    const selection = text.substring(start, end);
    
    editor.value = text.substring(0, start) + startTag + selection + endTag + text.substring(end);
    editor.focus();
    preview.innerHTML = marked.parse(editor.value);
}

// Toolbar: Kopieren
function copyToClipboard() {
    navigator.clipboard.writeText(editor.value).then(() => {
        const btn = document.querySelector('button[onclick="copyToClipboard()"]');
        const originalText = btn.innerText;
        btn.innerText = "✓ Kopiert!";
        setTimeout(() => { btn.innerText = originalText; }, 2000);
    });
}