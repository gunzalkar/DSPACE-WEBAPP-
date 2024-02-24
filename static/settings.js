document.addEventListener('DOMContentLoaded', function() {
    setData();
});

async function setData() {
    var resp = await fetch('/get_settings');
    var data = await resp.json();
    document.getElementById('user').value = data["user"]
    document.getElementById('main-folder').value = data["main_folder"]
    document.getElementById('synonyms-path').value = data["synonyms_folder"]
    document.getElementById('copy-from-path').value = data["solr_copy_from"]
    document.getElementById('copy-to-path').value = data["solr_copy_to"]
    document.getElementById('solr-bin-path').value = data["bin_path"]
    document.getElementById('password').value = data["pass"]
}

document.getElementById('overwrite').addEventListener('click', function() {
    temp_json = {
        "user": document.getElementById('user').value,
        "main_folder": document.getElementById('main-folder').value,
        "synonyms_folder": document.getElementById('synonyms-path').value,
        "solr_copy_from": document.getElementById('copy-from-path').value,
        "solr_copy_to": document.getElementById('copy-to-path').value,
        "bin_path": document.getElementById('solr-bin-path').value,
        "pass": document.getElementById('password').value,
    }
    $.ajax({
        url: "/over_write",
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(temp_json),
        dataType: 'json',
        success: function(data) {
            alert("Settings updated!");
        }
    });
});
