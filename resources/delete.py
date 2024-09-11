from os import listdir, rename

dir = 'frames'

webps = sorted([*filter(lambda filename: filename.endswith('.webp'), listdir(dir))])

name = 'video-4k-'
for i, webp in enumerate(webps):
    new_name = name + '0'*(3-len(str(i))) + str(i) + '.webp'
    rename(f'frames/{webp}', f'frames/{new_name}')

