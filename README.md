# Caseify
Caseify is a website for your custom iphone cases 
## How to run locally on windows
1.Clone Repository

```
git clone https://github.com/Ameen6789/caseify
```
### To run frontend (Angular version>=16.2.15)
1.open terminal and navigate to caseify folder
```
cd caseify\frontend\caseify
```
2.install npm packages
```
npm install
```
3. run the server
```
ng serve -o
```

### To run backend
1.open a new terminal and navigate to backend folder 

```
cd caseify\backend
```

2.create virtual environment

```
py -m virtualenv venv
```
3.activate virtualenv
```
venv\Scripts\activate
```
4.Install requirements.txt
```
pip install -r caseify\requirements.txt
```
5.Migrate database
```
py manage.py migrate
```
6.add superuser
```
py manage.py createsuperuser
```
7.create .env file inside backend/caseify/caseify folder
```
cd caseify\caseify\settings.py
```
8.Add this inside the .env folder
```
STRIPE_PUBLIC_KEY = #add your stripe public key
STRIPE_SECRET_KEY = #add your stripe secret key
EMAIL_HOST_USER = #host email id ,to send email after the payment
EMAIL_HOST_PASSWORD =# host password, this is app password
STRIPE_WEBHOOK_SECRET=#add your stripe webhook secret
```
9.run the server
```
py manage.py runserver
```
### setup stripe cli

1.open new terminal and type stripe login and enter
```
stripe login
```
2.after logging in listen to webhook
```
stripe listen --forward-to http://127.0.0.1:8000/webhook
```

#### NOW TRY THE APP

When asked for card details  give Card Number: "4242 4242 4242 4242" and CVC: "123" 





