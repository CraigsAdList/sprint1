# pylint: disable=W0611, W0107, W0613
# first two warning are disabled for starter code, we should enable them later.
# 3rd is about unused variable in 'def load_user(user_id):', maybe we can fix it

"""Module for running flask and setting up endpoints"""

import os

import flask

from flask_login import current_user, login_user, logout_user, LoginManager

from dotenv import load_dotenv, find_dotenv

from models import db, Account, Ad, Channel

load_dotenv(find_dotenv())

app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.getenv("SECRET_KEY")

db.init_app(app)
with app.app_context():
    db.create_all()

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    """Stolen from some tutorial on flask-login. While it is not explicitly used
    here, it is required by flask-login"""
    return Account.query.get(int(id))

# set up a separate route to serve the index.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.
bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

# route for serving React page
@bp.route("/")
@bp.route("/channels")
@bp.route("/login")
@bp.route("/signup")
@bp.route("/acount")
@bp.route("/new_add")
@bp.route("/new_channel")
@bp.route("/new_response")
@bp.route("/new_offer")
def index():
    """Root endpoint"""
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    return flask.render_template("index.html")

@bp.route("/handle_login", methods=["POST"])
def handle_login():
    """Handle login"""
    pass

@bp.route("/handle_signup", methods=["POST"])
def handle_signup():
    """Handle signup"""
    pass

@bp.route("/handle_logout", methods=["POST"])
def handle_logout():
    """Handle logout"""
    pass

@bp.route("/is_logged_in", methods=["GET"])
def is_logged_in():
    """Check if user is logged in"""
    pass

@bp.route("/account_info", methods=["GET"])
def account_info():
    """Return current user's JSON data"""
    pass

@bp.route("/return_ads", methods=["GET"])
def return_ads():
    """Returns JSON with all ads"""
    pass

@bp.route("/return_channels", methods=["GET"])
def return_channels():
    """Returns JSON with all channels"""
    pass

@bp.route("/add_channel", methods=["POST"])
def add_channel():
    """Add channel info to database (in the first sprint it can be done only on signup)"""
    pass

@bp.route("/add_ad", methods=["POST"])
def add_ad():
    """Add ad info to database"""
    pass

@bp.route("/make_response", methods=["POST"])
def make_response():
    """Handles response"""
    pass

@bp.route("/make_offer", methods=["GET"])
def make_offer():
    """Handles offer"""
    pass

app.register_blueprint(bp)

app.run(debug=True)
