from os import name
from flask import Flask, render_template, request, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm.session import Session

app = Flask(__name__)
app.secret_key = 'My Sceret is Awesome'

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5432/todo'
else:
    app.debug = False

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# user table
class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    categories = db.relationship('Categories')

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

# categories table
class Categories(db.Model):
    __tablename__ = "categories"
    category_id = db.Column(db.Integer, primary_key = True)
    category = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    tasks = db.relationship('Tasks')

    def __init__(self, category, user_id):
        self.category = category
        self.user_id = user_id

# Tasks Table
class Tasks(db.Model):
    __tablename__ = "tasks"
    task_id = db.Column(db.Integer, primary_key = True)
    task = db.Column(db.String(100))
    descp = db.Column(db.Text)
    date = db.Column(db.Date)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'))

    def __init__(self, task, descp,date,category_id):
        self.task = task
        self.descp = descp
        self.date = date
        self.category_id = category_id


@app.route('/')
def index():
    # session check
    if 'user_name' in session:
        user_obj = db.session.query(Users).filter(Users.username == session['user_name'])
        if  user_obj.count() != 0:
            # get all tasks data for sendint to Todo.html
              if "category_name" in session:
                # tasks = Categories.query.filter_by(category = session['category_name']).first().tasks
               
                tasks = Categories.query.filter(Categories.user_id == user_obj.first().user_id, Categories.category == session['category_name']).first().tasks
                return render_template('todo.html',categories = user_obj.first().categories, tasks = tasks, name = session['user_name'])

    return render_template('login.html')

@app.route('/register', methods = ['POST'] )
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        # for later use to save data
        session['user_name'] = username
        session['user_email'] = email

        # Save it to database
        if db.session.query(Users).filter(Users.username == username).count() == 0:
            data = Users(username,email,password)
            db.session.add(data)
            db.session.commit()
            return render_template('todo.html', name = session['user_name'])

# home is login
@app.route('/login', methods = ['GET', 'POST'])
def home():
    if request.method == 'POST':
        username_email = request.form['username_email']
        password = request.form['password']
        # print(username_email,password)
        
        #set session
        session['user_name'] = username_email

        # if user exists
        # then log in the user
        user = db.session.query(Users).filter((Users.username == username_email) | (Users.email == username_email))
        if user.count() != 0:
            pwd = user.first().password
            email = user.first().email
            print(user.first().username)
            if(pwd == password and (email == username_email or user.first().username == username_email) ):
                user_obj = db.session.query(Users).filter(Users.username == session['user_name'])
                if  user_obj.count() != 0:
                    #@TODO get all tasks data for sendint to Todo.html
                    return render_template('todo.html', categories = user_obj.first().categories, name = session['user_name'])       
        
        # if user doesnot exits -> show this
        return render_template('login.html', message = "Username and Password did not match.")
    
    else: 
        # this is for login session, if user has already logged in then user doesnot have to login again
        # checks session
        if "user_name" in session:
            return render_template('todo.html')
        return render_template('login.html')
            

@app.route('/addCat', methods = ['POST'])
def addCategory():
    if request.method == 'POST':
        category = request.form['category']
        
        if 'user_name' in session:
            username = session['user_name']
            user_id = db.session.query(Users).filter(Users.username == username).first().user_id

            if db.session.query(Categories).filter(Categories.user_id == user_id, Categories.category == category).count() == 0:
                user_id = db.session.query(Users).filter(Users.username == username).first().user_id
                cat_data = Categories(category,user_id)
                db.session.add(cat_data)
                db.session.commit()
        
        user_obj = Users.query.filter_by(username = session['user_name']).first()
        print('categories:',user_obj.categories)

        #@TODO get all tasks data for sendint to Todo.html
        return render_template('todo.html', categories = user_obj.categories, name = session['user_name'])

@app.route('/saveTask', methods = ['POST'])
def saveTask():
    if request.method == 'POST':
        task = request.form['task']
        descp = request.form['descp']
        date = request.form['date']
        print(task,descp,date)
        user_obj = Users.query.filter_by(username = session['user_name']).first()
        print('categories:',user_obj.categories)

        # Save data to DB
        if "category_name" in session:
            # test = db.session.query(Categories).filter(Categories.user_id == user_obj.user_id,  Categories.category == session['category_name']).first().user_id
            # cat_obj = Categories.query.filter_by(category = session['category_name']).first()
            
            # filters data that has the current user_id and the clicked category_name
            cat_id = db.session.query(Categories).filter(Categories.user_id == user_obj.user_id,  Categories.category == session['category_name']).first().category_id
            print('cat_id:',cat_id)
            
            cat_task = db.session.query(Tasks).filter(Tasks.task == task)
            if cat_task.count() == 0:
                task = Tasks(task,descp,date,cat_id)
                db.session.add(task)
                db.session.commit()

            # after saving data, reflect it on the browser
            user_obj = Users.query.filter_by(username = session['user_name']).first()
            print('categories:',user_obj.categories)
            # tasks = Categories.query.filter_by(category = session['category_name']).first().tasks
            tasks = Categories.query.filter(Categories.user_id == user_obj.user_id, Categories.category == session['category_name']).first().tasks


        return render_template('todo.html', categories = user_obj.categories, tasks = tasks, name = session['user_name'])

@app.route('/toTasks', methods = ['POST'])
def toTasks():
    if request.method == 'POST':
        categoryName = request.form['category']
        session['category_name'] = categoryName 
        print(categoryName)
        # retrive categories data of the user
        user_obj = Users.query.filter_by(username = session['user_name']).first()
        print('categories:',user_obj.categories)

        # retrived tasks data using the category name
        # reterived all tasks data for sendint to Todo.html
        # tasks = Categories.query.filter_by(user_id = user_obj.user_id).first().tasks
        tasks = Categories.query.filter(Categories.user_id == user_obj.user_id, Categories.category == categoryName).first().tasks
        # Categories.query.filter_by(category = categoryName).first().tasks
        print('taskss:',tasks)
        return render_template('todo.html', categories = user_obj.categories, tasks = tasks, name = session['user_name'])

@app.route('/logout')
def logout():
    session.pop('user_name', None)
    session.pop('user_email', None)
    return render_template('login.html')

if __name__ == '__main__':
    app.run()