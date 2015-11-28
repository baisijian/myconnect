from poster.encode import multipart_encode
from poster.streaminghttp import register_openers
import urllib2
 

register_openers()
 

datagen, headers = multipart_encode({"image1": open("test.jpg", "rb")})
 

request = urllib2.Request("http://localhost:7878/upload", datagen, headers)

print urllib2.urlopen(request).read()