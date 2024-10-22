# Caseify
Caseify is a website for your custom iphone cases 


![Screenshot (449)](https://github.com/user-attachments/assets/f880d45d-b422-4006-a416-6bd9298b613c)




![Screenshot (450)](https://github.com/user-attachments/assets/664c56db-a872-4ed4-b442-0f185571a982)




![Screenshot (451)](https://github.com/user-attachments/assets/59accdf0-6f4e-4a78-93d2-b58d6b6cdc25)




![Screenshot (452)](https://github.com/user-attachments/assets/c3c9c7eb-2b1b-46af-82d5-88426a34cd5d)




![Screenshot (456)](https://github.com/user-attachments/assets/0ac65408-0d39-443c-859b-356139b156d7)




![Screenshot (457)](https://github.com/user-attachments/assets/07a48fe6-6aee-4321-b8de-233fb01db2cb)




![Screenshot (453)](https://github.com/user-attachments/assets/3cb2737c-75d9-44d0-a467-611b9b41f3c0)

## How to run locally on windows
1.Clone Repository

```
git clone https://github.com/Ameen6789/caseify
```
### To run frontend (Angular version>=16.2.15)
1. open terminal and navigate to caseify folder
```
cd caseify\frontend\caseify
```
2. install npm packages
```
npm install
```
3. create a new environment
```
ng g environments
```
4. add this to environent.ts file inside caseify\caseify\src\environments
```
export const environment = {
    AUTH0_DOMAIN:# add auth domain id here
    AUTH0_CLIENT_ID: // add your auth0 clinet id here
    STRIPE_PUBLIC_KEY://add you stripe public key here
};
```
5. run the server
```
ng serve -o
```

### To run backend
1. open a new terminal and navigate to backend folder 

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





