const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

editor.addEventListener('input', () => {
    preview.innerHTML = marked.parse(editor.value);
});