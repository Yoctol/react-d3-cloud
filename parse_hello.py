def main():
    words = []
    with open('hello.txt', 'r') as f:
        for line in f:
            pure_hellos = ' '.join(line.rstrip().split()[1:])
            pure_hello = pure_hellos.split('/')
            words = words + pure_hello

    with open('hello_parse.txt', 'w') as fw:
        for word in words:
            fw.write(word)
            fw.write('\n')


if __name__ == '__main__':
    main()
