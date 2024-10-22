# Caseify
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



