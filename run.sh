NGINX_CONF="/etc/nginx/sites-enabled/flask_app"
echo "server {
    listen 8020;

    location / {
            proxy_pass http://127.0.0.1:8000;
            proxy_set_header Host \$host;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}" > $NGINX_CONF
unlink /etc/nginx/sites-enabled/default
systemctl restart nginx
echo "Nginx and Gunicorn have been configured successfully."
sleep 2
ufw allow 8020
pkill gunicorn
screen -X -S app quit
screen -S app -d -m gunicorn app:app
