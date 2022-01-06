from mitmproxy import http
from handlers import *
from helpers import *

def response(flow: http.HTTPFlow) -> None:
    # Check client access to use proxy
    ip = flow.client_conn.address[0]
    user = find_user_by_ip(ip)

    # If client's IP is not in users list, show access error
    if not user:
        error_html = open("forbidden.html", 'r').read()
        content_type = { "Content-Type": "text/html" }
        flow.response = http.Response.make(200, error_html, content_type)
        return None

    # If it's cs.money site
    if flow.request.host == "cs.money":
        # If client requests list of inventory items
        if "load_user_inventory" in flow.request.path:
            # TODO: Send inventory data to node server
            handle_inventory_list(flow, user)

