import json
from mitmproxy import http


def handle_inventory_list(flow: http.HTTPFlow, user) -> None:
    raw_response = flow.response.content
    parsed_response = json.loads(raw_response)

    total_cost = float(parsed_response["cost"])
    items = parsed_response["items"]
    user_items = user["items"]

    # Go through every item in client's inventory
    for item in items:
        try:
            # Find, if user gave custom overpays for this item
            custom_item_settings = next(x for x in user_items if x["id"] == item["id"])
            overpays = custom_item_settings["overpay"]

            # Make new price
            new_price = item["price"]
            for overpay in overpays.values():
                if overpay >= 0:
                    new_price += overpay
                    total_cost += overpay
            item["price"] = new_price

 
        except StopIteration:
            continue

    # Sort items
    # TODO: Fix sort by float
    sort_order = flow.request.query["order"]
    sort_key = flow.request.query["sort"]
    items = sorted(items, key=lambda i: float(i[sort_key]), reverse=sort_order == "desc")
    parsed_response["items"] = items

    parsed_response["cost"] = total_cost

    # Stringify new reponse and send it to the client
    new_json_reponse = json.dumps(parsed_response)
    content_type = { "content-type": "application/json" }
    flow.response = http.Response.make(200, new_json_reponse, content_type)