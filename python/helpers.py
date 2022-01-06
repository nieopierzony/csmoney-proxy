import json

USERS_LOCATION = "/srv/config/users.json"

def find_user_by_ip(ip):
    try:
        raw_users = open(USERS_LOCATION, 'r')
        users = json.load(raw_users)
        user = next(x for x in users if x["ip"] == ip)
        return user
    except StopIteration:
        return False

