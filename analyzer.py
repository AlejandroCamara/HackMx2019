import ssl, socket
from datetime import datetime

regex = r""
POINT_COUNT = 0

full_web_page = 'http://google.com'
web_page = full_web_page.replace("http://", "")
web_page = web_page.replace("https://", "")
hostname = web_page.split(".")[0].lower()
ctx = ssl.create_default_context()
s = ctx.wrap_socket(socket.socket(), server_hostname=web_page)
s.connect((web_page, 443))
cert = s.getpeercert()
print(cert)
subject = dict(x[0] for x in cert['subject'])
issued_to = subject['commonName'].lower()
issuer = dict(x[0] for x in cert['issuer'])
issued_by = issuer['commonName'].lower()
issuer = cert['notAfter'][:-4]
datetime_object = datetime.strptime(issuer, '%m %d %H:%m')


if hostname in issued_to:
    POINT_COUNT += 1

if not ("Let's Encrypt Authority X3".lower() in issued_by):
    POINT_COUNT += 1



print(datetime_object)
print(issued_by)
print(hostname)