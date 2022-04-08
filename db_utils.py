from models import Account, Ad, Channel
from app import db


def createAd(creator_id, title, topics="", text="", reward=0, show_in_list=True):
    new_ad = Ad(creator_id, title, topics, text, reward, show_in_list)

    db.session.add(new_ad)
    db.session.commit()
    return doesAdExist(title)


def doesAdExist(ad_title):
    ad = Ad.query.filter_by(title=ad_title).first()
    return ad != None


def createChannel(
    owner_id, channel_name, topics, preferred_reward, subscribers=0, show_channel=True
):
    new_channel = Channel(
        owner_id, show_channel, channel_name, subscribers, topics, preferred_reward
    )

    db.session.add(new_channel)
    db.session.commit()
    return doesChannelExist(channel_name)


def doesChannelExist(channelname):
    channel = Channel.query.filter_by(channel_name=channelname).first()
    return channel != None


def getAllChannels():  ## returns JSON of all channels on site.
    channels = Channel.query.all()
    channelList = []
    for i in channels:
        channelList.append(
            {
                "owner_id": i.owner_id,
                "show_channel": i.show_channel,
                "channel_name": i.channel_name,
                "subscribers": i.subscribers,
                "topics": i.topics,
                "preferred_reward": i.preferred_reward,
            }
        )

    return channelList


def getChannelsbyTopic(topic):
    channels = Channel.query.all()
    channelList = []
    for i in channels:
        topic_list = i.topics.split(
            ","
        )  ## assumes topics are seperated by a single comment(no spaces) e.g. "Tech,Fashion,Misc,..."
        if topic in topic_list:
            channelList.append(
                {
                    "owner_id": i.owner_id,
                    "show_channel": i.show_channel,
                    "channel_name": i.channel_name,
                    "subscribers": i.subscribers,
                    "topics": i.topics,
                    "preferred_reward": i.preferred_reward,
                }
            )

    return channelList


def getChannelsBySubCount(
    min_sub_count,
):  ##returns all channels with subscriber count above or equal to a minimum subscriber count
    channels = Channel.query.all()
    channelList = []
    for i in channels:
        channel_sub_count = (
            i.subscribers
        )  ## assumes topics are seperated by a single comment(no spaces) e.g. "Tech,Fashion,Misc,..."
        if channel_sub_count >= min_sub_count:
            channelList.append(
                {
                    "owner_id": i.owner_id,
                    "show_channel": i.show_channel,
                    "channel_name": i.channel_name,
                    "subscribers": i.subscribers,
                    "topics": i.topics,
                    "preferred_reward": i.preferred_reward,
                }
            )

    return channelList


def getChannelsByOwnerUsername(ownername):
    user = Account.query.filter_by(username=ownername).first()
    channels = Channel.query.filter_by(owner_id=user.id).all()
    channelList = []
    for i in channels:
        channelList.append(
            {
                "owner_id": i.owner_id,
                "show_channel": i.show_channel,
                "channel_name": i.channel_name,
                "subscribers": i.subscribers,
                "topics": i.topics,
                "preferred_reward": i.preferred_reward,
            }
        )

    return channelList


def getChannelsByOwnerEmail(owner_email):
    user = Account.query.filter_by(username=owner_email).first()
    channels = Channel.query.filter_by(owner_id=user.id).all()
    channelList = []
    for i in channels:
        channelList.append(
            {
                "owner_id": i.owner_id,
                "show_channel": i.show_channel,
                "channel_name": i.channel_name,
                "subscribers": i.subscribers,
                "topics": i.topics,
                "preferred_reward": i.preferred_reward,
            }
        )

    return channelList


def getAllAds():
    ads = Ad.query.all()
    adsList = []
    for i in adsList:
        adsList.append(
            {
                "creator_id": i.id,
                "title": i.title,
                "topics": i.topics,
                "text": i.text,
                "reward": i.reward,
                "show_in_list": i.show_in_list,
            }
        )

    return adsList


def getAdsByTopic(topic):
    ads = Ad.query.all()
    adsList = []
    for i in ads:
        topic_list = i.topics.split(
            ","
        )  ## assumes topics are seperated by a single comment(no spaces) e.g. "Tech,Fashion,Misc,..."
        if topic in topic_list:
            adsList.append(
                {
                    "creator_id": i.id,
                    "title": i.title,
                    "topics": i.topics,
                    "text": i.text,
                    "reward": i.reward,
                    "show_in_list": i.show_in_list,
                }
            )


def getAdsByOwnerUsername(ownername):
    user = Account.query.filter_by(username=ownername).first()
    ads = Ad.query.filter_by(creator_id=user.id).all()
    adsList = []
    for i in ads:
        adsList.append(
            {
                "creator_id": i.id,
                "title": i.title,
                "topics": i.topics,
                "text": i.text,
                "reward": i.reward,
                "show_in_list": i.show_in_list,
            }
        )

    return adsList


def getAdsByOwnerEmail(owner_email):
    user = Account.query.filter_by(username=owner_email).first()
    ads = Ad.query.filter_by(creator_id=user.id).all()
    adsList = []
    for i in ads:
        adsList.append(
            {
                "creator_id": i.id,
                "title": i.title,
                "topics": i.topics,
                "text": i.text,
                "reward": i.reward,
                "show_in_list": i.show_in_list,
            }
        )

    return adsList
