# Caseify
Caseify is a website for your custom iphone cases 




![Screenshot (449)](https://github.com/user-attachments/assets/64c585a5-555a-43c5-81f8-ca59cafeb821)


![Screenshot (450)](https://github.com/user-attachments/assets/ac50d8c8-f83c-4770-b761-6c042a061ca0)


![Screenshot (454)](https://github.com/user-attachments/assets/27e43345-ad6a-4e33-858c-67a333e4cede)


![Screenshot (455)](https://github.com/user-attachments/assets/3d7eea4d-e6bc-41ba-b385-68ed94076a2c)


![Screenshot (456)](https://github.com/user-attachments/assets/0671f855-fa7f-40ed-99a0-42266898bed1)


![Screenshot (457)](https://github.com/user-attachments/assets/c534780c-6595-4147-b851-6ea2f0cc18fd)




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





