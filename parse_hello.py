import json
import random

def main():
    words = []
    with open('hello.txt', 'r') as f:
        for line in f:
            pure_hellos = ' '.join(line.rstrip().split()[1:])
            pure_hello = pure_hellos.split('/')
            words = words + pure_hello

    data = []
    for word in words:
        data.append({'text': word, 'value': random.randint(1, 1000)})

    with open('hello.json', 'w') as fw:
        json.dump(data, fw)


if __name__ == '__main__':
    main()
