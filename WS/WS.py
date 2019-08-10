from urllib2 import urlopen
from urllib2 import HTTPError
from urllib2 import URLError
from bs4 import BeautifulSoup
import re
import json

data = {}

for i in range(97,123,2):
    try:
        url = "https://www.d20pfsrd.com/bestiary/bestiary-alphabetical/bestiary-"+chr(i)+"-"+chr(i+1)+"/"
        print "Connecting to: "+url
        html = urlopen(url)
    except HTTPError as e:
        print e
    except URLError:
        print("Server down or incorrect domain")
    else:
        res = BeautifulSoup(html.read(),"html5lib"); 
        tags = res.findAll("a", {"href": re.compile("https://www.d20pfsrd.com/bestiary/monster-listings/*/*")})

        for tag in tags:
            print "Entering in :"+tag.get('href')
            try:
                htmlIN = urlopen(tag.get('href'))
            except HTTPError as e:
                print e
            except URLError:
                print("Server down or incorrect domain")
            else:
                tagsIN = res.findAll("th", {"class":"text"})

            for j in tagsIN:
                print(getText(j))

