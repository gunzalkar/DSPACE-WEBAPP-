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

document.getElementById('save-add').addEventListener('click', function() {
    var synonymInputs = document.querySelectorAll('#synonyms-list input[type="text"]');
    var synonyms = [];

    synonymInputs.forEach(function(input) {
        synonyms.push(input.value);
    });

    $.ajax({
        url: "/save_synonyms",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({'synonyms': synonyms}),
        dataType: 'json',
        success: function(data) {
            document.getElementById('confirmation').textContent = data['msg'];
            setTimeout(() => document.getElementById('confirmation').textContent = '', 3000);
        }
    });
});


document.getElementById('reinitialize').addEventListener('click', function() {
    showLoader(); // Show loading animation
    synonymsList.innerHTML = ''; // Clear the synonyms list
    for (let i = 0; i <= 6; i++) {
        addSynonymInput(i);
    }
    $.ajax({
        url: "/reinit_sys",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({}),
        dataType: 'json',
        success: function(data) {
            hideLoader(); // Hide loading animation
            document.getElementById('confirmation').textContent = data['msg'];
            setTimeout(() => document.getElementById('confirmation').textContent = '', 3000);
        }
    });
});

document.getElementById('add-synonym').addEventListener('click', function() {
    const synonymCount = synonymsList.querySelectorAll('.input-group').length + 1;
    addSynonymInput(synonymCount);

});

document.getElementById('clear').addEventListener('click', function() {
    synonymsList.innerHTML = '';
    for (let i = 0; i <= 6; i++) {
        addSynonymInput(i);
    }
});

function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}
