from mitmproxy import http


def request(flow: http.HTTPFlow) -> None:
    print(flow.request.pretty_url)
    if flow.request.pretty_url == "http://example.com/path":
        flow.response = http.Response.make(
            200,  # (optional) status code
            b"Hello World",  # (optional) content
            {"Content-Type": "text/html"}  # (optional) headers
        )
