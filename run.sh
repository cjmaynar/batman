#!/bin/bash

sleep 5

python manage.py migrate

echo "from django.contrib.auth.models import User, Group; \
User.objects.create_user('test@test.com', 'test@test.com', 'test');"\
| python manage.py shell

cat <<EOT >> /root/.bashrc
alias runserver="python manage.py runserver 0.0.0.0:8000"
alias makemigrations="python manage.py makemigrations"
alias migrate="python manage.py migrate"
alias shell="python manage.py shell"
EOT

 trap : TERM INT; sleep infinity & wait
