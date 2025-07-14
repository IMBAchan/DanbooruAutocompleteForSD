let allTags = [];
let matchedTags = [];

// Upoading CSV
document.getElementById('csv-file').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        allTags = text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        allTags.sort((a, b) => a.localeCompare(b));
        console.log('All tags:', allTags);
    };
    reader.readAsText(file);
});

// Input processing
document.getElementById('tag-input').addEventListener('input', function () {
    const input = this.value.toLowerCase();
    matchedTags = [];

    if (input.length > 2) {
        matchedTags = allTags
            .filter(tag => tag.toLowerCase().includes(input))
            .sort((a, b) => {
                const ai = a.toLowerCase().indexOf(input);
                const bi = b.toLowerCase().indexOf(input);
                return ai - bi || a.localeCompare(b); // First are closer matches
            });

        console.clear();
        console.log('Matches (by relevance):', matchedTags);
    }
});