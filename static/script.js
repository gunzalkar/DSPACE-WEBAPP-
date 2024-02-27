// script.js
const synonymsList = document.getElementById('synonyms-list');

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i <= 6; i++) {
        addSynonymInput(i);
    }
});

function addSynonymInput(index) {
    var synonym_txt = "";
    if (index == 0){
        synonym_txt = "Word";
    } else {
        synonym_txt = `Synonym ${index}`;
    }
    const newSynonymInput = document.createElement('div');
    newSynonymInput.className = 'input-group';
    newSynonymInput.innerHTML = `
        <label for="synonym${index}">${synonym_txt}:</label>
        <input type="text" id="synonym${index}" placeholder="Type to enter text">
    `;
    synonymsList.appendChild(newSynonymInput);
}

document.getElementById('reinitialize').addEventListener('click', function() {
    synonymsList.innerHTML = ''; // Clear the synonyms list
    showLoadingScreen(); // Show loading screen
    $.ajax({
        url: "/reinit_sys",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({}),
        dataType: 'json',
        success: function(data) {
            hideLoadingScreen(); // Hide loading screen
            document.getElementById('confirmation').textContent = data['msg'];
            setTimeout(() => document.getElementById('confirmation').textContent = '', 3000);
        }
    });
});

function showLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'block';
}

function hideLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'none';
}
