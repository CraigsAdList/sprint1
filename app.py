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
    args = flask.request.args
    if args.get("for") == "adsPage":
        # return channels for channels page
        ads = Ad.query.filter_by(show_in_list=True).all()
        ads_data = []
        for advertisement in ads:
            advertisement.topics = advertisement.topics.split(',')
            ads_data.append(
                {
                    "id": advertisement.id,
                    "creatorId": advertisement.creator_id,
                    "title": advertisement.title,
                    "topics": advertisement.topics,
                    "text": advertisement.text,
                    "reward": advertisement.reward,
                    "showInList": advertisement.show_in_list,
                }
            )
        # trying to jsonify a list of channel objects gives an error
        print(ads_data)
        return flask.jsonify({
            "success": True,
            "ads_data": ads_data,
        })
    return flask.jsonify({"success": False})



@bp.route("/return_channels", methods=["GET"])
def return_channels():
    """Returns JSON with channels"""
    args = flask.request.args
    if args.get("for") == "channelsPage":
        # return channels for channels page
        channels = Channel.query.filter_by(show_channel=True).all()
        channels_data = []
        for channel in channels:
            channel.topics = channel.topics.split(',')
            channels_data.append(
                {
                    "id": channel.id,
                    "ownerId": channel.owner_id,
                    "showChannel": channel.show_channel,
                    "channelName": channel.channel_name,
                    "subscribers": channel.subscribers,
                    "topics": channel.topics,
                    "preferredReward": channel.preferred_reward,
                }
            )
        # trying to jsonify a list of channel objects gives an error
        return flask.jsonify({
            "success": True,
            "channels_data": channels_data,
        })
    return flask.jsonify({"success": False})

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

# account = Account(id = 100000000, username = "test user", password = "password", email = "test@test.com", channel_owner = True)
# # channel = Channel(id = 100000000, owner_id = 100000000, show_channel = True, channel_name = "test channel", subscribers = 100, topics = "test1,test2", preferred_reward = 100)
# # ad = Ad(id = 100000000, creator_id = 100000000, title = "test ad", topics = "test1,test2", text = "test ad text", reward = 100, show_in_list = True)
# with app.app_context():
#     db.session.add(account)
#     # db.session.add(channel)
#     # db.session.add(ad)
#     db.session.commit()
#     Account.querry.asll()
#     # Channel.query.all()
#     # Ad.query.all()

app.run(debug=True)
