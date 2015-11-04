# Poulett.es
A truly needed website to listen to and share Kaamelott sounds.

# Utils

Dump audio from video file to a big ogg file :
    ffmpeg -i Music/Kaamelott\ Livre\ I\ -\ Tome\ II.mkv -vn -acodec libvorbis -ac 2 Music/kaamelott_tome2.ogg

Trim audio file, take 3.2 seconds at 30:21.400 min and store it in degarnie.ogg :
    ffmpeg -ss 00:30:21.400 -i Music/kaamelott_tome1.ogg -t 00:00:03.200 -acodec libvorbis Music/degarnie.ogg -y
