import ssl, socket
from datetime import datetime
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

def obtain_countries(soup):
    countries = []
    for table in soup:
        rows = table.findAll("tr")
        for row in rows:
            if "country" in row.text.lower():
                cols = row.findAll("td")
                countries.append(cols[1].text.lower())
    return countries

def find_country(countries, search):
    for country in countries:
        if search in country:
            return True
    return False

def primer_filtro(url):
    point_count = 0
    full_web_page = url
    web_page = full_web_page.replace("http://", "")
    web_page = web_page.replace("https://", "")
    hostname = web_page.split(".")[0].lower()
    try:
        ctx = ssl.create_default_context()
        s = ctx.wrap_socket(socket.socket(), server_hostname=web_page)
        s.connect((web_page, 443))
        cert = s.getpeercert()
    except Exception:
        return 0, ""
    subject = dict(x[0] for x in cert['subject'])
    issued_to = subject['commonName'].lower()
    issuer = dict(x[0] for x in cert['issuer'])
    issued_by = issuer['commonName'].lower()
    issuer = cert['notAfter'][:-4]
    datetime_cert = datetime.strptime(issuer, '%b %d %H:%M:%S %Y')
    country = dict(x[0] for x in cert['subject'])
    full_country = country['countryName'].lower()

    if hostname in issued_to:
        point_count += 1

    if not ("Let's Encrypt".lower() in issued_by):
        point_count += 1

    if datetime.now() < datetime_cert:
        point_count += 1

    return point_count, full_country

def segundo_filtro(url, country):
    url_full = f"https://check-host.net/ip-info?host={url}"
    page = Request(url_full, headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(page).read()
    soup = BeautifulSoup(webpage, "html.parser")
    countries = obtain_countries(soup.findAll("table", {"class": "inside_info"}))
    return find_country(countries, country)

def main():
    # url = "http://banortebxi.com-acceso.mxnet24.com/wps/portal/banorte/"
    url = input("Ingrese el sitio a buscar: ")
    cuenta, pais = primer_filtro(url)
    if pais and segundo_filtro(url, pais):
        cuenta += 1
    if cuenta == 4:
        print("SITIO BUENO")
    elif cuenta in [2, 3]:
        print("SITIO REVERVADO")
    else:
        print("SITIO MALO CUIDADO!!!")

main()