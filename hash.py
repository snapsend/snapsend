
from hashlib import md5
for i in range(1, 100):
    target = md5(str(i).encode('utf-8')).hexdigest()[0:5].upper()
    print("{number} get transformed to {target}".format(number=i, target=target))


def hash_envid(envid):
	target = md5(str(envid).encode('utf-8')).hexdigest()[0:5].upper()
	return target
print(hash_envid(1))