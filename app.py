from flask import Flask, request, render_template
import subprocess
import configparser
# Create a ConfigParser object
config = configparser.ConfigParser()

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/settings_page')
def settings_page():
    return render_template('settings.html')


@app.route('/save_synonyms', methods=['POST'])
def save_synonyms():
    data = request.json
    config.read('config.ini')
    command = f"sudo -u {config['data']['user']} ls {config['data']['main_folder']}"

    output = subprocess.check_output(command, shell=True, input=config['data']['pass'], stderr=subprocess.STDOUT, universal_newlines=True)
    print(output)
    temp_sy = ""
    for s in data['synonyms']:
        if s:
            temp_sy += s + ","
    append_command = f"echo f'{temp_sy}' | sudo -u {config['data']['user']} tee -a {config['data']['synonyms_folder']}synonyms.txt > /dev/null"
    subprocess.check_call(append_command, shell=True)

    copy_command = f"sudo cp -R {config['data']['solr_copy_from']} {config['data']['solr_copy_to']}configsets"
    subprocess.check_call(copy_command, shell=True)

    return {"msg": "Success"}


@app.route('/reinit_sys', methods=['POST'])
def reinit_sys():
    config.read('config.ini')
    restart_command = f"sudo {config['solr_bin_path']} restart -force -all"
    subprocess.check_call(restart_command, shell=True)
    return {"msg": "Success"}


@app.route('/over_write', methods=['POST'])
def over_write():
    data = request.json
    config.read('config.ini')
    config['Paths'] = {
        'main_folder': data['main_folder'],
        'synonyms_folder': data['synonyms_folder'],
        'solr_copy_from': data['solr_copy_from'],
        'solr_copy_to': data['solr_copy_to'],
        'solr_bin_path': data['bin_path'],
        'pass': data['pass'],
        'user': data['user']
    }

    # Write the updated INI file
    with open('config.ini', 'w+') as configfile:
        config.write(configfile)
    return {"msg": "Success"}


@app.route('/get_settings', methods=['GET'])
def get_settings():
    config.read('config.ini')
    return dict(config['data'])


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
