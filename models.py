"""Module for database models"""

from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

# user with id, username, email, password, 'channel owner' flag
class Account(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), index=True, unique=True)
    password = db.Column(db.String(128), index=True)
    email = db.Column(db.String(128), index=True, unique=True)
    is_channel_owner = db.Column(db.Boolean, default=False)


# ad with id, creator id, title, topics, text, reward, 'show in the list of ads' flag
class Ad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey("account.id"))
    title = db.Column(db.String(128))
    topics = db.Column(db.String(128))
    text = db.Column(db.String(128))
    reward = db.Column(db.Integer)
    show_in_list = db.Column(db.Boolean, default=False)


# channel with id, owner id, 'show channel in the list' flag, channel name, number of subscribers, topics, preferred reward
class Channel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("account.id"))
    show_channel = db.Column(db.Boolean, default=False)
    channel_name = db.Column(db.String(128), index=True, unique=True)
    subscribers = db.Column(db.Integer, default=0)
    topics = db.Column(db.String(128), index=True, unique=True)
    preferred_reward = db.Column(db.String(128), index=True, unique=True)